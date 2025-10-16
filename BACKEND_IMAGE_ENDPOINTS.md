# Backend Image Upload Endpoints - REQUIRED

## Why These Are Needed

localStorage gets cleared during Stripe's redirect. The solution: temporarily store the image on your backend.

## Endpoints to Add

### 1. Upload Image (Before Payment)

```
POST /api/temp-image-upload
```

**Request:**

- Content-Type: `multipart/form-data`
- Body: FormData with `image` field (File)

**Response:**

```json
{
  "imageId": "unique-id-here"
}
```

**What it does:**

- Receives uploaded image
- Stores it temporarily (in memory, temp folder, or Redis)
- Returns a unique ID
- Auto-delete after 1 hour (cleanup old uploads)

### 2. Retrieve Image (After Payment)

```
GET /api/temp-image-retrieve?imageId=xxx
```

**Request:**

- Query param: `imageId` (string)

**Response:**

- Content-Type: `image/png` or `image/jpeg`
- Body: Raw image bytes

**What it does:**

- Retrieves image by ID
- Returns the raw image file
- Deletes it after retrieval (one-time use)

---

## Node.js / Express Example

```javascript
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");

const app = express();

// In-memory storage (for simplicity - use Redis in production)
const tempImages = new Map(); // { imageId: { buffer, mimetype, timestamp } }

// Cleanup old images every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [id, data] of tempImages.entries()) {
    if (data.timestamp < oneHourAgo) {
      tempImages.delete(id);
      console.log(`Deleted expired temp image: ${id}`);
    }
  }
}, 60 * 60 * 1000);

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload endpoint
app.post("/api/temp-image-upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Generate unique ID
    const imageId = crypto.randomBytes(16).toString("hex");

    // Store in memory
    tempImages.set(imageId, {
      buffer: req.file.buffer,
      mimetype: req.file.mimetype,
      timestamp: Date.now(),
    });

    console.log(`Stored temp image: ${imageId}, size: ${req.file.size} bytes`);

    res.json({ imageId });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Retrieve endpoint
app.get("/api/temp-image-retrieve", (req, res) => {
  try {
    const { imageId } = req.query;

    if (!imageId) {
      return res.status(400).json({ error: "imageId required" });
    }

    const imageData = tempImages.get(imageId);

    if (!imageData) {
      return res.status(404).json({ error: "Image not found or expired" });
    }

    // Send image
    res.set("Content-Type", imageData.mimetype);
    res.send(imageData.buffer);

    // Delete after retrieval (one-time use)
    tempImages.delete(imageId);
    console.log(`Retrieved and deleted temp image: ${imageId}`);
  } catch (error) {
    console.error("Retrieve error:", error);
    res.status(500).json({ error: error.message });
  }
});
```

**Install dependencies:**

```bash
npm install multer
```

---

## Python / FastAPI Example

```python
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.responses import Response
import uuid
from datetime import datetime, timedelta
import asyncio

app = FastAPI()

# In-memory storage
temp_images = {}  # { image_id: { "data": bytes, "mimetype": str, "timestamp": datetime } }

# Cleanup old images
async def cleanup_old_images():
    while True:
        await asyncio.sleep(3600)  # Run every hour
        cutoff = datetime.now() - timedelta(hours=1)
        expired = [img_id for img_id, data in temp_images.items() if data["timestamp"] < cutoff]
        for img_id in expired:
            del temp_images[img_id]
            print(f"Deleted expired temp image: {img_id}")

@app.on_event("startup")
async def startup():
    asyncio.create_task(cleanup_old_images())

@app.post("/api/temp-image-upload")
async def upload_temp_image(image: UploadFile = File(...)):
    try:
        # Generate unique ID
        image_id = str(uuid.uuid4())

        # Read image data
        image_data = await image.read()

        # Store in memory
        temp_images[image_id] = {
            "data": image_data,
            "mimetype": image.content_type,
            "timestamp": datetime.now()
        }

        print(f"Stored temp image: {image_id}, size: {len(image_data)} bytes")

        return {"imageId": image_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/temp-image-retrieve")
async def retrieve_temp_image(imageId: str = Query(...)):
    try:
        if imageId not in temp_images:
            raise HTTPException(status_code=404, detail="Image not found or expired")

        image_data = temp_images[imageId]

        # Delete after retrieval
        del temp_images[imageId]
        print(f"Retrieved and deleted temp image: {imageId}")

        return Response(
            content=image_data["data"],
            media_type=image_data["mimetype"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Production Considerations

### Use Redis Instead of Memory

```javascript
// Node.js with Redis
const redis = require("redis");
const client = redis.createClient();

// Store
await client.setEx(
  `temp-image:${imageId}`,
  3600, // Expire in 1 hour
  JSON.stringify({ buffer: imageBuffer.toString("base64"), mimetype })
);

// Retrieve
const data = await client.get(`temp-image:${imageId}`);
await client.del(`temp-image:${imageId}`); // Delete after retrieval
```

### Or Use File System

```javascript
const fs = require("fs").promises;
const path = require("path");

// Store
const filename = `${imageId}.jpg`;
const filepath = path.join("/tmp/uploads", filename);
await fs.writeFile(filepath, buffer);

// Retrieve
const buffer = await fs.readFile(filepath);
await fs.unlink(filepath); // Delete after retrieval
```

---

## Update Checkout Endpoint

Your checkout endpoint now receives `imageId` in the body and stores it in Stripe metadata:

```javascript
app.post("/api/checkout/embedded-session", async (req, res) => {
  const { imageId } = req.body; // Extract imageId

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hero Me Feelings - Personalized AAC Board",
            description:
              "AI-powered personalized feelings board with 24+ custom images",
          },
          unit_amount: 200, // $2.00
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${process.env.FRONTEND_URL}/hero-me?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      imageId: imageId, // IMPORTANT: Store imageId so we can retrieve image after payment
    },
  });

  res.json({ client_secret: session.client_secret });
});
```

## Update Session Status Endpoint

The session-status endpoint now needs to return the full session (including metadata):

```javascript
app.get("/api/checkout/session-status", async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: "session_id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Return full session object (includes status and metadata)
    res.json({
      status: session.status,
      metadata: session.metadata, // Contains imageId
    });
  } catch (error) {
    console.error("Error checking session status:", error);
    res.status(500).json({ error: error.message });
  }
});
```

**Python / FastAPI:**

```python
@app.get("/api/checkout/session-status")
async def check_session_status(session_id: str = Query(...)):
    try:
        if not session_id:
            raise HTTPException(status_code=400, detail="session_id is required")

        session = stripe.checkout.Session.retrieve(session_id)

        return {
            "status": session.status,
            "metadata": session.metadata  # Contains imageId
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Testing

1. **Upload test:**

   ```bash
   curl -X POST http://localhost:3000/api/temp-image-upload \
     -F "image=@test-image.jpg"
   ```

   Response: `{"imageId":"abc123..."}`

2. **Retrieve test:**
   ```bash
   curl http://localhost:3000/api/temp-image-retrieve?imageId=abc123 \
     --output retrieved.jpg
   ```

---

## Summary

1. Add `/api/temp-image-upload` endpoint
2. Add `/api/temp-image-retrieve` endpoint
3. Update checkout endpoint to accept `imageId`
4. Restart backend
5. Test the flow!

This fixes the localStorage issue permanently. 🎉

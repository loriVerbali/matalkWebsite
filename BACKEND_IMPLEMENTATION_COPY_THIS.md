# Backend Implementation - Copy This to Your Backend Repo

## What You Need to Build

Two API endpoints for Stripe payment without page refresh:

1. Create a Stripe Checkout Session
2. Check payment status

---

## Endpoint Specifications

### 1. Create Checkout Session

```
POST /api/checkout/embedded-session
```

**Request:** Empty body `{}`

**Response:**

```json
{
  "client_secret": "cs_test_a1b2c3d4..."
}
```

### 2. Check Session Status (NEW)

```
GET /api/checkout/session-status?session_id=cs_test_xxx
```

**Response:**

```json
{
  "status": "complete"
}
```

(status can be "complete", "open", or "expired")

---

## Quick Start (Choose Your Language)

### Node.js / Express

```javascript
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create checkout session
app.post("/api/checkout/embedded-session", async (req, res) => {
  try {
    const { imageId } = req.body; // Get imageId from request body

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
        imageId: imageId, // Store imageId in metadata
      },
    });

    res.json({ client_secret: session.client_secret });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Check session status (NEW - required for no page refresh)
app.get("/api/checkout/session-status", async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).json({ error: "session_id is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.status,
      metadata: session.metadata, // Includes imageId
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

**Install:**

```bash
npm install stripe express cors
```

---

### Python / FastAPI

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Create checkout session
@app.post("/api/checkout/embedded-session")
async def create_checkout_session(request: dict):
    try:
        image_id = request.get("imageId")  # Get imageId from request body

        session = stripe.checkout.Session.create(
            ui_mode="embedded",
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Hero Me Feelings - Personalized AAC Board",
                        "description": "AI-powered personalized feelings board with 24+ custom images"
                    },
                    "unit_amount": 200
                },
                "quantity": 1
            }],
            mode="payment",
            return_url=f"{os.getenv('FRONTEND_URL')}/hero-me?session_id={{CHECKOUT_SESSION_ID}}",
            metadata={
                "imageId": image_id  # Store imageId in metadata
            }
        )
        return {"client_secret": session.client_secret}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Check session status (NEW - required for no page refresh)
@app.get("/api/checkout/session-status")
async def check_session_status(session_id: str):
    try:
        if not session_id:
            raise HTTPException(status_code=400, detail="session_id is required")

        session = stripe.checkout.Session.retrieve(session_id)

        return {
            "status": session.status,
            "metadata": session.metadata  # Includes imageId
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

**Install:**

```bash
pip install stripe fastapi uvicorn
```

**Run:**

```bash
uvicorn main:app --reload
```

---

### Python / Django

```python
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@csrf_exempt
def create_checkout_session(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        session = stripe.checkout.Session.create(
            ui_mode="embedded",
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Hero Me Feelings - Personalized AAC Board",
                        "description": "AI-powered personalized feelings board with 24+ custom images"
                    },
                    "unit_amount": 200
                },
                "quantity": 1
            }],
            mode="payment",
            return_url=f"{os.getenv('FRONTEND_URL')}/hero-me?session_id={{CHECKOUT_SESSION_ID}}"
        )
        return JsonResponse({"client_secret": session.client_secret})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/checkout/embedded-session', views.create_checkout_session),
]
```

**Install:**

```bash
pip install stripe
```

---

### Ruby / Rails

```ruby
# config/routes.rb
post 'api/checkout/embedded-session', to: 'checkout#create_embedded_session'

# app/controllers/checkout_controller.rb
class CheckoutController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create_embedded_session
    Stripe.api_key = ENV['STRIPE_SECRET_KEY']

    session = Stripe::Checkout::Session.create(
      ui_mode: 'embedded',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Hero Me Feelings - Personalized AAC Board',
            description: 'AI-powered personalized feelings board with 24+ custom images'
          },
          unit_amount: 200
        },
        quantity: 1
      }],
      mode: 'payment',
      return_url: "#{ENV['FRONTEND_URL']}/hero-me?session_id={CHECKOUT_SESSION_ID}"
    )

    render json: { client_secret: session.client_secret }
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: 500
  end
end
```

**Install:**

```bash
gem install stripe
```

---

## Environment Variables

Set these in your backend:

```bash
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
FRONTEND_URL=http://localhost:5173
```

---

## Test It

```bash
curl -X POST http://localhost:YOUR_PORT/api/checkout/embedded-session \
  -H "Content-Type: application/json" \
  -d '{}'
```

Expected response:

```json
{
  "client_secret": "cs_test_..."
}
```

---

## Get Stripe Keys

1. Go to: https://dashboard.stripe.com/apikeys
2. Sign up/login
3. Copy your **Secret key** (starts with `sk_test_`)
4. That's it!

---

## CORS Setup

Make sure CORS is enabled for your frontend domain:

```javascript
// Allow frontend domain
Access-Control-Allow-Origin: https://your-frontend.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## That's It!

1. Choose your language above
2. Copy the code
3. Set `STRIPE_SECRET_KEY` environment variable
4. Run your backend
5. Test with cURL
6. Done! ✅

---

## More Details

See `BACKEND_PRD.md` for:

- More language examples (Go, etc.)
- Optional webhook setup
- Security best practices
- Production checklist

---

**Need Help?**

- Stripe Docs: https://stripe.com/docs/payments/checkout/embedded
- Test Cards: https://stripe.com/docs/testing

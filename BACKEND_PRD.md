# Backend API - Stripe Payment Integration PRD

## Overview

Implement backend API endpoints to handle Stripe Embedded Checkout for the "Hero Me Feelings" feature. These endpoints create a Stripe Checkout Session for a one-time $2.00 payment and check payment status without page refresh.

---

## Endpoints

### 1. Create Checkout Session

```
POST /api/checkout/embedded-session
```

### 2. Check Session Status (NEW - Required for No Refresh)

```
GET /api/checkout/session-status?session_id={CHECKOUT_SESSION_ID}
```

---

## 1. Create Checkout Session Endpoint

### Request

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{}
```

_Note: Body can be empty or include optional metadata (see Optional Fields below)_

### Response

**Success (200 OK):**

```json
{
  "client_secret": "cs_test_a1b2c3d4e5f6g7h8i9j0..."
}
```

**Error (500):**

```json
{
  "error": "Error message here"
}
```

---

## 2. Check Session Status Endpoint

### Request

**Method:** GET

**Query Parameters:**

- `session_id` (required): The Stripe Checkout Session ID (starts with `cs_test_` or `cs_live_`)

**Example:**

```
GET /api/checkout/session-status?session_id=cs_test_a1b2c3d4e5f6g7h8i9j0
```

### Response

**Success (200 OK):**

```json
{
  "status": "complete"
}
```

or

```json
{
  "status": "open"
}
```

or

```json
{
  "status": "expired"
}
```

**Error (500):**

```json
{
  "error": "Error message here"
}
```

---

## Implementation Requirements

### 1. Create Stripe Checkout Session

Use Stripe's API to create a checkout session with these exact parameters:

```javascript
{
  ui_mode: "embedded",
  line_items: [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Hero Me Feelings - Personalized AAC Board",
          description: "AI-powered personalized feelings board with 24+ custom images"
        },
        unit_amount: 200  // $2.00 in cents
      },
      quantity: 1
    }
  ],
  mode: "payment",
  return_url: "https://your-frontend-url.com/hero-me?session_id={CHECKOUT_SESSION_ID}"
}
```

### 2. Return client_secret

The Stripe API will return a session object with a `client_secret` field. Return ONLY the `client_secret` to the frontend.

### 3. Check Session Status

Retrieve the session from Stripe using the session ID and return its status:

```javascript
const session = await stripe.checkout.sessions.retrieve(sessionId);
return { status: session.status }; // Returns: "complete", "open", or "expired"
```

### 4. CORS Configuration

**IMPORTANT:** Enable CORS for your frontend domain:

```
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

For development, you can use `*` but restrict to your domain in production.

---

## Example Implementations

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
    });

    res.json({ client_secret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
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

    res.json({ status: session.status });
  } catch (error) {
    console.error("Error checking session status:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

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
    allow_origins=["*"],  # Restrict in production
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Create checkout session
@app.post("/api/checkout/embedded-session")
async def create_checkout_session():
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
                    "unit_amount": 200  # $2.00
                },
                "quantity": 1
            }],
            mode="payment",
            return_url=f"{os.getenv('FRONTEND_URL')}/hero-me?session_id={{CHECKOUT_SESSION_ID}}"
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

        return {"status": session.status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Python / Django

```python
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import stripe
import os
import json

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@csrf_exempt
@require_http_methods(["POST"])
def create_checkout_session(request):
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

### Go / Gin

```go
package main

import (
    "os"
    "github.com/gin-gonic/gin"
    "github.com/stripe/stripe-go/v76"
    "github.com/stripe/stripe-go/v76/checkout/session"
)

func main() {
    stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

    r := gin.Default()

    // CORS
    r.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    })

    r.POST("/api/checkout/embedded-session", createCheckoutSession)
    r.Run()
}

func createCheckoutSession(c *gin.Context) {
    params := &stripe.CheckoutSessionParams{
        UIMode: stripe.String("embedded"),
        LineItems: []*stripe.CheckoutSessionLineItemParams{
            {
                PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
                    Currency: stripe.String("usd"),
                    ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
                        Name:        stripe.String("Hero Me Feelings - Personalized AAC Board"),
                        Description: stripe.String("AI-powered personalized feelings board with 24+ custom images"),
                    },
                    UnitAmount: stripe.Int64(200),
                },
                Quantity: stripe.Int64(1),
            },
        },
        Mode: stripe.String(string(stripe.CheckoutSessionModePayment)),
        ReturnURL: stripe.String(os.Getenv("FRONTEND_URL") + "/playground?session_id={CHECKOUT_SESSION_ID}"),
    }

    s, err := session.New(params)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    c.JSON(200, gin.H{"client_secret": s.ClientSecret})
}
```

---

## Environment Variables Required

```bash
STRIPE_SECRET_KEY=sk_test_...   # Your Stripe secret key
FRONTEND_URL=https://your-frontend-url.com  # Your frontend URL for return_url
```

**Get your Stripe keys:**

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Secret key** (starts with `sk_test_` for testing)
3. For production, use live key (starts with `sk_live_`)

---

## Testing

### Test the endpoint with cURL:

```bash
curl -X POST http://localhost:3000/api/checkout/embedded-session \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**

```json
{
  "client_secret": "cs_test_a1b2c3d4e5f6g7h8i9j0..."
}
```

### Test with Stripe test cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date
- Use any 3-digit CVC
- Use any ZIP code

---

## Optional: Enhanced Implementation

### Optional Fields (for tracking)

You can optionally accept and pass these fields from the request body:

```json
{
  "metadata": {
    "user_id": "user_123",
    "device_id": "device_456"
  },
  "customer_email": "user@example.com"
}
```

Add to Stripe session creation:

```javascript
const session = await stripe.checkout.sessions.create({
  // ... existing fields ...
  metadata: req.body.metadata || {},
  customer_email: req.body.customer_email,
});
```

### Webhook Handler (Optional but Recommended)

Create a webhook endpoint to track successful payments:

```javascript
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        // Log payment success, update database, etc.
        console.log("Payment successful:", session.id);
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);
```

---

## Security Checklist

- ✅ Use HTTPS in production
- ✅ Keep `STRIPE_SECRET_KEY` secure (never expose to frontend)
- ✅ Validate request body (if accepting optional fields)
- ✅ Enable CORS only for your frontend domain in production
- ✅ Set up Stripe webhooks for payment confirmation
- ✅ Log errors for debugging
- ✅ Rate limit the endpoint to prevent abuse

---

## Deployment Checklist

1. ✅ Install Stripe SDK for your language
2. ✅ Set `STRIPE_SECRET_KEY` environment variable
3. ✅ Set `FRONTEND_URL` environment variable
4. ✅ Enable CORS for frontend domain
5. ✅ Test endpoint with cURL
6. ✅ Test full payment flow from frontend
7. ✅ Monitor Stripe dashboard for test payments
8. ✅ Switch to live keys for production

---

## Frontend Integration (Already Done)

The frontend is already configured to call this endpoint:

```javascript
const response = await fetch("/api/checkout/embedded-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

const { client_secret } = await response.json();
```

The frontend expects:

- Endpoint at `/api/checkout/embedded-session`
- POST method
- Returns `{ client_secret: "..." }`

---

## Support Resources

- **Stripe Embedded Checkout Docs**: https://stripe.com/docs/payments/checkout/embedded
- **Stripe API Reference**: https://stripe.com/docs/api
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Testing**: https://stripe.com/docs/testing

---

## Questions?

If you need help implementing this:

1. Choose your backend language/framework from the examples
2. Install Stripe SDK
3. Set environment variables
4. Copy the example code
5. Test with cURL
6. Test from frontend

**That's it!** The endpoint is simple - just create a Stripe session and return the client_secret. 🚀

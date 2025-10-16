# Stripe Embedded Checkout Setup

This document explains how Stripe's Embedded Checkout is integrated into the MaTalk Playground feature.

## Implementation

The payment flow uses Stripe's Embedded Checkout for a $2.00 payment. This provides an integrated payment experience within a modal overlay.

### Files Modified:

1. **`index.html`** - Added Stripe.js script
2. **`src/components/Playground.tsx`** - Added embedded checkout implementation
3. **`netlify/functions/checkout-embedded-session.ts`** - Netlify serverless function for creating checkout sessions
4. **`netlify.toml`** - Configured to handle API routes via Netlify Functions

### Backend API Endpoint:

The implementation uses a Netlify Function at:

```
/api/checkout/embedded-session
```

This endpoint creates a Stripe Checkout Session for $2.00.

## How It Works

1. **User uploads photo** - File is validated and stored
2. **User clicks "Create Hero Me Feelings - $2.00"** - Opens payment modal
3. **Payment flow:**
   - Modal opens with embedded Stripe checkout
   - User completes payment within the modal ($2.00)
   - Checkout automatically closes on success
   - Generation starts automatically
4. **After successful payment** - Generation starts automatically
5. **User gets 24+ personalized feeling images**

## Code Implementation

### Payment Button Handler:

```typescript
const handlePaymentClick = async () => {
  if (!uploadedImage) return;

  setIsLoadingCheckout(true);
  setShowCheckoutModal(true);

  try {
    // Initialize Stripe
    const stripe = window.Stripe("pk_test_...");

    // Ask backend for a client_secret
    const resp = await fetch("/api/checkout/embedded-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // optional:
        // clientReferenceId: userId,
        // metadata: { deviceId },
        // customerEmail: userEmail,
      }),
    });
    const { client_secret } = await resp.json();

    // Mount in your modal container
    const checkout = await stripe.initEmbeddedCheckout({
      clientSecret: client_secret,
    });
    checkout.mount("#checkout"); // <div id="checkout"></div> inside your modal

    // Listen for checkout events
    checkout.on("complete", () => {
      setShowCheckoutModal(false);
      setShouldStartGeneration(true);
      // Show success message and start generation
    });
  } catch (error) {
    // Handle errors
  } finally {
    setIsLoadingCheckout(false);
  }
};
```

### Modal Structure:

```jsx
{
  showCheckoutModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
          <button onClick={() => setShowCheckoutModal(false)}>×</button>
        </div>
        <div className="p-6">
          <div id="checkout" className="min-h-[400px]"></div>
        </div>
      </div>
    </div>
  );
}
```

## Backend API Requirements

The backend endpoint should:

1. **Accept POST requests** to `/api/checkout/embedded-session`
2. **Request body:**
   ```json
   {
     // optional:
     // clientReferenceId: userId,
     // metadata: { deviceId },
     // customerEmail: userEmail,
   }
   ```
3. **Response:**
   ```json
   {
     "client_secret": "cs_test_..."
   }
   ```

## Return Page Handling

On your `/return` page:

```typescript
const params = new URLSearchParams(location.search);
const sessionId = params.get("session_id");
const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
const session = await res.json();
if (session.payment_status === "paid") {
  // unlock the $2 feature here
}
```

## Benefits

- **Integrated experience** - Checkout happens within the app
- **No new tabs** - Everything stays in the same window
- **Better mobile experience** - Modal works well on all devices
- **Customizable** - Full control over the checkout UI

## Testing

- Use Stripe's test mode for development
- Test with Stripe's test card numbers
- Monitor Stripe Dashboard for payment events

## Production

- Replace test keys with live keys
- Ensure backend API is properly configured
- Monitor payment success/failure rates

## Environment Variables Setup

### Required Environment Variables:

Create a `.env` file in the root directory with the following variables:

```bash
# Stripe Secret Key (for backend/Netlify Functions)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Publishable Key (for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### Getting Your Stripe Keys:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Sign in or create an account
3. Navigate to **Developers > API keys**
4. Copy your **Publishable key** and **Secret key**
5. For testing, use the test mode keys (they start with `pk_test_` and `sk_test_`)
6. For production, use live mode keys (they start with `pk_live_` and `sk_live_`)

### Setting Up Environment Variables:

#### Local Development:

1. Create a `.env` file in the project root
2. Add the variables above with your test keys
3. Never commit this file to git (it's already in `.gitignore`)

#### Netlify Production/Deployment:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings > Environment variables**
3. Add both `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLISHABLE_KEY`
4. Use your production (live) keys for the production site
5. Deploy your site

### Testing the Integration:

Use Stripe's test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date
- Use any 3-digit CVC
- Use any ZIP code

### Installation:

After cloning the repository, install the required dependencies:

```bash
npm install
# or
yarn install
```

This will install:

- `@netlify/functions` - For Netlify serverless functions
- `stripe` - For backend Stripe API calls
- `netlify-cli` - For local development with Netlify functions

### Local Development with Netlify Functions:

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Start local development with Netlify Functions
netlify dev
```

This will start both your Vite dev server and Netlify Functions locally.

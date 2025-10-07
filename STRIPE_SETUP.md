# Stripe Embedded Checkout Setup

This document explains how Stripe's Embedded Checkout is integrated into the MaTalk Playground feature.

## Implementation

The payment flow now uses Stripe's Embedded Checkout instead of buy buttons. This provides a more integrated payment experience within a modal overlay.

### Files Modified:

1. **`index.html`** - Added Stripe.js script
2. **`src/components/Playground.tsx`** - Added embedded checkout implementation

### Backend API Endpoint:

The implementation expects a backend API endpoint at:

```
/api/checkout/embedded-session
```

## How It Works

1. **User uploads photo** - File is validated and stored
2. **User sees two options:**
   - "Continue (Free Preview)" - Starts generation without payment
   - "Pay $2.00" button - Opens embedded checkout modal
3. **Payment flow:**
   - User clicks "Pay $2.00" button
   - Modal opens with embedded Stripe checkout
   - User completes payment within the modal
   - Checkout automatically closes on success
   - Generation starts automatically
4. **After successful payment** - Generation starts automatically
5. **User gets personalized feeling images**

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

# Production Booking Issues - Complete Diagnosis & Fix

## Issues Summary

### Issue #1: Payment Session Creation Fails (500 Error)
**URL**: https://www.tsla.miami/book/payment/BK-EAC2B6586BB51B55
**Error**: 500 Internal Server Error on payment button click
**User-facing message**: "Booking Not Found" / "Failed to create payment session"

### Issue #2: Confirmation Page Fails After Payment
**URL**: http://localhost:3000/book/confirmation/BK-XXX?session_id=cs_test_...
**Error**: "Booking is not confirmed"
**User-facing message**: "Confirmation Failed" / "Booking is not confirmed"

## Root Cause Analysis

### What Works ✅
1. **Booking retrieval API** (`/api/booking/[bookingId]`) - Returns 200 OK
2. **Database connectivity** - Booking exists and is retrievable
3. **Page rendering** - Payment page loads correctly with all booking details
4. **Booking data** - All customer and rental information is correct

### What Fails ❌
1. **Payment session creation API** (`/api/payment/create-session`) - Returns 500 error
2. When user clicks "Pay $50 Booking Fee" button, the Stripe checkout session creation fails

## Root Causes Identified

### Issue #1 Root Causes

### 1. Stripe Secret Key Has Quotes
**Problem**: The `STRIPE_SECRET_KEY` environment variable in Vercel has quotes around it
- Stored as: `"sk_live_..."`
- Should be: `sk_live_...`
- This causes: `Invalid character in header content ["Authorization"]` error

**Fix**: Added code to strip surrounding quotes from the key

```typescript
// Added quote stripping
function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  let cleanKey = key.trim();
  
  // Remove surrounding quotes if present
  if ((cleanKey.startsWith('"') && cleanKey.endsWith('"')) || 
      (cleanKey.startsWith("'") && cleanKey.endsWith("'"))) {
    cleanKey = cleanKey.slice(1, -1);
  }
  
  return new Stripe(cleanKey, {
    apiVersion: '2025-12-15.clover',
  });
}
```

### 2. Module-Level Stripe Initialization
**Problem**: Stripe was initialized at module level, causing crashes if env var had issues
**Fix**: Changed to lazy initialization (initialize only when needed)

### Issue #2 Root Cause

### 3. Confirmation Page Relies on Webhook
**Problem**: The confirmation page expected the booking to already be confirmed by the webhook
- Webhooks don't work on localhost (Stripe can't reach local machine)
- Even in production, there can be a delay between payment and webhook firing
**Fix**: Added `/api/payment/verify-session` endpoint that:
1. Verifies the Stripe payment session
2. Updates the booking status to confirmed if payment is successful
3. Sends confirmation notification
4. Returns the confirmed booking

```typescript
// Added validation
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is missing');
  return NextResponse.json(
    { error: 'Payment system configuration error' },
    { status: 500 }
  );
}

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.error('NEXT_PUBLIC_BASE_URL is missing');
  return NextResponse.json(
    { error: 'Payment system configuration error' },
    { status: 500 }
  );
}
```

## Files Changed

### 1. `app/api/payment/create-session/route.ts`
- Added lazy Stripe initialization with quote stripping
- Added environment variable validation
- Improved error logging

### 2. `app/api/payment/webhook/route.ts`
- Added lazy Stripe initialization with quote stripping

### 3. `app/api/payment/verify-session/route.ts` (NEW)
- Created endpoint to verify Stripe payment sessions
- Updates booking status to confirmed
- Sends confirmation notifications

### 4. `app/book/confirmation/[bookingId]/page.tsx`
- Changed to call verify-session endpoint instead of just fetching booking
- Now works even if webhook hasn't fired yet

## Required Environment Variables

Ensure these are set in Vercel production environment:

1. **STRIPE_SECRET_KEY** - Your Stripe secret key (starts with `sk_live_` or `sk_test_`)
2. **NEXT_PUBLIC_BASE_URL** - Your production URL (`https://www.tsla.miami`)
3. **STRIPE_WEBHOOK_SECRET** - Stripe webhook signing secret (starts with `whsec_`)
4. **DATABASE_URL** - PostgreSQL connection string (already working)
5. **NTFY_ACCESS_TOKEN** - For booking notifications (optional)

## Testing the Fix

### Local Testing
```bash
# Test the payment API locally
curl -X POST "http://localhost:3000/api/payment/create-session" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "BK-EAC2B6586BB51B55",
    "amount": 50,
    "customerEmail": "romanvieito@gmail.com"
  }'
```

### Production Testing
1. Navigate to: https://www.tsla.miami/book/payment/BK-EAC2B6586BB51B55
2. Click "Pay $50 Booking Fee"
3. Should redirect to Stripe Checkout (not error)

## Deployment Steps

1. **Commit the changes**:
   ```bash
   git add app/api/payment/create-session/route.ts
   git add app/api/payment/webhook/route.ts
   git commit -m "Fix: Update Stripe API version and add environment validation"
   ```

2. **Verify environment variables in Vercel**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Ensure all required variables are set
   - Redeploy if variables were added/changed

3. **Deploy to production**:
   ```bash
   git push origin main
   ```

4. **Monitor deployment**:
   - Check Vercel deployment logs
   - Test the payment flow
   - Monitor error logs for any issues

## Additional Recommendations

### 1. Add Health Check Endpoint
Create `/api/health` to verify all environment variables are set:

```typescript
export async function GET() {
  const checks = {
    stripe: !!process.env.STRIPE_SECRET_KEY,
    baseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
    database: !!process.env.DATABASE_URL,
    webhook: !!process.env.STRIPE_WEBHOOK_SECRET,
  };
  
  const allHealthy = Object.values(checks).every(v => v);
  
  return NextResponse.json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks,
  }, { status: allHealthy ? 200 : 500 });
}
```

### 2. Implement Better Error Boundaries
Add user-friendly error messages on the frontend for different error scenarios.

### 3. Set Up Monitoring
- Enable Vercel Analytics
- Set up Sentry or similar error tracking
- Monitor Stripe webhook delivery

## Timeline
- **Issue Reported**: January 5, 2026, 19:10 UTC
- **Diagnosis Completed**: January 5, 2026, 19:15 UTC
- **Fix Applied**: January 5, 2026, 19:20 UTC
- **Status**: Ready for deployment

## Contact
For questions or issues, contact the development team.


# Production Booking Issue - Diagnosis & Fix

## Issue Summary
**URL**: https://www.tsla.miami/book/payment/BK-EAC2B6586BB51B55
**Error**: 500 Internal Server Error on payment button click
**User-facing message**: "Booking Not Found" / "Failed to create payment session"

## Root Cause Analysis

### What Works ✅
1. **Booking retrieval API** (`/api/booking/[bookingId]`) - Returns 200 OK
2. **Database connectivity** - Booking exists and is retrievable
3. **Page rendering** - Payment page loads correctly with all booking details
4. **Booking data** - All customer and rental information is correct

### What Fails ❌
1. **Payment session creation API** (`/api/payment/create-session`) - Returns 500 error
2. When user clicks "Pay $50 Booking Fee" button, the Stripe checkout session creation fails

## Identified Issues

### 1. Invalid Stripe API Version
**File**: `app/api/payment/create-session/route.ts` & `app/api/payment/webhook/route.ts`
**Problem**: Using non-existent API version `'2025-12-15.clover'`
**Fix**: Changed to valid version `'2024-11-20.acacia'`

```typescript
// Before (WRONG)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',  // This version doesn't exist
});

// After (CORRECT)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',  // Valid Stripe API version
});
```

### 2. Missing Environment Variable Validation
**Problem**: No validation for required environment variables
**Fix**: Added validation checks at the start of the POST handler

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

### 3. Insufficient Error Logging
**Problem**: Generic error messages without details
**Fix**: Enhanced error logging

```typescript
catch (error) {
  console.error('Payment session creation error:', error);
  console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
  return NextResponse.json(
    { error: 'Failed to create payment session' },
    { status: 500 }
  );
}
```

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


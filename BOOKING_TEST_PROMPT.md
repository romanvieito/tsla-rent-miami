# Tesla Rental Booking Flow Test Prompt

## Overview
Test the complete booking flow for the Tsla.miami Tesla rental website, ensuring all components work correctly from booking creation through payment completion and confirmation.

## Prerequisites
- Access to the tsla.miami website at https://www.tsla.miami
- Stripe test payment credentials (if testing payment flow)
- Ability to inspect browser network requests and console
- Access to database to verify booking persistence

## Test Environment Setup
1. Ensure the website is running (check https://www.tsla.miami)
2. Verify database connectivity (Neon PostgreSQL)
3. Confirm Stripe webhook endpoints are configured
4. Clear any existing test bookings from database

## Complete Booking Flow Test

### Phase 1: Booking Creation
**Goal**: Create a new booking draft successfully

**Steps**:
1. Navigate to https://www.tsla.miami
2. Select a Tesla model (e.g., Model Y)
3. Choose pickup location (e.g., "Miami International Airport")
4. Select rental dates (ensure at least 3 days)
5. Fill out customer information:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+1 (555) 123-4567"
6. Click "Continue to Payment"
7. Verify redirect to payment page: `/book/payment/BK-XXXXX`

**Expected Results**:
- ✅ Booking ID generated (format: BK-XXXXXXXX)
- ✅ Payment page loads with booking details
- ✅ Booking stored in database with status "draft"
- ✅ 30-minute expiration timer active

### Phase 2: Payment Processing
**Goal**: Complete secure payment and confirm booking

**Steps**:
1. On payment page, verify booking details display correctly:
   - Customer information matches input
   - Car model and pricing correct
   - Rental dates and duration accurate
   - Deposit amount = $50
2. Click "Pay $50 Booking Fee"
3. Complete Stripe checkout:
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any CVC and name
4. Verify successful payment redirect to confirmation page

**Expected Results**:
- ✅ Stripe checkout completes without errors
- ✅ Booking status updates to "confirmed"
- ✅ Payment record created in database
- ✅ Confirmation page displays booking details
- ✅ Confirmation email/notification sent

### Phase 3: Persistence Testing
**Goal**: Ensure booking survives page refreshes and server restarts

**Steps**:
1. During booking flow, refresh the payment page URL
2. Verify booking loads correctly (not "Booking Not Found")
3. Test server restart simulation:
   - Navigate to payment URL
   - Kill/restart Next.js server
   - Refresh payment page
   - Verify booking persists

**Expected Results**:
- ✅ Page refresh maintains booking data
- ✅ Server restart doesn't lose booking
- ✅ Database queries return consistent data

### Phase 4: Edge Cases & Error Handling
**Goal**: Test system robustness

**Test Cases**:

#### Expired Booking
1. Create booking draft
2. Wait >30 minutes
3. Refresh payment page
**Expected**: "Booking Not Found" error

#### Invalid Booking ID
1. Navigate to `/book/payment/BK-INVALID`
**Expected**: "Booking Not Found" error

#### Double Payment Prevention
1. Complete payment successfully
2. Attempt to access payment URL again
**Expected**: Appropriate redirect or error message

#### Database Connectivity Issues
1. Temporarily disconnect database
2. Attempt booking creation
**Expected**: Graceful error handling

### Phase 5: Data Integrity Verification
**Goal**: Confirm all data flows correctly

**Database Checks**:
```sql
-- Check booking creation
SELECT * FROM bookings WHERE email = 'test@example.com' ORDER BY created_at DESC LIMIT 1;

-- Verify payment completion
SELECT * FROM bookings WHERE status = 'confirmed' AND payment_id IS NOT NULL;

-- Check for expired bookings cleanup
SELECT COUNT(*) FROM bookings WHERE status = 'draft' AND expires_at < NOW();
```

**Expected Results**:
- ✅ All booking data stored correctly
- ✅ Payment information linked properly
- ✅ Status transitions work as expected
- ✅ Expired bookings cleaned up automatically

### Phase 6: Integration Testing
**Goal**: Verify external service integrations

**Stripe Webhook Testing**:
1. Use Stripe CLI to forward webhooks locally
2. Complete test payment
3. Verify webhook processing:
   - Booking status updates
   - Confirmation notifications sent
   - Database records accurate

**CRM Integration**:
1. Verify booking data appears in CRM system
2. Check trip records created properly
3. Confirm notification systems triggered

## Success Criteria
- ✅ All phases complete without errors
- ✅ Booking persists across refreshes/restarts
- ✅ Payment processing works end-to-end
- ✅ Database integrity maintained
- ✅ Error cases handled gracefully
- ✅ External integrations function correctly

## Common Issues to Watch For
- "Booking Not Found" on refresh (indicates storage issue)
- Payment failures (Stripe configuration)
- Database connection errors
- Webhook processing failures
- Email/notification delivery issues

## Performance Benchmarks
- Booking creation: <2 seconds
- Page load times: <3 seconds
- Payment processing: <10 seconds
- Database queries: <500ms

## Cleanup Instructions
After testing, remove test bookings:
```sql
DELETE FROM bookings WHERE email = 'test@example.com';
```

This comprehensive test ensures the booking system is production-ready and handles all real-world scenarios correctly.

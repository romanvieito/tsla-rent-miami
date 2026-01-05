#!/bin/bash

# Tesla Miami Rental - Payment Flow Test Script
echo "🧪 Testing Tesla Miami Payment Flow"
echo "==================================="

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Next.js server not running. Start it with: npm run dev"
    exit 1
fi

echo "✅ Next.js server is running"

# Check if webhook listener is running
if ! pgrep -f "stripe listen" > /dev/null; then
    echo "⚠️  Stripe webhook listener not running"
    echo "   Start it with: stripe listen --forward-to localhost:3000/api/payment/webhook"
else
    echo "✅ Stripe webhook listener is running"
fi

echo ""
echo "🧪 Test Instructions:"
echo "====================="
echo "1. Open http://localhost:3000 in your browser"
echo "2. Fill out the booking form:"
echo "   - Select any car model"
echo "   - Choose pickup date (tomorrow)"
echo "   - Choose return date (3 days later)"
echo "   - Select 'Miami International Airport' location"
echo "   - Enter your details (name, email, phone)"
echo "3. Click 'Reserve Now'"
echo "4. On payment page, click 'Pay $50 Booking Fee'"
echo "5. Use test card: 4242 4242 4242 4242"
echo "   - Any future expiry date"
echo "   - Any CVC"
echo "   - Any name"
echo "6. Complete payment and verify confirmation page"

echo ""
echo "💳 Test Cards:"
echo "=============="
echo "✅ Success: 4242 4242 4242 4242"
echo "❌ Decline: 4000 0000 0000 0002"
echo "🔒 Auth required: 4000 0025 0000 3155"

echo ""
echo "📊 Expected Results:"
echo "==================="
echo "- Booking created with unique ID (BK-XXXXXXXXXX)"
echo "- Payment processed via Stripe"
echo "- Confirmation page shows booking details"
echo "- Notification sent via NTFY (check your phone/app)"

echo ""
echo "🚨 Troubleshooting:"
echo "=================="
echo "- If webhook fails: Check webhook listener is running"
echo "- If payment fails: Check Stripe credentials in .env.local"
echo "- If booking fails: Check API endpoints are working"

echo ""
echo "🎉 Ready to test! Open http://localhost:3000"

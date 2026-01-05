#!/bin/bash

# Tesla Miami Rental - Stripe Setup Script
echo "🚀 Setting up Stripe for Tesla Miami Rental Payment System"
echo "=========================================================="

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_TEST_WEBHOOK_SECRET

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Existing Configuration (REPLACE WITH YOUR VALUES)
NTFY_ACCESS_TOKEN=your_ntfy_token_here
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here
EOF
    echo "✅ Created .env.local with Stripe credentials"
else
    echo "⚠️  .env.local already exists - please update it manually if needed"
fi

echo ""
echo "📋 Stripe Products Created:"
echo "=========================="
echo "Product: Tesla Rental Booking Fee (prod_TjkcXQY5MkSTLu)"
echo "Fixed Price: $50 booking fee for all Tesla rentals"
echo "Price ID: price_1SmH77AagQf93B5veU4erAc8"

echo ""
echo "🔧 Webhook Configuration:"
echo "========================"
echo "Webhook URL: http://localhost:3000/api/payment/webhook"
echo "Secret: whsec_4c2736d4179663a64c358a16c1bb2a502bff2a311b51f179e1f8a0387c4b5f"

echo ""
echo "🚀 Next Steps:"
echo "=============="
echo "1. Update .env.local with your NTFY_ACCESS_TOKEN and MIXPANEL_TOKEN"
echo "2. Start your Next.js dev server: npm run dev"
echo "3. Test the payment flow:"
echo "   - Go to http://localhost:3000"
echo "   - Fill out booking form"
echo "   - Pay with test card: 4242 4242 4242 4242"
echo "4. For production, update NEXT_PUBLIC_BASE_URL and create production webhook"

echo ""
echo "💳 Test Cards:"
echo "=============="
echo "Success: 4242 4242 4242 4242"
echo "Decline: 4000 0000 0000 0002"
echo "Require auth: 4000 0025 0000 3155"

echo ""
echo "🎉 Setup complete! Your payment system is ready."

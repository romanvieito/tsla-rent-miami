#!/bin/bash

echo "Setting up environment variables for TSLA Rent Miami..."
echo ""
echo "Please provide your Mixpanel project token (from https://app.mixpanel.com/settings/project):"
read -p "NEXT_PUBLIC_MIXPANEL_TOKEN: " MIXPANEL_TOKEN

if [ -z "$MIXPANEL_TOKEN" ]; then
    echo "Error: Mixpanel token is required"
    exit 1
fi

echo ""
echo "Please provide your Google Maps API key (from https://console.cloud.google.com/apis/credentials):"
read -p "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: " GOOGLE_MAPS_KEY

echo ""
echo "Please provide your Stripe secret key (starts with sk_test_ or sk_live_):"
read -p "STRIPE_SECRET_KEY: " STRIPE_KEY

echo ""
echo "Please provide your Stripe webhook secret (starts with whsec_):"
read -p "STRIPE_WEBHOOK_SECRET: " WEBHOOK_SECRET

echo ""
echo "Please provide your database URL:"
read -p "DATABASE_URL: " DATABASE_URL

# Create .env.local file
cat > .env.local << EOF
# Mixpanel Configuration
NEXT_PUBLIC_MIXPANEL_TOKEN=${MIXPANEL_TOKEN}
MIXPANEL_TOKEN=${MIXPANEL_TOKEN}

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_KEY}

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=${DATABASE_URL}

# Stripe
STRIPE_SECRET_KEY=${STRIPE_KEY}
STRIPE_WEBHOOK_SECRET=${WEBHOOK_SECRET}

# Optional: NTFY for notifications
# NTFY_ACCESS_TOKEN=your_ntfy_token_here
EOF

echo ""
echo "Environment variables saved to .env.local"
echo "Please restart your development server: npm run dev"
echo ""
echo "Note: For production deployment on Vercel, set these environment variables in your Vercel dashboard."
echo "Remember to change NEXT_PUBLIC_BASE_URL to your production URL (https://www.tsla.miami) for production."
# TSLA Rent Miami

A Next.js application ready for deployment on Vercel.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file with your Google Maps API key:

```
GOOGLE_MAPS_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

**Note:** Both variables should use the same key. `GOOGLE_MAPS_API_KEY` is used server-side for Places API calls, while `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is used client-side for the Google Maps display.

**Google Ads Conversion Tracking:**
- Google Ads conversion tracking is configured and will fire automatically when users successfully submit the reservation form (click "Reserve" button)
- The conversion ID is hardcoded in the application code

**API Requirements:**
- The key needs access to **Places API (Autocomplete + Details)** and **Maps JavaScript API**
- Restrict the key to your Vercel/localhost origins on Google Cloud Console
- When the key is missing or invalid, the app automatically falls back to Leaflet/OpenStreetMap

**Fallback Behavior:**
- ✅ With valid Google Maps API key: Uses Google Maps with enhanced integration
- ✅ Without key or on error: Falls back to Leaflet with OpenStreetMap (free, no API key needed)

### Mixpanel Analytics Setup

The app includes comprehensive Mixpanel analytics for tracking user behavior and conversions on both client and server sides.

1. Create a Mixpanel account at [mixpanel.com](https://mixpanel.com)
2. Create a new project for your website
3. Copy your Project Token from the project settings
4. Add to your `.env.local` file and Vercel environment variables:

```
# Client-side tracking (browser events)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_project_token_here

# Server-side tracking (API events)
MIXPANEL_TOKEN=your_mixpanel_project_token_here
```

**Important:** Both tokens should use the same Mixpanel project token. The `NEXT_PUBLIC_` prefix exposes the token to browser code, while the server-side token remains secure.

**Analytics Events Tracked:**

**Client-Side Events:**
- Page views (all pages)
- Car selection (homepage and book page)
- Form submissions (inquiry forms)
- Booking inquiries (detailed booking data)
- Navigation between pages
- Payment initiation and completion

**Server-Side Events:**
- Booking creation and validation
- Payment session creation
- Payment verification and completion
- Stripe webhook processing
- API errors and failures
- Notification sending

## Setup with GitHub

1. Create a new repository on GitHub (don't initialize with README, .gitignore, or license)

2. Add the remote and push your code:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tsla-rent-miami.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import your GitHub repository (`tsla-rent-miami`)
4. Vercel will automatically detect Next.js and configure the project
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts to link your project

### Automatic Deployments

Once connected, Vercel will automatically deploy:
- Every push to `main` branch → Production deployment
- Every pull request → Preview deployment

## Setting Up Custom Domain (tsla.miami)

### Step 1: Add Domain in Vercel Dashboard

1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter `tsla.miami` and click **Add**
5. Vercel will show you the DNS records you need to configure

### Step 2: Configure DNS Records

You need to add DNS records at your domain registrar (where you purchased `tsla.miami`). Vercel will provide you with specific values, but typically you'll need:

**Option A: Apex Domain (tsla.miami)**
- **Type**: `A` record
- **Name**: `@` or `tsla.miami`
- **Value**: Vercel's IP address (provided in dashboard)
- **TTL**: 3600 (or default)

**Option B: CNAME Record (Recommended)**
- **Type**: `CNAME` record
- **Name**: `@` or `tsla.miami`
- **Value**: `cname.vercel-dns.com` (or the value provided by Vercel)
- **TTL**: 3600 (or default)

**Note**: Some registrars don't support CNAME on apex domains. If that's the case, use the A record option.

### Step 3: Verify Domain

1. After adding DNS records, wait a few minutes for DNS propagation
2. Go back to Vercel dashboard → **Settings** → **Domains**
3. Vercel will automatically verify the domain when DNS records are correct
4. You'll see a green checkmark when the domain is verified

### Step 4: SSL Certificate

Vercel automatically provisions SSL certificates for your domain via Let's Encrypt. This usually happens within a few minutes after domain verification.

### Step 5: Update Google Maps API Restrictions (If Applicable)

If you're using Google Maps API, update your API key restrictions to include:
- `https://tsla.miami`
- `https://www.tsla.miami` (if you add www subdomain)

### Troubleshooting

- **DNS not propagating**: Wait 24-48 hours for full DNS propagation
- **Domain not verifying**: Double-check DNS records match exactly what Vercel provided
- **SSL certificate issues**: Usually resolves automatically; contact Vercel support if it persists
- **Check DNS propagation**: Use tools like [whatsmydns.net](https://www.whatsmydns.net) to verify DNS records globally

## Project Structure

```
tsla-rent-miami/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── public/           # Static assets
├── package.json      # Dependencies
└── README.md         # This file
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel** - Hosting and deployment

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)


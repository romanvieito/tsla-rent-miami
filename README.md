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

Create a `.env.local` file with your Google Maps Places key so the pickup address autocomplete works:

```
GOOGLE_MAPS_API_KEY=YOUR_PLACES_KEY
```

The key only needs access to **Places API (Autocomplete + Details)** and should be restricted to your Vercel/localhost origins. When the key is missing or rate-limited the input still works, but the UI will show a subtle message and you can drop a manual pin on the map instead.

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


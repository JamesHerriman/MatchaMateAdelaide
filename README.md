# MatchaMate Adelaide

Your guide to Adelaide's best matcha cafes. Discover authentic matcha spots loved by locals across Adelaide CBD.

## Features

- Browse 7 carefully curated matcha cafes in Adelaide CBD
- Interactive map showing all cafe locations
- Rate cafes with 5-star rating system
- Leave comments and reviews for each cafe
- View average ratings and all reviews
- Beautiful matcha-themed design with green and pink color scheme
- Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Chakra UI
- **Maps**: Leaflet & React Leaflet
- **Icons**: React Icons
- **Storage**: LocalStorage for reviews

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd matchamate-adelaide
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
matchamate-adelaide/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── cafes/              # Cafes listing and detail pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── providers.tsx       # Chakra UI provider
│   ├── components/             # React components
│   │   ├── CafeMap.tsx         # Map component
│   │   ├── Navigation.tsx      # Navigation bar
│   │   ├── ReviewForm.tsx      # Review submission form
│   │   ├── ReviewList.tsx      # Reviews display
│   │   └── StarRating.tsx      # Star rating component
│   ├── data/
│   │   └── cafes.ts            # Cafe data with addresses
│   ├── theme/
│   │   └── theme.ts            # Chakra UI theme configuration
│   └── types/
│       └── reviews.ts          # TypeScript types
├── package.json
├── tsconfig.json
└── next.config.js
```

## Featured Cafes

1. **Luxxe** - 60 Waymouth St
2. **Munch Deli** - Shop 6/82 King William St
3. **Blended** - 95 Grenfell St
4. **Noru Cafe** - Unit 2, 61-63 Grote St
5. **Yuku Do** - 252 Hindley St
6. **Matsuri Japanese** - 167 Gouger St
7. **Please Say Please** - Shop 2 W, 50 Grenfell St

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project can be deployed to Vercel, Netlify, or any other platform that supports Next.js applications.

### Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

1. **Create a GitHub repository:**
   ```bash
   cd matchamate-adelaide
   git init
   git add .
   git commit -m "Initial commit: MatchaMate Adelaide"
   ```

2. **Push to GitHub:**
   - Create a new repository on [GitHub](https://github.com/new)
   - Follow the instructions to push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/matchamate-adelaide.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js settings
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy to Netlify

1. Push your code to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Custom Domain

After deployment, you can add a custom domain in your hosting platform's settings.

## License

MIT

## Acknowledgments

- Inspired by [MatchaMate Melbourne](https://matchamatee.vercel.app/)
- Cafe information sourced from various Adelaide business directories

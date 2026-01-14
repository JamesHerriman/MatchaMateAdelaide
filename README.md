# MatchaMate Adelaide

Your guide to Adelaide's best matcha cafés. Discover authentic matcha spots loved by locals across Adelaide CBD.

🌐 **Live Site**: [matcha-mate-adelaide.vercel.app](https://matcha-mate-adelaide.vercel.app)

## Features

- Browse 12 carefully curated matcha cafés in Adelaide CBD
- Interactive map showing all café locations with accurate coordinates
- Rate cafés with 5-star rating system
- Leave comments and reviews for each café
- View average ratings and all reviews (synced across all users)
- Cafés sorted by highest rating
- Beautiful matcha-themed design with green and pink color scheme
- Fully responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js 16 with TypeScript and App Router
- **UI Library**: Chakra UI
- **Maps**: Leaflet & React Leaflet
- **Icons**: React Icons
- **Database**: Supabase (PostgreSQL) for shared reviews and ratings
- **Deployment**: Vercel with automatic CD pipeline

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for database features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JamesHerriman/MatchaMateAdelaide.git
cd matchamate-adelaide
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
matchamate-adelaide/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── cafes/              # Cafés listing and detail pages
│   │   │   ├── [id]/           # Dynamic café detail pages
│   │   │   └── page.tsx        # Cafés listing page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── providers.tsx       # Chakra UI provider
│   ├── components/             # React components
│   │   ├── CafeMap.tsx         # Leaflet map component
│   │   ├── Navigation.tsx      # Navigation bar
│   │   ├── ReviewForm.tsx      # Review submission form
│   │   ├── ReviewList.tsx      # Reviews display
│   │   └── StarRating.tsx      # Star rating component
│   ├── data/
│   │   └── cafes.ts            # Café data with addresses & coordinates
│   ├── lib/
│   │   └── supabase.ts         # Supabase client configuration
│   ├── theme/
│   │   └── theme.ts            # Chakra UI theme (matcha green & pink)
│   └── types/
│       └── reviews.ts          # TypeScript types
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.local                  # Environment variables (not in git)
```

## Featured Cafés

1. **Luxxe Café** - 60 Waymouth St
2. **Munch Deli** - Shop 6/82 King William St
3. **Blended Café Adelaide** - 95 Grenfell St
4. **Noru Café** - Unit 2, 61-63 Grote St
5. **Yuku Do** - 252 Hindley St
6. **Matsuri Japanese** - Shop 33 Renaissance Arcade, 128/130 Rundle Mall
7. **Please Say Please** - Shop 2 W, 50 Grenfell St
8. **Deux Coffee Roasters** - 149 Flinders St
9. **Homeboy** - 266-269 North Terrace
10. **Cha-no-wa** - Shop G6, 33 King William St
11. **Bottega Bandito** - 25 James Pl
12. **Kafi:n** - 211 Rundle St

## Database Setup

The app uses Supabase for storing reviews and ratings. To set up:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a `reviews` table with the following schema:
```sql
create table reviews (
  id uuid default gen_random_uuid() primary key,
  cafe_id text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  author text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table reviews enable row level security;

-- Create policy to allow all operations (read, insert, update, delete)
create policy "Allow all operations on reviews"
  on reviews for all
  using (true)
  with check (true);
```

3. Add your Supabase URL and anon key to `.env.local`
4. Add the same environment variables to your Vercel project settings

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is deployed on Vercel with automatic deployments from the main branch.

**Repository**: [github.com/JamesHerriman/MatchaMateAdelaide](https://github.com/JamesHerriman/MatchaMateAdelaide)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JamesHerriman/MatchaMateAdelaide)

**Important**: Don't forget to add your Supabase environment variables in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

Contributions are welcome! If you know of a great matcha café in Adelaide that's missing, please open an issue or submit a pull request.

## License

MIT

## Acknowledgments

- Inspired by [MatchaMate Melbourne](https://matchamatee.vercel.app/)
- Café information sourced from Google Maps and local knowledge
- Built with ❤️ and 🍵 for the Adelaide matcha community

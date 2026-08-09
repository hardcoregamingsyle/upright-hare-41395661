# Technoblade Tribute

A tribute site for Technoblade (1999-2022) — the Blood God, Minecraft legend, and beloved content creator.

## Features

- 🐷 Memorial homepage with timeline
- 👑 Famous quotes database (SQLite + Prisma)
- 🎨 Dark theme with blood/crown color scheme
- 📱 Responsive design with Tailwind CSS
- ✅ Type-safe with TypeScript
- 🧪 Tested with Vitest

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite with Prisma ORM
- **Testing:** Vitest + Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Set up the database
npm run db:push
npm run db:seed

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed the database with quotes |

## Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding script
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   ├── QuoteCard.tsx  # Quote display component
│   │   └── Timeline.tsx   # Timeline component
│   └── __tests__/
│       └── page.test.tsx  # Component tests
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## Quotes

The site includes famous Technoblade quotes stored in the database. You can add more quotes using Prisma Studio:

```bash
npm run db:studio
```

## In Memory

This site is dedicated to the memory of Alexander (Technoblade), who passed away on June 30, 2022, after battling sarcoma. The Technoblade YouTube channel has raised over $2.3 million for sarcoma research.

**Technoblade never dies.** 🐷👑

## License

This project is a fan tribute and is not affiliated with Technoblade's estate.

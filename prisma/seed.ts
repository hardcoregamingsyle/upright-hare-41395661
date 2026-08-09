import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const QUOTES: Array<{ text: string; source?: string }> = [
  { text: 'Officer, I drop-kicked that child in self-defense.', source: 'Technoblade, SkyWars (2019)' },
  { text: "I'm not the sharpest tool in the shed, but I am the deadliest.", source: 'Technoblade, Stream (2021)' },
  { text: 'Let me tell you a story. The Potato War is a story I have been waiting to tell for a long time.', source: 'Potato War, Episode 1 (2018)' },
  { text: 'Rules are for the obedience of fools and the guidance of wise men.', source: 'SkyBlock potato run (2019)' },
  { text: "I didn't come here to make friends. I came to win.", source: 'Minecraft Monday (2019)' },
  { text: "The 4th place loser of MrBeast's $100,000 Minecraft contest.", source: 'Self-styled title (2020)' },
  { text: 'I control the potato economy. I AM the economy.', source: 'Potato War finale (2020)' },
  { text: 'Subscribe to Technoblade. That is a threat.', source: 'Video outro (2021)' },
  { text: 'Being the last one standing means you outlasted everyone in your way.', source: 'Minecraft Championship (2021)' },
  { text: "It's an honor to have you all here. It's been a wild ride.", source: 'Goodbye message (June 2022)' },
];

const MOMENTS: Array<{ title: string; year: string; body: string; kind: string; sort: number }> = [
  {
    title: 'The Blaze Begins',
    year: '2013',
    body: 'A 14-year-old starts recording Minecraft videos from his bedroom. His voice is already unmistakable — confident, chaotic, and absurdly funny.',
    kind: 'milestone',
    sort: 1,
  },
  {
    title: 'Bedwars Bloodbath',
    year: '2018',
    body: 'Technoblade becomes one of the most feared PvP players on the server. People stop asking if he will win and start asking how fast.',
    kind: 'milestone',
    sort: 2,
  },
  {
    title: 'The Potato War',
    year: '2018',
    body: 'Challenged for the #1 potato farmer spot in SkyBlock, Techno responds with a 12-episode saga of sabotage, diplomacy, and obsessive farming that broke the leaderboards.',
    kind: 'legend',
    sort: 3,
  },
  {
    title: 'Minecraft Monday Dominance',
    year: '2019',
    body: 'Winning week after week until the tournament organizers literally changed the rules to stop him. The blood god takes what is his.',
    kind: 'legend',
    sort: 4,
  },
  {
    title: 'Top 100 Most Influential',
    year: '2020',
    body: 'Forbes places him among the top 100 creators worldwide. The internet collectively nods — the potato farmer made it.',
    kind: 'milestone',
    sort: 5,
  },
  {
    title: 'The Announcement',
    year: '2021',
    body: 'With characteristic honesty, he tells millions of fans he has cancer, then adds: "If I die, the next video is going to be lit."',
    kind: 'milestone',
    sort: 6,
  },
  {
    title: 'The Final Message',
    year: 'June 2022',
    body: 'Technoblade passes away surrounded by family. A farewell video narrated by his father closes with the words that became a motto for a generation of players.',
    kind: 'farewell',
    sort: 7,
  },
];

async function main() {
  await prisma.guestbookEntry.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.memorialMoment.deleteMany();

  await prisma.quote.createMany({ data: QUOTES });
  await prisma.memorialMoment.createMany({ data: MOMENTS });

  console.log('Seeded:');
  console.log(`  ${QUOTES.length} quotes`);
  console.log(`  ${MOMENTS.length} memorial moments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

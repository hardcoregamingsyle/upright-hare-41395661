import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quotes = [
  {
    text: "Technoblade never dies.",
    source: "Technoblade",
  },
  {
    text: "I'm not going to die. I'm Technoblade.",
    source: "Technoblade",
  },
  {
    text: "The Blood God demands sacrifice.",
    source: "Technoblade",
  },
  {
    text: "Pigmen are the superior race.",
    source: "Technoblade",
  },
  {
    text: "I have cancer. And I'm going to beat it.",
    source: "so i have cancer",
  },
  {
    text: "Chat, we are so back.",
    source: "Technoblade",
  },
  {
    text: "The Wither skeleton is the most dangerous mob in the game.",
    source: "Technoblade",
  },
  {
    text: "I'm the best player in the world at Minecraft PvP.",
    source: "Technoblade",
  },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing quotes
  await prisma.quote.deleteMany({});

  // Insert quotes
  for (const quote of quotes) {
    await prisma.quote.create({
      data: quote,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

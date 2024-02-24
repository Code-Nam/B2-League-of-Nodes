import { PrismaClient } from "@prisma/client";

import championJSON from "../data/champions.json" assert { type: "json" };

const prisma = new PrismaClient();

const seedChampions = async (req, res) => {
  if (championJSON.length === 0) {
    return;
  }
  if ((await prisma.champion.count()) > 0) {
    return console.log("Champions already seeded");
  }
  
  for (const champion of championJSON) {
    await prisma.champion.create({
      data: {
        name: champion.name,
        type: champion.type,
      },
    });
  }
  console.log("Champions seeded");
};


seedChampions()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})


// scripts/seed.ts
import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const cities = ["Austin", "Dallas", "NYC", "SF"];

async function main() {
  for (let i = 0; i < 5000; i++) {
    await prisma.transaction.create({
      data: {
        user_id: `u_${faker.string.uuid()}`,
        city: faker.helpers.arrayElement(cities),
        merchant: faker.company.name(),
        amount: parseFloat(faker.commerce.price()),
        currency: "USD",
        category: faker.commerce.department(),
        timestamp: faker.date.between({ from: "2024-01-01", to: "2025-06-01" }),
      },
    });
  }
  console.log("Seeding complete.");
  await prisma.$disconnect();
}

// Count and print the number of transactions in the database
async function countTransactions() {
  const count = await prisma.transaction.count();
  console.log('Transaction count:', count);
  await prisma.$disconnect();
}

if (require.main === module) {
  main().then(countTransactions).catch((e) => console.error(e));
}

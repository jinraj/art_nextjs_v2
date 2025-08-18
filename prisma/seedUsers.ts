// prisma/seed.ts
import { mockUsers } from '@/app/data/seedMockData';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  // Convert hashed password to Base64
  return Buffer.from(hashed).toString('base64');
}

async function main() {
  // 1️⃣ Delete all existing users
  await prisma.user.deleteMany({});
  console.log('All users deleted.');

  for (const user of mockUsers) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
    console.log(`User ${user.name} created.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

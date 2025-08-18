// prisma/seed.ts
import { mockUsers } from '@/app/data/seedMockData';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  // Convert hashed password to Base64
  return Buffer.from(hashed).toString('base64');
}

export async function deleteAllUsers() {
  // 1️⃣ Delete all existing users
  await prisma.user.deleteMany({});
  console.log('All users deleted.');
}

export async function seedUsers() {
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

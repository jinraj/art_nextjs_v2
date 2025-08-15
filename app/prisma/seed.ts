import { PrismaClient } from '@prisma/client';
import artworks from '../app/constants/artworksData';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed script...');

  // Step 1: Delete all existing artworks
  try {
    console.log(`Deleting all the existing artworks...`);
    const deleteResult = await prisma.artWork.deleteMany({});
    console.log(`Deleted ${deleteResult.count} existing artworks.`);
  } catch (error) {
    console.error('Error deleting existing artworks:', error);
    // Depending on your requirements, you might want to throw the error
    // or continue if deletion failure is acceptable before insertion.
    // For a seed, usually, you want a clean slate, so an error here is critical.
    throw error;
  }

  // Step 2: Insert new artworks
  try {
    console.log(`Inserting ${artworks.length} artworks...`);
    await prisma.artWork.createMany({
      data: artworks,
    });
    console.log(`Inserted ${artworks.length} new artworks.`);
  } catch (error) {
    console.error('Error inserting new artworks:', error);
    throw error;
  }

  console.log('Seed script finished successfully.');
}

// To run the main function to insert artworks into the mongodb, 
// run the following command in your terminal - npx tsx prisma/seed.ts
main()
  .catch(e => {
    console.error('Error inserting artworks:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

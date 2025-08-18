import { PrismaClient } from '@prisma/client';
import { mockArtworks } from '../app/data/seedMockData';

const prisma = new PrismaClient();

export async function deleteAllArtworks() {
  console.log('Starting seed script...');

  // Step 1: Delete all existing artworks
  try {
    console.log(`Deleting all the existing artworks...`);
    const deleteResult = await prisma.artwork.deleteMany({});
    console.log(`Deleted ${deleteResult.count} existing artworks.`);
  } catch (error) {
    console.error('Error deleting existing artworks:', error);
    // Depending on your requirements, you might want to throw the error
    // or continue if deletion failure is acceptable before insertion.
    // For a seed, usually, you want a clean slate, so an error here is critical.
    throw error;
  }
}

export async function seedArtworks() {
  try {
    // Fetch eligible users (Artist or Admin)
    const eligibleUsers = await prisma.user.findMany({
      where: {
        role: { in: ['Artist', 'Admin'] },
      },
      select: { id: true },
    });

    if (eligibleUsers.length === 0) {
      console.warn("⚠️ No Artist or Admin users found. Cannot seed artworks.");
      return;
    }

    console.log(`Found ${eligibleUsers.length} eligible users.`);

    // Distribute artworks across users
    const artworksWithArtists = mockArtworks.map((artwork, index) => {
      const assignedUser = eligibleUsers[index % eligibleUsers.length]; // round-robin distribution
      return {
        ...artwork,
        artistId: assignedUser.id,
      };
    });

    // Insert into DB
    await prisma.artwork.createMany({
      data: artworksWithArtists,
    });

    console.log(
      `✅ Inserted ${artworksWithArtists.length} artworks, distributed among ${eligibleUsers.length} artists/admins.`
    );
  } catch (error) {
    console.error('❌ Error inserting new artworks:', error);
    throw error;
  }

  console.log('🎨 Artwork seed script finished successfully.');
}

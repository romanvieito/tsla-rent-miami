import { PrismaClient } from '@prisma/client';
import { cars } from '../lib/cars';

const prisma = new PrismaClient();

// Define the desired display order (lower sortOrder = appears first)
const carSortOrder: Record<string, number> = {
  'Model Y 2024': 1,    // Most affordable Model Y
  'Model 3 2025': 2,    // Popular sedan
  'Model Y 2025': 3,    // Popular SUV
  'Model Y 2026': 4,    // Newest Model Y
  'Model X 2025': 5,    // Luxury SUV
  'Cybertruck 2024': 6  // Premium truck
};

async function migrateCars() {
  console.log('Starting car migration...');

  try {
    for (const car of cars) {
      // Check if car already exists (by model and year to avoid duplicates)
      const existingCar = await prisma.car.findFirst({
        where: {
          model: car.model,
          year: car.year
        }
      });

      const sortOrder = carSortOrder[car.model] || 99; // Default to high number if not found

      if (!existingCar) {
        await prisma.car.create({
          data: {
            id: car.id, // Preserve original IDs for compatibility
            model: car.model,
            year: car.year,
            price: car.price,
            description: car.description,
            image: car.image,
            seats: car.seats,
            range: car.range,
            sortOrder,
            active: true
          }
        });
        console.log(`Created car: ${car.model} (${car.year}) - sortOrder: ${sortOrder}`);
      } else {
        // Update existing car with sortOrder if it doesn't have one
        if (existingCar.sortOrder === 0 || existingCar.sortOrder === null) {
          await prisma.car.update({
            where: { id: existingCar.id },
            data: { sortOrder }
          });
          console.log(`Updated car: ${car.model} (${car.year}) - set sortOrder: ${sortOrder}`);
        } else {
          console.log(`Car already exists: ${car.model} (${car.year}) - sortOrder: ${existingCar.sortOrder}`);
        }
      }
    }

    console.log('Car migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateCars().catch((e) => {
  console.error(e);
  process.exit(1);
});
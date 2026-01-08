import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/cars - Get all active cars
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' }
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}

// POST /api/cars - Create a new car (for CRM integration)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, year, price, description, image, seats, range, sortOrder } = body;

    // Validate required fields
    if (!model || !year || !price || !description || !image || !seats || !range) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const car = await prisma.car.create({
      data: {
        model,
        year: parseInt(year),
        price: parseInt(price),
        description,
        image,
        seats: parseInt(seats),
        range: parseInt(range),
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : 99, // Default to end if not specified
      }
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/cars/[id] - Get a specific car
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json(
      { error: 'Failed to fetch car' },
      { status: 500 }
    );
  }
}

// PUT /api/cars/[id] - Update a car (for CRM integration)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { model, year, price, description, image, seats, range, sortOrder, active } = body;

    const car = await prisma.car.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(model && { model }),
        ...(year !== undefined && { year: parseInt(year) }),
        ...(price !== undefined && { price: parseInt(price) }),
        ...(description && { description }),
        ...(image && { image }),
        ...(seats !== undefined && { seats: parseInt(seats) }),
        ...(range !== undefined && { range: parseInt(range) }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
        ...(active !== undefined && { active: Boolean(active) }),
      }
    });

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update car' },
      { status: 500 }
    );
  }
}

// DELETE /api/cars/[id] - Deactivate a car (soft delete for CRM integration)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Soft delete by setting active to false instead of actually deleting
    const car = await prisma.car.update({
      where: { id: parseInt(params.id) },
      data: { active: false }
    });

    return NextResponse.json({ success: true, car });
  } catch (error) {
    console.error('Error deactivating car:', error);
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to deactivate car' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  carModel?: string;
  carPricePerDay?: number;
  location?: string;
  address?: string;
  startDate?: string | null;
  endDate?: string | null;
  customCoordinates?: {
    lat: number;
    lng: number;
  } | null;
};

const NTFY_TOPIC = 'trent-miami';

const formatDate = (isoDate?: string | null) => {
  if (!isoDate) {
    return '--';
  }
  try {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
      return isoDate;
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoDate;
  }
};

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();
  const carModel = payload.carModel?.trim();

  if (!name || !email || !phone || !carModel) {
    return NextResponse.json(
      { error: 'Missing required booking details.' },
      { status: 400 }
    );
  }

  const lines = [
    'New Tesla booking request',
    '-----------------------------',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Vehicle: ${carModel}${payload.carPricePerDay ? ` ($${payload.carPricePerDay}/day)` : ''}`,
    `Pickup: ${formatDate(payload.startDate)}`,
    `Return: ${formatDate(payload.endDate)}`,
    `Location: ${payload.location ?? 'Not specified'}`,
    `Address: ${payload.address ?? 'Not specified'}`,
  ];

  if (payload.customCoordinates) {
    lines.push(
      `Pinned Coords: lat ${payload.customCoordinates.lat}, lng ${payload.customCoordinates.lng}`
    );
  }

  const message = lines.join('\n');

  const accessToken = process.env.NTFY_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('NTFY_ACCESS_TOKEN environment variable is not set');
    return NextResponse.json(
      { error: 'Notification service configuration error.' },
      { status: 500 }
    );
  }

  const ntfyUrl = `https://ntfy.sh/${NTFY_TOPIC}?auth=${encodeURIComponent(accessToken)}`;

  try {
    const response = await fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: message,
    });

    if (!response.ok) {
      console.error('ntfy.sh responded with an error status:', response.status);
      return NextResponse.json(
        { error: 'Failed to notify concierge.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ntfy.sh notification error:', error);
    return NextResponse.json(
      { error: 'Unexpected error contacting notification service.' },
      { status: 500 }
    );
  }
}



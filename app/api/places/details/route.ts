import { NextResponse } from 'next/server';

type DetailsBody = {
  placeId?: string;
};

type PlaceDetailsResponse = {
  status: string;
  result?: {
    formatted_address?: string;
    geometry?: {
      location?: {
        lat: number;
        lng: number;
      };
    };
  };
  error_message?: string;
};

const GOOGLE_DETAILS_ENDPOINT =
  'https://maps.googleapis.com/maps/api/place/details/json';

const DETAILS_FIELDS = 'formatted_address,geometry/location';

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing GOOGLE_MAPS_API_KEY environment variable.' },
      { status: 500 }
    );
  }

  let body: DetailsBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const placeId = body.placeId?.trim();
  if (!placeId) {
    return NextResponse.json({ error: 'placeId is required.' }, { status: 400 });
  }

  const params = new URLSearchParams({
    place_id: placeId,
    key: apiKey,
    fields: DETAILS_FIELDS,
  });

  try {
    const response = await fetch(`${GOOGLE_DETAILS_ENDPOINT}?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to contact Places Details API.' },
        { status: 502 }
      );
    }

    const data = (await response.json()) as PlaceDetailsResponse;

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: data.error_message ?? `Place details error: ${data.status}` },
        { status: 502 }
      );
    }

    const address = data.result?.formatted_address ?? '';
    const coordinates = data.result?.geometry?.location;

    if (!coordinates) {
      return NextResponse.json(
        { error: 'No coordinates returned for the requested place.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      address,
      coordinates,
    });
  } catch (error) {
    console.error('Place details proxy error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error while fetching place details.' },
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';

type AutocompleteBody = {
  query?: string;
};

type PlacesPrediction = {
  description: string;
  place_id: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
};

type PlacesAutocompleteResponse = {
  status: string;
  predictions: PlacesPrediction[];
  error_message?: string;
};

const GOOGLE_AUTOCOMPLETE_ENDPOINT =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json';

const DEFAULT_CENTER = '25.7617,-80.1918'; // Miami
const DEFAULT_RADIUS_METERS = '30000';

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing GOOGLE_MAPS_API_KEY environment variable.' },
      { status: 500 }
    );
  }

  let body: AutocompleteBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ predictions: [] }, { status: 200 });
  }

  const query = body.query?.trim();
  if (!query) {
    return NextResponse.json({ predictions: [] }, { status: 200 });
  }

  const params = new URLSearchParams({
    input: query,
    key: apiKey,
    location: DEFAULT_CENTER,
    radius: DEFAULT_RADIUS_METERS,
    components: 'country:us',
    types: 'geocode',
    strictbounds: 'true',
  });

  try {
    const response = await fetch(`${GOOGLE_AUTOCOMPLETE_ENDPOINT}?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to contact Places Autocomplete API.' },
        { status: 502 }
      );
    }

    const data = (await response.json()) as PlacesAutocompleteResponse;

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return NextResponse.json(
        {
          error: data.error_message ?? `Autocomplete error: ${data.status}`,
          predictions: [],
        },
        { status: 502 }
      );
    }

    const predictions = (data.predictions ?? []).map(prediction => ({
      description: prediction.description,
      placeId: prediction.place_id,
      primaryText: prediction.structured_formatting?.main_text ?? prediction.description,
      secondaryText: prediction.structured_formatting?.secondary_text ?? '',
    }));

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Autocomplete proxy error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error while fetching predictions.', predictions: [] },
      { status: 500 }
    );
  }
}


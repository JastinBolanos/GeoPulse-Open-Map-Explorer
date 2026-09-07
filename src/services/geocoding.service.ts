export interface GeocodingResult {
  lat: number;
  lng: number;
  displayName: string;
}

/**
 * Geocoding service utilizing OpenStreetMap Nominatim free API.
 * Does not require any commercial API key.
 */
export async function searchLocationByQuery(
  query: string,
  language: 'es' | 'en' = 'es'
): Promise<GeocodingResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    trimmed
  )}&limit=1`;

  const response = await fetch(endpoint, {
    headers: {
      'Accept-Language': `${language},en`,
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim request failed with status: ${response.status}`);
  }

  const results = await response.json();
  if (!Array.isArray(results) || results.length === 0) {
    return null;
  }

  const firstResult = results[0];
  return {
    lat: parseFloat(firstResult.lat),
    lng: parseFloat(firstResult.lon),
    displayName: firstResult.display_name,
  };
}

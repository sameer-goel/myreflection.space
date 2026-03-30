import { useEffect, useState } from 'react';

/**
 * Detects the user's country name via IP geolocation (no permission prompt).
 * Returns the country name string (e.g. "United States") or '' while loading / on error.
 */
export function useGeoCountry(): string {
  const [country, setCountry] = useState('');

  useEffect(() => {
    // ip-api.com free tier — no key required, returns JSON
    fetch('https://ip-api.com/json/?fields=country')
      .then(r => r.json())
      .then(data => {
        if (data?.country) setCountry(data.country);
      })
      .catch(() => {/* silently fail — user can type manually */});
  }, []);

  return country;
}

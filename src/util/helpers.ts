export async function requestGeolocation() {
  return new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

export function converHpaToMmhg(hpa: number) {
  const UNIT = 0.750063755419211;
  return Math.round(hpa * UNIT);
}

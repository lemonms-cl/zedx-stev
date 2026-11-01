const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export async function safeFetch<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // Fail fast after 4s

    const res = await fetch(`${SERVER_URL}${endpoint}`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    clearTimeout(timeout);

    if (!res.ok) return fallbackData;
    return await res.json();
  } catch {
    // Silently return fallback data if backend is unreachable or down
    return fallbackData;
  }
}
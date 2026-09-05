import type { ShowEvent } from "../models/event";

export async function fetchEventsFromServer(): Promise<ShowEvent[]> {
  const response = await fetch("http://localhost:8080/api/v1/events");

  if (!response.ok) {
    throw new Error(`Server Error: HTTP Code ${response.status}`);
  }

  return await response.json();
}
export async function purchaseTickets(eventId: string, quantity: number): Promise<void> {
  const response = await fetch("http://localhost:8080/api/v1/purchases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, quantity }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.error ?? `Server Error: HTTP Code ${response.status}`;
    throw new Error(message);
  }
}
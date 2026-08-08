export async function fetchEventsFromServer(): Promise<void> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=2");

  if (!response.ok) {
    throw new Error(`Server Error: HTTP Code ${response.status}`);
  }

  await response.json();
}
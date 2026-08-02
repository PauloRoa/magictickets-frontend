const appContainer = document.getElementById('app');

if (appContainer !== null) {
  const greeting: string = "Hello World from TypeScript and Vite!";
  appContainer.innerHTML = `<h1>${greeting}</h1>`;
  console.log("Environment initialized successfully.");
} else {
  console.error("Critical Error: container with ID 'app' was not found.");
}
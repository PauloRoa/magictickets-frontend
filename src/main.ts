import "./styles/global.css";
import { mockEvents } from "./models/event";
import { generateEventCardHtml } from "./components/EventCard";
import { fetchEventsFromServer } from "./services/eventService";

const appContainer = document.getElementById("app");
const formBackdrop = document.getElementById("purchase-form-backdrop");
const selectedEventName = document.getElementById("selected-event-name");

let selectedEventIndex: number | null = null;

if (appContainer !== null && formBackdrop !== null && selectedEventName !== null) {
  appContainer.addEventListener("click", (clickEvent: MouseEvent) => {
    const target = clickEvent.target as HTMLElement;
    const card = target.closest(".event-card") as HTMLElement | null;

    if (card === null) return;

    const index = Number(card.dataset.index);
    selectedEventIndex = index;
    const selectedEvent = mockEvents[index];

    selectedEventName.textContent = `Buying tickets for: ${selectedEvent.name}`;
    formBackdrop.hidden = false;
  });
}

if (formBackdrop !== null) {
  formBackdrop.addEventListener("click", (backdropClickEvent: MouseEvent) => {
    if (backdropClickEvent.target === formBackdrop) {
      formBackdrop.hidden = true;
    }
  });
}

const purchaseForm = document.getElementById("purchase-form") as HTMLFormElement | null;
const feedback = document.getElementById("purchase-feedback");

if (purchaseForm !== null && feedback !== null) {
  purchaseForm.addEventListener("submit", (submitEvent: Event) => {
    submitEvent.preventDefault();

    if (selectedEventIndex === null) return;

    const selectedEvent = mockEvents[selectedEventIndex];
    const quantityInput = document.getElementById("quantity-input") as HTMLInputElement;
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
      feedback.textContent = "Error: quantity must be a positive number.";
      return;
    }

    if (quantity > 5) {
      feedback.textContent = "Error: maximum 5 tickets per purchase.";
      return;
    }

    if (quantity > selectedEvent.stock) {
      feedback.textContent = `Error: only ${selectedEvent.stock} ticket(s) available.`;
      return;
    }

    feedback.textContent = `Success: ${quantity} ticket(s) reserved for ${selectedEvent.name}.`;
  });
}


async function loadEventsFromServer(): Promise<void> {
  if (appContainer === null) return;

  appContainer.innerHTML =
    "<p class=\"loading col-span-full py-12 text-center text-neutral-400\">Loading events from the server...</p>";

  try {
    await fetchEventsFromServer();

    const cardsHtml = mockEvents.map(generateEventCardHtml).join("");
    appContainer.innerHTML = cardsHtml;
  } catch (error) {
    console.error("Critical network failure:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    appContainer.innerHTML = `
      <div class="error-alert col-span-full flex flex-col gap-1 rounded-lg border border-red-600 bg-neutral-900 p-5 text-red-500">
        <p class="font-medium">Could not load events from the server.</p>
        <small class="text-red-400">${message}</small>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadEventsFromServer);
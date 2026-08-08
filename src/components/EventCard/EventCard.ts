import { type ShowEvent, isAvailable } from "../../models/event";
import { type IconNode, createElement, Calendar, Tag, Ticket } from "lucide";

function renderIcon(iconNode: IconNode, extraClass: string): string {
  const element = createElement(iconNode, { class: extraClass, width: "16", height: "16" });
  return element.outerHTML;
}

export function generateEventCardHtml(event: ShowEvent, index: number): string {
  const available = isAvailable(event);
  const availability = available ? "Available" : "Sold Out";

  return `
    <article class="event-card group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 transition-colors hover:border-amber-500" data-index="${index}">
      <img src="${event.imageUrl}" alt="${event.name}" class="h-40 w-full object-cover object-top" />
      <div class="flex flex-1 flex-col justify-between gap-4 p-5">
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold text-amber-500">${event.name}</h3>
          <p class="flex items-center gap-2 text-sm text-neutral-300">
            ${renderIcon(Calendar, "shrink-0 text-neutral-500")}
            <span>${event.date}</span>
          </p>
          <p class="flex items-center gap-2 text-sm text-neutral-300">
            ${renderIcon(Tag, "shrink-0 text-neutral-500")}
            <span>${event.category}</span>
          </p>
          <p class="text-sm text-neutral-400">Status: ${event.status}</p>
        </div>
        <p class="flex items-center gap-2 text-sm font-medium ${available ? "text-amber-500" : "text-neutral-500"}">
          ${renderIcon(Ticket, "shrink-0")}
          <span>${availability}</span>
        </p>
      </div>
    </article>
  `;
}
export enum ShowStatus {
  SCHEDULED = "SCHEDULED",
  LIVE = "LIVE",
  FINISHED = "FINISHED",
}

export enum ShowCategory {
  CINEMA = "CINEMA",
  MUSIC = "MUSIC",
  COMEDY = "COMEDY",
  THEATER = "THEATER",
  SPORTS = "SPORTS",
  FESTIVAL = "FESTIVAL",
  CONFERENCE = "CONFERENCE",
}

export interface ShowEvent {
  id: string;
  name: string;
  stock: number;
  date: string;
  status: ShowStatus;
  category: ShowCategory;
  imageUrl: string;
}

export function isAvailable(event: ShowEvent): boolean {
  return event.stock > 0;
}

export const mockEvents: ShowEvent[] = [
  {
    id: "mock-1",
    name: "Angine de Poitrine",
    stock: 120,
    date: "2026-09-12",
    status: ShowStatus.SCHEDULED,
    category: ShowCategory.MUSIC,
    imageUrl: "/events/angine-de-poitrine.jpg",
  },
  {
    id: "mock-2",
    name: "Jesucristo Súperestrella",
    stock: 0,
    date: "2026-07-05",
    status: ShowStatus.FINISHED,
    category: ShowCategory.THEATER,
    imageUrl: "/events/jesucristo-superestrella.jpg",
  },
  {
    id: "mock-3",
    name: "Amistoso PSG vs Real Madrid",
    stock: 200,
    date: "2026-10-18",
    status: ShowStatus.SCHEDULED,
    category: ShowCategory.SPORTS,
    imageUrl: "/events/psg-vs-real-madrid.jpg",
  },
  {
    id: "mock-4",
    name: "Santiago Smart City 2026",
    stock: 50,
    date: "2026-11-03",
    status: ShowStatus.SCHEDULED,
    category: ShowCategory.CONFERENCE,
    imageUrl: "/events/santiago-smart-city.jpg",
  },
  {
    id: "mock-5",
    name: "Kako a Medias",
    stock: 80,
    date: "2026-08-22",
    status: ShowStatus.LIVE,
    category: ShowCategory.COMEDY,
    imageUrl: "/events/kako-a-medias.jpg",
  },
  {
    id: "mock-6",
    name: "Candelabro",
    stock: 60,
    date: "2026-09-30",
    status: ShowStatus.SCHEDULED,
    category: ShowCategory.MUSIC,
    imageUrl: "/events/candelabro.jpg",
  },
  {
    id: "mock-7",
    name: "IPA Fest 2026",
    stock: 300,
    date: "2026-12-05",
    status: ShowStatus.SCHEDULED,
    category: ShowCategory.FESTIVAL,
    imageUrl: "/events/ipa-fest.jpg",
  },
];
export interface Car {
  id: number;
  model: string;
  year: number;
  price: number;
  description: string;
  image: string;
  seats: number;
  range: number; // in miles
}

export const cars: Car[] = [
  { id: 1, model: "Model 3 2025", year: 2025, price: 120, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 2, model: "Model Y 2026", year: 2026, price: 150, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 330 },
  { id: 3, model: "Model X 2025", year: 2025, price: 200, description: "6 seats", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 4, model: "Model Y 2025", year: 2025, price: 150, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
  { id: 5, model: "Cybertruck 2024", year: 2024, price: 200, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
];


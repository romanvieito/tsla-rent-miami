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
  { id: 1, model: "Model 3", year: 2025, price: 249, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 2, model: "Model Y", year: 2026, price: 179, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 330 },
  { id: 3, model: "Model X", year: 2025, price: 299, description: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 4, model: "Model Y", year: 2025, price: 199, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
  { id: 5, model: "Cybertruck", year: 2024, price: 199, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
];


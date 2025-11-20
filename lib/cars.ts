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
  { id: 2, model: "Model Y 2026", year: 2026, price: 150, description: "Midsize SUV for families, road trips and extra cargo space", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 327 },
  { id: 1, model: "Model 3 2025", year: 2025, price: 120, description: "Sports sedan for families, commuting and road trips", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 363 },
  { id: 3, model: "Model X 2025", year: 2025, price: 200, description: "Luxury SUV for comfort, storage and maximum tech", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 6, range: 329 },
  { id: 4, model: "Model Y 2025", year: 2025, price: 150, description: "Midsize SUV for families, road trips and extra cargo space", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 337 },
  { id: 5, model: "Cybertruck 2024", year: 2024, price: 200, description: "More utility than a truck with more performance than a sports car", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 320 },
];


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
  { id: 3, model: "Model X", year: 2025, price: 249, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 4, model: "Model Y", year: 2024, price: 179, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 330 },
  { id: 5, model: "Model S Plaid", year: 2024, price: 299, description: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 6, model: "Model 3 Performance", year: 2024, price: 199, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
  { id: 7, model: "Model X Plaid", year: 2024, price: 349, description: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 8, model: "Model Y Performance", year: 2024, price: 219, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 303 },
  { id: 9, model: "Model S", year: 2023, price: 179, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 10, model: "Model 3", year: 2023, price: 139, description: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 358 },
  { id: 11, model: "Model X", year: 2023, price: 229, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 12, model: "Model Y", year: 2023, price: 169, description: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 330 },
  { id: 13, model: "Model S Plaid", year: 2023, price: 279, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 14, model: "Model 3", year: 2024, price: 149, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 358 },
  { id: 15, model: "Model X", year: 2024, price: 249, description: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 16, model: "Model Y", year: 2024, price: 179, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 330 },
  { id: 17, model: "Model 3 Performance", year: 2023, price: 189, description: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
  { id: 18, model: "Model S", year: 2024, price: 199, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 19, model: "Model Y Performance", year: 2023, price: 209, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 303 },
  { id: 20, model: "Model X Plaid", year: 2023, price: 329, description: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 21, model: "Model 3", year: 2024, price: 149, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 358 },
  { id: 22, model: "Model S Plaid", year: 2024, price: 299, description: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 23, model: "Model Y", year: 2024, price: 179, description: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 330 },
  { id: 24, model: "Model X", year: 2024, price: 249, description: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 7, range: 348 },
  { id: 25, model: "Model 3 Performance", year: 2024, price: 199, description: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 315 },
  { id: 1, model: "Model S", year: 2024, price: 199, description: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 405 },
  { id: 2, model: "Model 3", year: 2024, price: 149, description: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop", seats: 5, range: 358 },
];


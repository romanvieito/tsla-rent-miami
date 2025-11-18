export interface Car {
  id: number;
  model: string;
  year: number;
  price: number;
  mileage: string;
  color: string;
  image: string;
}

export const cars: Car[] = [
  { id: 1, model: "Model S", year: 2024, price: 199, mileage: "5,000 mi", color: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 2, model: "Model 3", year: 2024, price: 149, mileage: "3,200 mi", color: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 3, model: "Model X", year: 2024, price: 249, mileage: "7,500 mi", color: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 4, model: "Model Y", year: 2024, price: 179, mileage: "4,100 mi", color: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 5, model: "Model S Plaid", year: 2024, price: 299, mileage: "2,800 mi", color: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 6, model: "Model 3 Performance", year: 2024, price: 199, mileage: "6,300 mi", color: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 7, model: "Model X Plaid", year: 2024, price: 349, mileage: "4,900 mi", color: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 8, model: "Model Y Performance", year: 2024, price: 219, mileage: "5,700 mi", color: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 9, model: "Model S", year: 2023, price: 179, mileage: "12,000 mi", color: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 10, model: "Model 3", year: 2023, price: 139, mileage: "15,500 mi", color: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 11, model: "Model X", year: 2023, price: 229, mileage: "18,200 mi", color: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 12, model: "Model Y", year: 2023, price: 169, mileage: "14,800 mi", color: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 13, model: "Model S Plaid", year: 2023, price: 279, mileage: "9,600 mi", color: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 14, model: "Model 3", year: 2024, price: 149, mileage: "8,400 mi", color: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 15, model: "Model X", year: 2024, price: 249, mileage: "6,700 mi", color: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 16, model: "Model Y", year: 2024, price: 179, mileage: "5,300 mi", color: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 17, model: "Model 3 Performance", year: 2023, price: 189, mileage: "16,900 mi", color: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 18, model: "Model S", year: 2024, price: 199, mileage: "4,200 mi", color: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 19, model: "Model Y Performance", year: 2023, price: 209, mileage: "13,100 mi", color: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 20, model: "Model X Plaid", year: 2023, price: 329, mileage: "11,400 mi", color: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 21, model: "Model 3", year: 2024, price: 149, mileage: "3,600 mi", color: "Pearl White", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 22, model: "Model S Plaid", year: 2024, price: 299, mileage: "1,900 mi", color: "Midnight Silver", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 23, model: "Model Y", year: 2024, price: 179, mileage: "6,800 mi", color: "Deep Blue", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 24, model: "Model X", year: 2024, price: 249, mileage: "5,500 mi", color: "Solid Black", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
  { id: 25, model: "Model 3 Performance", year: 2024, price: 199, mileage: "7,200 mi", color: "Red Multi-Coat", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop" },
];


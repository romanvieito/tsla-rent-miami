export interface Review {
  id: number;
  name: string;
  location: string;
  date: string; // ISO date string or formatted date
  rating: number; // 1-5 stars
  text: string;
  photo?: string; // optional customer photo/avatar
  carModel?: string; // optional car model rented
}

export const reviews: Review[] = [
  // Reviews will be added here
  // Example structure:
  // {
  //   id: 1,
  //   name: "John Smith",
  //   location: "Miami Beach",
  //   date: "2024-11-15",
  //   rating: 5,
  //   text: "Amazing experience! The Tesla was perfect for our weekend getaway. Full Self-Driving made the drive so relaxing.",
  //   photo: "https://example.com/photo.jpg",
  //   carModel: "Model Y 2025"
  // }
];

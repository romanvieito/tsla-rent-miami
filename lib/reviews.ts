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
  {
    id: 1,
    name: "Carsten",
    location: "Miami Beach",
    date: "2025-11-17",
    rating: 5,
    text: "Great car and great service. Absolutely loved the Full Self Driving Experience!",
    carModel: "Model 3 2025"
  },
  {
    id: 2,
    name: "Nayla",
    location: "Downtown Miami",
    date: "2025-11-17",
    rating: 5,
    text: "Excellent Host! I had a great experience renting from her. The car was super clean, reliable, and exactly as described. Communication was fast and friendly from the beginning to the end of the trip. She made the whole process easy and stress-free. I would definitely rent from her again and highly recommend her to anyone using Turo. Thank you for the amazing service!",
    carModel: "Model Y 2025"
  },
  {
    id: 3,
    name: "Elliott",
    location: "Brickell",
    date: "2025-11-16",
    rating: 5,
    text: "She was very accommodating and easy to work with! Made my trip easier from pick up to drop off! Would definitely use her cars again.",
    carModel: "Model X 2025"
  },
  {
    id: 4,
    name: "Heiko Kurt",
    location: "Miami Airport (MIA)",
    date: "2025-11-15",
    rating: 5,
    text: "Everything worked fluent and fine, the owner was always available and willing to support via chat and personally as soon as possible even at night time, always very kind communication. Experience with the car and FSD 13.2.9 was amazing (v14 already shipping soon), don't want to miss it ever again (but have to, since still not allowed in home country).",
    carModel: "Model 3 2025"
  },
  {
    id: 5,
    name: "Corey",
    location: "Miami Beach",
    date: "2025-11-15",
    rating: 5,
    text: "Car was amazing. Highly recommend. Used the FSD a ton. Thank you!",
    carModel: "Model Y 2025"
  },
  {
    id: 6,
    name: "Balázs",
    location: "Fort Lauderdale Airport (FLL)",
    date: "2025-11-14",
    rating: 5,
    text: "Everything was perfect. FSD was awesome.",
    carModel: "Model 3 2025"
  },
  {
    id: 7,
    name: "Marcelo",
    location: "Brickell",
    date: "2025-11-13",
    rating: 5,
    text: "Incredible host!",
    carModel: "Model Y 2025"
  },
  {
    id: 8,
    name: "Zain",
    location: "Downtown Miami",
    date: "2025-11-12",
    rating: 5,
    text: "Perfect. Great vehicle. Easy to drive. Love the self drive auto pilot feature!!",
    carModel: "Model 3 2025"
  },
  {
    id: 9,
    name: "Gabo",
    location: "Miami Beach",
    date: "2025-11-12",
    rating: 5,
    text: "I wish there was a 6 star for this",
    carModel: "Model X 2025"
  },
  {
    id: 10,
    name: "Camilo",
    location: "Brickell",
    date: "2025-11-12",
    rating: 5,
    text: "Thank you for the great service!",
    carModel: "Model Y 2025"
  },
  {
    id: 11,
    name: "Bernd",
    location: "Miami Airport (MIA)",
    date: "2025-11-11",
    rating: 5,
    text: "The best car experience ever. Both the host, the car (cbtrk) and the software (fsd) were exceptional to us",
    carModel: "Cybertruck 2024"
  },
  {
    id: 12,
    name: "Asha",
    location: "Downtown Miami",
    date: "2025-11-10",
    rating: 5,
    text: "everything was wonderful.. Pick up and drop off was easy .. The host was very professional.",
    carModel: "Model 3 2025"
  },
  {
    id: 13,
    name: "Aidan",
    location: "Miami Beach",
    date: "2025-11-10",
    rating: 5,
    text: "Beautiful ride!",
    carModel: "Model Y 2025"
  },
  {
    id: 14,
    name: "Kevin",
    location: "Brickell",
    date: "2025-11-10",
    rating: 5,
    text: "Excellent host!",
    carModel: "Model 3 2025"
  },
  {
    id: 15,
    name: "Duarte",
    location: "Fort Lauderdale Airport (FLL)",
    date: "2025-11-09",
    rating: 5,
    text: "So responsive, easy and great service! Highly recommend!",
    carModel: "Model Y 2025"
  },
  {
    id: 16,
    name: "Christopher",
    location: "Miami Beach",
    date: "2025-11-09",
    rating: 5,
    text: "I would only rent from these people in South Florida They give such good service. This is my third car from them now. Friendly and efficient, and always with the very latest software, which is why I rent this car.",
    carModel: "Model X 2025"
  },
  {
    id: 17,
    name: "Christopher",
    location: "Downtown Miami",
    date: "2025-11-05",
    rating: 5,
    text: "Absolutely fantastic and completely faultless great service",
    carModel: "Model 3 2025"
  },
  {
    id: 18,
    name: "CYRIL",
    location: "Brickell",
    date: "2025-11-05",
    rating: 5,
    text: "Fantastic host ! I recommend !",
    carModel: "Model Y 2025"
  },
  {
    id: 19,
    name: "Heidi",
    location: "Miami Airport (MIA)",
    date: "2025-11-04",
    rating: 5,
    text: "Absolutely fantastic, owner was so helpful as this was my first time driving a Tesla and I was definitely more than needy in requiring some support! She was lovely and responsive!",
    carModel: "Model 3 2025"
  },
  {
    id: 20,
    name: "Bradley",
    location: "Fort Lauderdale Airport (FLL)",
    date: "2025-11-01",
    rating: 4,
    text: "Car was great. Really good. Self driving is amazing. 🤩. Small issues were during pick up. A better description of location would have helped. After 12hr flight. 🥱 Statement upon renting that $25 parking fee not covered by the airport fee of $72 would be good. Cannot see where that was on the booking. But overall awesome.",
    carModel: "Model Y 2025"
  }
];

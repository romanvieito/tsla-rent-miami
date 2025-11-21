export interface Review {
  id: number;
  name: string;
  date: string; // ISO date string or formatted date
  rating: number; // 1-5 stars
  text: string;
  photo?: string; // optional customer photo/avatar
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Carsten",
    date: "2025-11-17",
    rating: 5,
    text: "Great car and great service. Absolutely loved the Full Self Driving Experience!"
  },
  {
    id: 2,
    name: "Nayla",
    date: "2025-11-17",
    rating: 5,
    text: "Excellent Host! I had a great experience renting from her. The car was super clean, reliable, and exactly as described. Communication was fast and friendly from the beginning to the end of the trip. She made the whole process easy and stress-free. I would definitely rent from her again and highly recommend her to anyone using Turo. Thank you for the amazing service!"
  },
  {
    id: 3,
    name: "Elliott",
    date: "2025-11-16",
    rating: 5,
    text: "She was very accommodating and easy to work with! Made my trip easier from pick up to drop off! Would definitely use her cars again."
  },
  {
    id: 4,
    name: "Heiko Kurt",
    date: "2025-11-15",
    rating: 5,
    text: "Everything worked fluent and fine, the owner was always available and willing to support via chat and personally as soon as possible even at night time, always very kind communication. Experience with the car and FSD 13.2.9 was amazing (v14 already shipping soon), don't want to miss it ever again (but have to, since still not allowed in home country)."
  },
  {
    id: 5,
    name: "Corey",
    date: "2025-11-15",
    rating: 5,
    text: "Car was amazing. Highly recommend. Used the FSD a ton. Thank you!"
  },
  {
    id: 6,
    name: "Balázs",
    date: "2025-11-14",
    rating: 5,
    text: "Everything was perfect. FSD was awesome."
  },
  {
    id: 7,
    name: "Marcelo",
    date: "2025-11-13",
    rating: 5,
    text: "Incredible host!"
  },
  {
    id: 8,
    name: "Zain",
    date: "2025-11-12",
    rating: 5,
    text: "Perfect. Great vehicle. Easy to drive. Love the self drive auto pilot feature!!"
  },
  {
    id: 9,
    name: "Gabo",
    date: "2025-11-12",
    rating: 5,
    text: "I wish there was a 6 star for this"
  },
  {
    id: 10,
    name: "Camilo",
    date: "2025-11-12",
    rating: 5,
    text: "Thank you for the great service!"
  },
  {
    id: 11,
    name: "Bernd",
    date: "2025-11-11",
    rating: 5,
    text: "The best car experience ever. Both the host, the car (cbtrk) and the software (fsd) were exceptional to us"
  },
  {
    id: 12,
    name: "Asha",
    date: "2025-11-10",
    rating: 5,
    text: "everything was wonderful.. Pick up and drop off was easy .. The host was very professional."
  },
  {
    id: 13,
    name: "Aidan",
    date: "2025-11-10",
    rating: 5,
    text: "Beautiful ride!"
  },
  {
    id: 14,
    name: "Kevin",
    date: "2025-11-10",
    rating: 5,
    text: "Excellent host!"
  },
  {
    id: 15,
    name: "Duarte",
    date: "2025-11-09",
    rating: 5,
    text: "So responsive, easy and great service! Highly recommend!"
  },
  {
    id: 16,
    name: "Christopher",
    date: "2025-11-09",
    rating: 5,
    text: "I would only rent from these people in South Florida They give such good service. This is my third car from them now. Friendly and efficient, and always with the very latest software, which is why I rent this car."
  },
  {
    id: 17,
    name: "Christopher",
    date: "2025-11-05",
    rating: 5,
    text: "Absolutely fantastic and completely faultless great service"
  },
  {
    id: 18,
    name: "CYRIL",
    date: "2025-11-05",
    rating: 5,
    text: "Fantastic host ! I recommend !"
  },
  {
    id: 19,
    name: "Heidi",
    date: "2025-11-04",
    rating: 5,
    text: "Absolutely fantastic, owner was so helpful as this was my first time driving a Tesla and I was definitely more than needy in requiring some support! She was lovely and responsive!"
  }
];

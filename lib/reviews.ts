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
  },
  {
    id: 20,
    name: "Antonio",
    date: "2025-11-01",
    rating: 5,
    text: "Yay is an incredible host, we such an amazing experience, everything when perfectly smooth. A dream come true! Thank you very much!"
  },
  {
    id: 21,
    name: "Beat",
    date: "2025-10-30",
    rating: 5,
    text: "Simple and friendly communication with the host. Clean and reliable car. Thank you, it was an amazing trip."
  },
  {
    id: 22,
    name: "Jose",
    date: "2025-10-29",
    rating: 5,
    text: "Amazing host. Smooth process renting vehicle. Will definitely use again."
  },
  {
    id: 23,
    name: "Pablo",
    date: "2025-10-29",
    rating: 5,
    text: "Great car, Great host!"
  },
  {
    id: 24,
    name: "Landon",
    date: "2025-10-26",
    rating: 5,
    text: "Great ride, easy pick up and drop off"
  },
  {
    id: 25,
    name: "Robert",
    date: "2025-10-26",
    rating: 5,
    text: "Host was very responsive and the car was very clean and ran great. Would highly recommended booking. Fun car!"
  },
  {
    id: 26,
    name: "Jamie",
    date: "2025-10-26",
    rating: 5,
    text: "Everything was wonderful, highly recommend. The Tesla took some getting used to (would recommend googling how to use it first if you haven't driven one before), but it was a true pleasure. Thank you! Highly recommend."
  },
  {
    id: 27,
    name: "Michael",
    date: "2025-10-25",
    rating: 5,
    text: "Excellent host and very accommodating. Great car and great experience!"
  },
  {
    id: 28,
    name: "Jesus",
    date: "2025-10-19",
    rating: 5,
    text: "Amazing host, hope to rent with her again next time I visit Miami, very much recommended!"
  },
  {
    id: 29,
    name: "Adonis",
    date: "2025-10-19",
    rating: 5,
    text: "A++"
  },
  {
    id: 30,
    name: "Diana",
    date: "2025-10-15",
    rating: 5,
    text: "We have a very nice experience renting the car and the host super kind and best service"
  },
  {
    id: 31,
    name: "Jose Daniel",
    date: "2025-10-14",
    rating: 5,
    text: "Excellent service."
  },
  {
    id: 32,
    name: "Davide",
    date: "2025-10-13",
    rating: 5,
    text: "All great!"
  },
  {
    id: 33,
    name: "Marianna",
    date: "2025-10-13",
    rating: 5,
    text: "Great car. Easy pick up and drop off. Host very responsive throughout the experience. Will rent again!"
  },
  {
    id: 34,
    name: "Daryl",
    date: "2025-10-13",
    rating: 5,
    text: "Everything was fantastic! Thank you!"
  }
];

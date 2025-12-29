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
    "id": 1,
    "name": "Andres Felipe",
    "date": "2025-12-27",
    "rating": 5,
    "text": "I rented a Tesla Model Y for a few days during my vacation in Miami, and the experience was outstanding from start to finish. The car was in perfect condition, and its advanced driving technology truly makes a difference — after this experience, Tesla is definitely my top choice.\n\nThe service was equally exceptional: the vehicle was delivered and picked up directly at my hotel, always on time and with great professionalism. Everything was seamless, smooth, and stress-free.\n\nA truly first-class experience. Highly recommended.",
    "photo": "/reviews/AndresFelipe2025-12-27.jpg"
  },
  {
    "id": 2,
    "name": "Raynald",
    "date": "2025-12-27",
    "rating": 5,
    "text": "Excellent communication, easy access, clean inside and out . Will rent again !",
    "photo": "/reviews/Raynald2025-12-27.jpg"
  },
  {
    "id": 8,
    "name": "Andrew",
    "date": "2025-12-23",
    "rating": 5,
    "text": "Excellent car and excellent host. Very responsive and I loved that the self driving Tesla was super clean and drove great.",
    "photo": "/reviews/Andrew2025-12-23.jpg"
  },
  {
    "id": 10,
    "name": "Arnoldas",
    "date": "2025-12-22",
    "rating": 5,
    "text": "amazing car and amazing host!\n\nTotally worth the cost!",
    "photo": "/reviews/Arnoldas2025-12-22.jpg"
  },
  {
    "id": 11,
    "name": "Jacob",
    "date": "2025-12-22",
    "rating": 5,
    "text": "Easy to work with and the car was in great condition.",
    "photo": "/reviews/Jacob2025-12-22.jpg"
  },
  {
    "id": 12,
    "name": "Paul",
    "date": "2025-12-22",
    "rating": 5,
    "text": "This is an awesome awesome host very accommodating very kind and has wonderful. Vehicles will definitely rent again.",
    "photo": "/reviews/Paul2025-12-22.jpg"
  },
  {
    "id": 14,
    "name": "Christian",
    "date": "2025-12-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christian2025-12-21.jpg"
  },
  {
    "id": 15,
    "name": "Nickolas",
    "date": "2025-12-21",
    "rating": 5,
    "text": "They were so amazing to work with! The car was spotless and they even delivered it to my hotel! Definitely recommend!!!!",
    "photo": "/reviews/Nickolas2025-12-21.jpg"
  },
  {
    "id": 16,
    "name": "Steven",
    "date": "2025-12-21",
    "rating": 5,
    "text": "She was an awesome host, very helpful and timely.",
    "photo": "/reviews/Steven2025-12-21.jpg"
  },
  {
    "id": 17,
    "name": "Lee",
    "date": "2025-12-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lee2025-12-20.jpg"
  },
  {
    "id": 18,
    "name": "Evgeny",
    "date": "2025-12-19",
    "rating": 5,
    "text": "Great rental experience. The car was very clean, the host was extremely polite and helpful, and the customer support was excellent. Highly recommend this service!",
    "photo": "/reviews/Evgeny2025-12-19.jpg"
  },
  {
    "id": 19,
    "name": "Vahé",
    "date": "2025-12-16",
    "rating": 5,
    "text": "Great car and service.",
    "photo": "/reviews/Vah2025-12-16.jpg"
  },
  {
    "id": 20,
    "name": "Christopher",
    "date": "2025-12-15",
    "rating": 5,
    "text": "The best place in America to rent a car hands down they go they go above and beyond to help you out nothing is too much trouble",
    "photo": "/reviews/Christopher2025-12-15.jpg"
  },
  {
    "id": 21,
    "name": "Maurice",
    "date": "2025-12-14",
    "rating": 5,
    "text": "You guys are the best in all of Miami",
    "photo": "/reviews/Maurice2025-12-14.jpg"
  },
  {
    "id": 22,
    "name": "John",
    "date": "2025-12-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/John2025-12-14.jpg"
  },
  {
    "id": 23,
    "name": "Jonathan",
    "date": "2025-12-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jonathan2025-12-13.jpg"
  },
  {
    "id": 24,
    "name": "Evgeniy",
    "date": "2025-12-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Evgeniy2025-12-13.jpg"
  },
  {
    "id": 25,
    "name": "Zachary",
    "date": "2025-12-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Zachary2025-12-13.jpg"
  },
  {
    "id": 26,
    "name": "Druskeily",
    "date": "2025-12-12",
    "rating": 5,
    "text": "Great car. Great host! She helped us a lot! Definitely will get a car with her again",
    "photo": "/reviews/Druskeily2025-12-12.jpg"
  },
  {
    "id": 27,
    "name": "Leonardo",
    "date": "2025-12-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Leonardo2025-12-12.jpg"
  },
  {
    "id": 28,
    "name": "Kevin",
    "date": "2025-12-11",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Kevin2025-12-11.jpg"
  },
  {
    "id": 29,
    "name": "Brian",
    "date": "2025-12-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Brian2025-12-10.jpg"
  },
  {
    "id": 30,
    "name": "Thomas",
    "date": "2025-12-09",
    "rating": 5,
    "text": "Service was amazing! Grate people 🙏🏻📈",
    "photo": "/reviews/Thomas2025-12-09.jpg"
  },
  {
    "id": 31,
    "name": "Juan",
    "date": "2025-12-08",
    "rating": 5,
    "text": "Fantastic. As usual",
    "photo": "/reviews/Juan2025-12-08.jpg"
  },
  {
    "id": 32,
    "name": "Leonel",
    "date": "2025-12-08",
    "rating": 5,
    "text": "Great car and host",
    "photo": "/reviews/Leonel2025-12-08.jpg"
  },
  {
    "id": 33,
    "name": "Baylee",
    "date": "2025-12-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Baylee2025-12-07.jpg"
  },
  {
    "id": 34,
    "name": "Piotr",
    "date": "2025-12-07",
    "rating": 5,
    "text": "Great",
    "photo": "/reviews/Piotr2025-12-07.jpg"
  },
  {
    "id": 35,
    "name": "Gregory",
    "date": "2025-12-07",
    "rating": 4,
    "text": "Great trip. the key did not work but the app worked. Owner did a good job communicating back.",
    "photo": "/reviews/Gregory2025-12-07.jpg"
  },
  {
    "id": 36,
    "name": "Arsenio",
    "date": "2025-12-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Arsenio2025-12-06.jpg"
  },
  {
    "id": 37,
    "name": "Daniel",
    "date": "2025-12-06",
    "rating": 5,
    "text": "Great car, great host",
    "photo": "/reviews/Daniel2025-12-06.jpg"
  },
  {
    "id": 38,
    "name": "Devy",
    "date": "2025-12-06",
    "rating": 5,
    "text": "La prise en main était simple, les aides de l’hôte parfait , le temps de réponse parfait , et le véhicule en parfait état . Je recommande à n’importe qui de prendre ce véhicule pour un trip en floride .\n\nLa prochaine fois que je reviens je reprends des véhicules avec eux c’est sur !!",
    "photo": "/reviews/Devy2025-12-06.jpg"
  },
  {
    "id": 39,
    "name": "Jacob",
    "date": "2025-12-05",
    "rating": 5,
    "text": "Quality, communication everything was perfect",
    "photo": "/reviews/Jacob2025-12-05.jpg"
  },
  {
    "id": 40,
    "name": "sachin",
    "date": "2025-12-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/sachin2025-12-04.jpg"
  },
  {
    "id": 41,
    "name": "Miguel",
    "date": "2025-12-03",
    "rating": 5,
    "text": "Always great service and clean vehicles",
    "photo": "/reviews/Miguel2025-12-03.jpg"
  },
  {
    "id": 42,
    "name": "Marc",
    "date": "2025-12-02",
    "rating": 5,
    "text": "Absolutely the best to work with. Highly recommend! Easy to work with, Yainery and her family have a great line up of cars, extremely responsive, and just overall excellent to work with. No brainer if you are looking for a Tesla to get around the area.",
    "photo": "/reviews/Marc2025-12-02.jpg"
  },
  {
    "id": 43,
    "name": "justin",
    "date": "2025-12-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/justin2025-12-02.jpg"
  },
  {
    "id": 44,
    "name": "Katelin",
    "date": "2025-12-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Katelin2025-12-01.jpg"
  },
  {
    "id": 45,
    "name": "FELIPE",
    "date": "2025-11-30",
    "rating": 5,
    "text": "Top!!! Great!!! Thank for all",
    "photo": "/reviews/FELIPE2025-11-30.jpg"
  },
  {
    "id": 46,
    "name": "Vincent",
    "date": "2025-11-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Vincent2025-11-30.jpg"
  },
  {
    "id": 47,
    "name": "Matthew",
    "date": "2025-11-30",
    "rating": 5,
    "text": "THANK YOU SO MUCH",
    "photo": "/reviews/Matthew2025-11-30.jpg"
  },
  {
    "id": 48,
    "name": "SHANETRIA",
    "date": "2025-11-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/SHANETRIA2025-11-30.jpg"
  },
  {
    "id": 49,
    "name": "Rachel",
    "date": "2025-11-29",
    "rating": 5,
    "text": "We rent from Yainery everytime we’re in Miami and it’s always perfect! Thank you so much!",
    "photo": "/reviews/Rachel2025-11-29.jpg"
  },
  {
    "id": 50,
    "name": "Benjamin",
    "date": "2025-11-29",
    "rating": 5,
    "text": "The Model Y was great. Such a wonderful car to drive dash and to let it drive you in insane Miami traffic. Super safe. The host is wonderful and super accommodating. Overall a great experience.",
    "photo": "/reviews/Benjamin2025-11-29.jpg"
  },
  {
    "id": 51,
    "name": "Ana",
    "date": "2025-11-29",
    "rating": 5,
    "text": "Great car. Love self driving",
    "photo": "/reviews/Ana2025-11-29.jpg"
  },
  {
    "id": 52,
    "name": "Javis",
    "date": "2025-11-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Javis2025-11-28.jpg"
  },
  {
    "id": 53,
    "name": "Patrick",
    "date": "2025-11-28",
    "rating": 4,
    "text": "Inside a car windshield is very dirty",
    "photo": "/reviews/Patrick2025-11-28.jpg"
  },
  {
    "id": 54,
    "name": "Jorge",
    "date": "2025-11-27",
    "rating": 5,
    "text": "Excelente servicio. Excelente carro.\nMuy atentos, siempre disponibles.\nRecomendado al 100%\nGracias !!",
    "photo": "/reviews/Jorge2025-11-27.jpg"
  },
  {
    "id": 55,
    "name": "Dingsheng",
    "date": "2025-11-27",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Dingsheng2025-11-27.jpg"
  },
  {
    "id": 56,
    "name": "Marcelo",
    "date": "2025-11-26",
    "rating": 5,
    "text": "Renting from Yainery was an outstanding experience from start to finish. The Tesla was in perfect condition, clean, smooth, fully charged, and a pleasure to drive. Everything worked flawlessly, and the car felt brand-new.\n\nCommunication with Yainery was exceptional. She was always friendly, fast to respond, and genuinely committed to making the trip as easy and comfortable as possible. Pickup and drop-off were seamless, and her flexibility made a big difference in my travel schedule.\n\nI highly recommend renting from her. Great host, great car, and an overall top-notch experience. I would definitely book with Yainery again!",
    "photo": "/reviews/Marcelo2025-11-26.jpg"
  },
  {
    "id": 57,
    "name": "Jimmie",
    "date": "2025-11-25",
    "rating": 5,
    "text": "Great car, great host",
    "photo": "/reviews/Jimmie2025-11-25.jpg"
  },
  {
    "id": 58,
    "name": "Jorge",
    "date": "2025-11-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jorge2025-11-25.jpg"
  },
  {
    "id": 59,
    "name": "Jonathan",
    "date": "2025-11-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jonathan2025-11-24.jpg"
  },
  {
    "id": 60,
    "name": "Zeandre",
    "date": "2025-11-24",
    "rating": 5,
    "text": "Amazing car. Amazing Host. Easy Pick up at your convenience.",
    "photo": "/reviews/Zeandre2025-11-24.jpg"
  },
  {
    "id": 61,
    "name": "Alejandro",
    "date": "2025-11-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alejandro2025-11-24.jpg"
  },
  {
    "id": 62,
    "name": "Andres",
    "date": "2025-11-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Andres2025-11-22.jpg"
  },
  {
    "id": 63,
    "name": "Lucia",
    "date": "2025-11-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lucia2025-11-22.jpg"
  },
  {
    "id": 64,
    "name": "Jeremiah",
    "date": "2025-11-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jeremiah2025-11-21.jpg"
  },
  {
    "id": 65,
    "name": "Marcelo",
    "date": "2025-11-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Marcelo2025-11-21.jpg"
  },
  {
    "id": 66,
    "name": "Rachelle",
    "date": "2025-11-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rachelle2025-11-20.jpg"
  },
  {
    "id": 67,
    "name": "Breno",
    "date": "2025-11-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Breno2025-11-19.jpg"
  },
  {
    "id": 68,
    "name": "joel",
    "date": "2025-11-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/joel2025-11-19.jpg"
  },
  {
    "id": 69,
    "name": "JUAN",
    "date": "2025-11-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/JUAN2025-11-18.jpg"
  },
  {
    "id": 70,
    "name": "Carsten",
    "date": "2025-11-17",
    "rating": 5,
    "text": "Great car and great service. Absolutely loved the Fuil Self Driving Experience!",
    "photo": "/reviews/Carsten2025-11-17.jpg"
  },
  {
    "id": 71,
    "name": "Nayla",
    "date": "2025-11-17",
    "rating": 5,
    "text": "Excellent Host!\n\nI had a great experience renting from her. The car was super clean, reliable, and exactly as described. Communication was fast and friendly from the beginning to the end of the trip. She made the whole process easy and stress-free. I would definitely rent from her again and highly recommend her to anyone using Turo. Thank you for the amazing service!",
    "photo": "/reviews/Nayla2025-11-17.jpg"
  },
  {
    "id": 72,
    "name": "Maurice",
    "date": "2025-11-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Maurice2025-11-16.jpg"
  },
  {
    "id": 73,
    "name": "Demarkis",
    "date": "2025-11-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Demarkis2025-11-16.jpg"
  },
  {
    "id": 74,
    "name": "Mario",
    "date": "2025-11-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Mario2025-11-16.jpg"
  },
  {
    "id": 75,
    "name": "Josh",
    "date": "2025-11-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Josh2025-11-16.jpg"
  },
  {
    "id": 76,
    "name": "Elliott",
    "date": "2025-11-16",
    "rating": 5,
    "text": "She was very accommodating and easy to work with! Made my trip easier from pick up to drop off! Would definitely use her cars again.",
    "photo": "/reviews/Elliott2025-11-16.jpg"
  },
  {
    "id": 77,
    "name": "Omar Razeq",
    "date": "2025-11-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/OmarRazeq2025-11-15.jpg"
  },
  {
    "id": 78,
    "name": "Heiko Kurt",
    "date": "2025-11-15",
    "rating": 5,
    "text": "Everything worked fluent and fine, the owner was always available and willing to support via chat and personally as soon as possible even at night time, always very kind communication. Experience with the car and FSD 13.2.9 was amazing (v14 already shipping soon), don't want to miss it ever again (but have to, since still not allowed in home country).",
    "photo": "/reviews/HeikoKurt2025-11-15.jpg"
  },
  {
    "id": 79,
    "name": "Corey",
    "date": "2025-11-15",
    "rating": 5,
    "text": "Car was amazing. Highly recommend. Used the FSD a ton. Thank you!",
    "photo": "/reviews/Corey2025-11-15.jpg"
  },
  {
    "id": 80,
    "name": "Balázs",
    "date": "2025-11-14",
    "rating": 5,
    "text": "Everything was perfect. FSD was awesome.",
    "photo": "/reviews/Balzs2025-11-14.jpg"
  },
  {
    "id": 81,
    "name": "Marcelo",
    "date": "2025-11-13",
    "rating": 5,
    "text": "Incredible host!",
    "photo": "/reviews/Marcelo2025-11-13.jpg"
  },
  {
    "id": 82,
    "name": "Gianni",
    "date": "2025-11-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Gianni2025-11-13.jpg"
  },
  {
    "id": 83,
    "name": "Christopher",
    "date": "2025-11-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christopher2025-11-13.jpg"
  },
  {
    "id": 84,
    "name": "Zain",
    "date": "2025-11-12",
    "rating": 5,
    "text": "Perfect. Great vehicle. Easy to drive. Love the self drive auto pilot feature!!",
    "photo": "/reviews/Zain2025-11-12.jpg"
  },
  {
    "id": 85,
    "name": "Sakshi",
    "date": "2025-11-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Sakshi2025-11-12.jpg"
  },
  {
    "id": 86,
    "name": "Gabo",
    "date": "2025-11-12",
    "rating": 5,
    "text": "I wish there was a 6 star for this",
    "photo": "/reviews/Gabo2025-11-12.jpg"
  },
  {
    "id": 87,
    "name": "Camilo",
    "date": "2025-11-12",
    "rating": 5,
    "text": "Thank you for the great service!",
    "photo": "/reviews/Camilo2025-11-12.jpg"
  },
  {
    "id": 88,
    "name": "Bernd",
    "date": "2025-11-11",
    "rating": 5,
    "text": "The best car experience ever. Both the host, the car (cbtrk) and the software (fsd) were exceptional to us",
    "photo": "/reviews/Bernd2025-11-11.jpg"
  },
  {
    "id": 89,
    "name": "Asha",
    "date": "2025-11-10",
    "rating": 5,
    "text": "everything was wonderful.. Pick up and drop off was easy .. The host was very professional.",
    "photo": "/reviews/Asha2025-11-10.jpg"
  },
  {
    "id": 90,
    "name": "Aidan",
    "date": "2025-11-10",
    "rating": 5,
    "text": "Beautiful ride!",
    "photo": "/reviews/Aidan2025-11-10.jpg"
  },
  {
    "id": 91,
    "name": "Kevin",
    "date": "2025-11-10",
    "rating": 5,
    "text": "Excellent host!",
    "photo": "/reviews/Kevin2025-11-10.jpg"
  },
  {
    "id": 92,
    "name": "Duarte",
    "date": "2025-11-09",
    "rating": 5,
    "text": "So responsive, easy and great service! Highly recommend!",
    "photo": "/reviews/Duarte2025-11-09.jpg"
  },
  {
    "id": 93,
    "name": "Jalen",
    "date": "2025-11-09",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jalen2025-11-09.jpg"
  },
  {
    "id": 94,
    "name": "Christopher",
    "date": "2025-11-09",
    "rating": 5,
    "text": "I would only rent from these people in South Florida They give such good service. This is my third car from them now. Friendly and efficient, and always with the very latest software, which is why I rent this car.",
    "photo": "/reviews/Christopher2025-11-09.jpg"
  },
  {
    "id": 95,
    "name": "Zahkir",
    "date": "2025-11-09",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Zahkir2025-11-09.jpg"
  },
  {
    "id": 96,
    "name": "Noah",
    "date": "2025-11-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Noah2025-11-08.jpg"
  },
  {
    "id": 97,
    "name": "Saul",
    "date": "2025-11-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Saul2025-11-06.jpg"
  },
  {
    "id": 98,
    "name": "Christopher",
    "date": "2025-11-05",
    "rating": 5,
    "text": "Absolutely fantastic and completely faultless great service",
    "photo": "/reviews/Christopher2025-11-05.jpg"
  },
  {
    "id": 99,
    "name": "Michael",
    "date": "2025-11-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Michael2025-11-05.jpg"
  },
  {
    "id": 100,
    "name": "CYRIL",
    "date": "2025-11-05",
    "rating": 5,
    "text": "Fantastic host ! I recommend !",
    "photo": "/reviews/CYRIL2025-11-05.jpg"
  },
  {
    "id": 101,
    "name": "Heidi",
    "date": "2025-11-04",
    "rating": 5,
    "text": "Absolutely fantastic, owner was so helpful as this was my first time driving a Tesla and I was definitely more than needy in requiring some support! She was lovely and responsive!",
    "photo": "/reviews/Heidi2025-11-04.jpg"
  },
  {
    "id": 102,
    "name": "Brian",
    "date": "2025-11-03",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Brian2025-11-03.jpg"
  },
  {
    "id": 103,
    "name": "Franco",
    "date": "2025-11-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Franco2025-11-02.jpg"
  },
  {
    "id": 104,
    "name": "Roxanne",
    "date": "2025-11-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Roxanne2025-11-02.jpg"
  },
  {
    "id": 105,
    "name": "Bradley",
    "date": "2025-11-01",
    "rating": 4,
    "text": "Car was great. Really good. Self driving is amazing. 🤩. Small issues were during pick up. A better description of location would have helped. After 12hr flight. 🥱 Statement upon renting that $25 parking fee not covered by the airport fee of $72 would be good. Cannot see where that was on the booking. But overall awesome.",
    "photo": "/reviews/Bradley2025-11-01.jpg"
  },
  {
    "id": 106,
    "name": "Antonio",
    "date": "2025-11-01",
    "rating": 5,
    "text": "Yay is an incredible host, we such an amazing experience, everything when perfectly smooth. A dream come true! Thank you very much!",
    "photo": "/reviews/Antonio2025-11-01.jpg"
  },
  {
    "id": 107,
    "name": "Alex",
    "date": "2025-10-31",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alex2025-10-31.jpg"
  },
  {
    "id": 108,
    "name": "Beat",
    "date": "2025-10-30",
    "rating": 5,
    "text": "Simple and friendly communication with the host. Clean and reliable car. Thank you, it was an amazing trip.",
    "photo": "/reviews/Beat2025-10-30.jpg"
  },
  {
    "id": 109,
    "name": "La’Toya",
    "date": "2025-10-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/LaToya2025-10-30.jpg"
  },
  {
    "id": 110,
    "name": "Jose",
    "date": "2025-10-29",
    "rating": 5,
    "text": "Amazing host. Smooth process renting vehicle. Will definitely use again.",
    "photo": "/reviews/Jose2025-10-29.jpg"
  },
  {
    "id": 111,
    "name": "Pablo",
    "date": "2025-10-29",
    "rating": 5,
    "text": "Great car, Great host!",
    "photo": "/reviews/Pablo2025-10-29.jpg"
  },
  {
    "id": 112,
    "name": "Alex",
    "date": "2025-10-27",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alex2025-10-27.jpg"
  },
  {
    "id": 113,
    "name": "Landon",
    "date": "2025-10-26",
    "rating": 5,
    "text": "Great ride, easy pick up and drop off",
    "photo": "/reviews/Landon2025-10-26.jpg"
  },
  {
    "id": 114,
    "name": "Robert",
    "date": "2025-10-26",
    "rating": 5,
    "text": "Host was very responsive and the car was very clean and ran great. Would highly recommended booking. Fun car!",
    "photo": "/reviews/Robert2025-10-26.jpg"
  },
  {
    "id": 115,
    "name": "Jamie",
    "date": "2025-10-26",
    "rating": 5,
    "text": "Everything was wonderful, highly recommend. The Tesla took some getting used to (would recommend googling how to use it first if you haven’t driven one before), but it was a true pleasure. Thank you! Highly recommend.",
    "photo": "/reviews/Jamie2025-10-26.jpg"
  },
  {
    "id": 116,
    "name": "Andrea",
    "date": "2025-10-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Andrea2025-10-26.jpg"
  },
  {
    "id": 117,
    "name": "Kailan",
    "date": "2025-10-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Kailan2025-10-26.jpg"
  },
  {
    "id": 118,
    "name": "William",
    "date": "2025-10-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/William2025-10-26.jpg"
  },
  {
    "id": 119,
    "name": "Michael",
    "date": "2025-10-25",
    "rating": 5,
    "text": "Excellent host and very accommodating. Great car and great experience!",
    "photo": "/reviews/Michael2025-10-25.jpg"
  },
  {
    "id": 120,
    "name": "Silemy",
    "date": "2025-10-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Silemy2025-10-24.jpg"
  },
  {
    "id": 121,
    "name": "ANTOINE",
    "date": "2025-10-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/ANTOINE2025-10-24.jpg"
  },
  {
    "id": 122,
    "name": "Dustin",
    "date": "2025-10-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Dustin2025-10-22.jpg"
  },
  {
    "id": 123,
    "name": "Jonvonie",
    "date": "2025-10-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jonvonie2025-10-20.jpg"
  },
  {
    "id": 124,
    "name": "Moises",
    "date": "2025-10-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Moises2025-10-20.jpg"
  },
  {
    "id": 125,
    "name": "Jesus",
    "date": "2025-10-19",
    "rating": 5,
    "text": "Amazing host, hope to rent with her again next time I visit Miami, very much recommended!",
    "photo": "/reviews/Jesus2025-10-19.jpg"
  },
  {
    "id": 126,
    "name": "Adonis",
    "date": "2025-10-19",
    "rating": 5,
    "text": "A++",
    "photo": "/reviews/Adonis2025-10-19.jpg"
  },
  {
    "id": 127,
    "name": "Roxanne",
    "date": "2025-10-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Roxanne2025-10-18.jpg"
  },
  {
    "id": 128,
    "name": "Rudi",
    "date": "2025-10-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rudi2025-10-17.jpg"
  },
  {
    "id": 129,
    "name": "Diana",
    "date": "2025-10-15",
    "rating": 5,
    "text": "We have a very nice experience renting the car and the host super kind and best service",
    "photo": "/reviews/Diana2025-10-15.jpg"
  },
  {
    "id": 130,
    "name": "Jose Daniel",
    "date": "2025-10-14",
    "rating": 5,
    "text": "Excellent service.",
    "photo": "/reviews/JoseDaniel2025-10-14.jpg"
  },
  {
    "id": 131,
    "name": "Krystal",
    "date": "2025-10-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Krystal2025-10-14.jpg"
  },
  {
    "id": 132,
    "name": "Teja",
    "date": "2025-10-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Teja2025-10-14.jpg"
  },
  {
    "id": 133,
    "name": "Marcel",
    "date": "2025-10-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Marcel2025-10-14.jpg"
  },
  {
    "id": 134,
    "name": "Davide",
    "date": "2025-10-13",
    "rating": 5,
    "text": "All great!",
    "photo": "/reviews/Davide2025-10-13.jpg"
  },
  {
    "id": 135,
    "name": "Thalia",
    "date": "2025-10-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Thalia2025-10-13.jpg"
  },
  {
    "id": 136,
    "name": "Taehyun",
    "date": "2025-10-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Taehyun2025-10-13.jpg"
  },
  {
    "id": 137,
    "name": "Marianna",
    "date": "2025-10-13",
    "rating": 5,
    "text": "Great car. Easy pick up and drop off. Host very responsive throughout the experience. Will rent again!",
    "photo": "/reviews/Marianna2025-10-13.jpg"
  },
  {
    "id": 138,
    "name": "Daryl",
    "date": "2025-10-13",
    "rating": 5,
    "text": "Everything was fantastic! Thank you!",
    "photo": "/reviews/Daryl2025-10-13.jpg"
  },
  {
    "id": 139,
    "name": "Turo",
    "date": "2025-10-13",
    "rating": 5,
    "text": "The host cancelled this trip last minute. This message was automatically posted by Turo.",
    "photo": "/reviews/Turo2025-10-13.jpg"
  },
  {
    "id": 140,
    "name": "Allison",
    "date": "2025-10-12",
    "rating": 5,
    "text": "Everything was great!",
    "photo": "/reviews/Allison2025-10-12.jpg"
  },
  {
    "id": 141,
    "name": "Andrew",
    "date": "2025-10-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Andrew2025-10-12.jpg"
  },
  {
    "id": 142,
    "name": "Matthew",
    "date": "2025-10-12",
    "rating": 5,
    "text": "Great. Everything was perfect and would definitely recommend and use host again.",
    "photo": "/reviews/Matthew2025-10-12.jpg"
  },
  {
    "id": 143,
    "name": "Muhammad",
    "date": "2025-10-12",
    "rating": 5,
    "text": "Seamless rental! Yainery’s spotless 2025 Tesla Model 3 ran flawlessly. Easy pickup/drop-off and lightning-fast responses—even at midnight—made the trip stress-free. Can’t wait to rent again in Miami. 5 stars!",
    "photo": "/reviews/Muhammad2025-10-12.jpg"
  },
  {
    "id": 144,
    "name": "David",
    "date": "2025-10-11",
    "rating": 5,
    "text": "",
    "photo": "/reviews/David2025-10-11.jpg"
  },
  {
    "id": 145,
    "name": "david",
    "date": "2025-10-11",
    "rating": 5,
    "text": "Great host ! Everthing perfect !!!",
    "photo": "/reviews/david2025-10-11.jpg"
  },
  {
    "id": 146,
    "name": "joseph",
    "date": "2025-10-11",
    "rating": 5,
    "text": "",
    "photo": "/reviews/joseph2025-10-11.jpg"
  },
  {
    "id": 147,
    "name": "Cierra",
    "date": "2025-10-10",
    "rating": 5,
    "text": "Yainery was an exceptional host! It was my first Turo and Tesla experience and she was extremely responsive and promptly. The car is immaculate and I will certainly rent from her again. Thank you!",
    "photo": "/reviews/Cierra2025-10-10.jpg"
  },
  {
    "id": 148,
    "name": "Fausto",
    "date": "2025-10-10",
    "rating": 5,
    "text": "A wonderful experience, the hosts were super friendly, always available to answer any questions or messages.",
    "photo": "/reviews/Fausto2025-10-10.jpg"
  },
  {
    "id": 149,
    "name": "Juan Pablo",
    "date": "2025-10-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/JuanPablo2025-10-08.jpg"
  },
  {
    "id": 150,
    "name": "Chloe",
    "date": "2025-10-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Chloe2025-10-07.jpg"
  },
  {
    "id": 151,
    "name": "Ivan",
    "date": "2025-10-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Ivan2025-10-07.jpg"
  },
  {
    "id": 152,
    "name": "Tkerria",
    "date": "2025-10-07",
    "rating": 5,
    "text": "Everything Was Amazing",
    "photo": "/reviews/Tkerria2025-10-07.jpg"
  },
  {
    "id": 153,
    "name": "Jennifer",
    "date": "2025-10-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jennifer2025-10-07.jpg"
  },
  {
    "id": 154,
    "name": "E",
    "date": "2025-10-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/E2025-10-07.jpg"
  },
  {
    "id": 155,
    "name": "Jessica",
    "date": "2025-10-07",
    "rating": 5,
    "text": "Very great host. Car was clean and well kept. Didn’t have any problems. Host was very responsive when I asked questions. Thank you!",
    "photo": "/reviews/Jessica2025-10-07.jpg"
  },
  {
    "id": 156,
    "name": "Justin",
    "date": "2025-10-06",
    "rating": 5,
    "text": "The car was clean, easy to find and unlock remotely, overall an enjoyable experience and perfect choice for the weekend.\nThanks again!",
    "photo": "/reviews/Justin2025-10-06.jpg"
  },
  {
    "id": 157,
    "name": "Katarina",
    "date": "2025-10-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Katarina2025-10-06.jpg"
  },
  {
    "id": 158,
    "name": "Josh",
    "date": "2025-10-06",
    "rating": 5,
    "text": "Great car! Wonderful host",
    "photo": "/reviews/Josh2025-10-06.jpg"
  },
  {
    "id": 159,
    "name": "John",
    "date": "2025-10-06",
    "rating": 5,
    "text": "The car was great and all instructions were thorough, if in Miami again, we will be renting from you again!!",
    "photo": "/reviews/John2025-10-06.jpg"
  },
  {
    "id": 160,
    "name": "vegard",
    "date": "2025-10-05",
    "rating": 5,
    "text": "Host and car has been amazing! Always a pleasure renting",
    "photo": "/reviews/vegard2025-10-05.jpg"
  },
  {
    "id": 161,
    "name": "Christopher",
    "date": "2025-10-05",
    "rating": 5,
    "text": "The car was in amazing condition. It drove great. Very clean inside and out. Yainery was very friendly and accommodating. Our entire rental experience was nothing short of perfect. Thank you!! 🙏😊",
    "photo": "/reviews/Christopher2025-10-05.jpg"
  },
  {
    "id": 162,
    "name": "Nikki",
    "date": "2025-10-04",
    "rating": 5,
    "text": "Excellent vehicle! Spectacular host. Smooth and flawless experience. Wonderful trip. Definitely recommend and will rent from them again! ⭐️",
    "photo": "/reviews/Nikki2025-10-04.jpg"
  },
  {
    "id": 163,
    "name": "Minhthu",
    "date": "2025-10-03",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Minhthu2025-10-03.jpg"
  },
  {
    "id": 164,
    "name": "Breno",
    "date": "2025-10-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Breno2025-10-02.jpg"
  },
  {
    "id": 165,
    "name": "Hugo",
    "date": "2025-10-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Hugo2025-10-02.jpg"
  },
  {
    "id": 166,
    "name": "Sandro",
    "date": "2025-10-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Sandro2025-10-01.jpg"
  },
  {
    "id": 167,
    "name": "Ivan",
    "date": "2025-10-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Ivan2025-10-01.jpg"
  },
  {
    "id": 168,
    "name": "Leo",
    "date": "2025-10-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Leo2025-10-01.jpg"
  },
  {
    "id": 169,
    "name": "Alexander",
    "date": "2025-10-01",
    "rating": 5,
    "text": "Fantastic from start to finish! Super high quality and great service!",
    "photo": "/reviews/Alexander2025-10-01.jpg"
  },
  {
    "id": 170,
    "name": "Miguel",
    "date": "2025-10-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Miguel2025-10-01.jpg"
  },
  {
    "id": 171,
    "name": "Javis",
    "date": "2025-10-01",
    "rating": 5,
    "text": "She is the absolute best! Made everything a breeze communicating with her is super easy and her cars are always clean! She is such a wonderful host",
    "photo": "/reviews/Javis2025-10-01.jpg"
  },
  {
    "id": 172,
    "name": "Adrian",
    "date": "2025-09-30",
    "rating": 5,
    "text": "Perfect host, definitivamente vuelvo a rentar con ella, muy atenta y amable",
    "photo": "/reviews/Adrian2025-09-30.jpg"
  },
  {
    "id": 173,
    "name": "Christina",
    "date": "2025-09-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christina2025-09-30.jpg"
  },
  {
    "id": 174,
    "name": "Omotolani",
    "date": "2025-09-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Omotolani2025-09-30.jpg"
  },
  {
    "id": 175,
    "name": "Clayton",
    "date": "2025-09-30",
    "rating": 3,
    "text": "It would’ve been nice to have been made aware of the 25$ parking fee once you pick up the car",
    "photo": "/reviews/Clayton2025-09-30.jpg"
  },
  {
    "id": 176,
    "name": "Giovanni",
    "date": "2025-09-30",
    "rating": 5,
    "text": "The best on the best",
    "photo": "/reviews/Giovanni2025-09-30.jpg"
  },
  {
    "id": 177,
    "name": "Antonio",
    "date": "2025-09-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Antonio2025-09-30.jpg"
  },
  {
    "id": 178,
    "name": "Carlos",
    "date": "2025-09-29",
    "rating": 5,
    "text": "Nice and tidy car",
    "photo": "/reviews/Carlos2025-09-29.jpg"
  },
  {
    "id": 179,
    "name": "Carlos",
    "date": "2025-09-29",
    "rating": 5,
    "text": "Really nice host really attentive 🙏🏻",
    "photo": "/reviews/Carlos2025-09-29.jpg"
  },
  {
    "id": 180,
    "name": "Roxanne",
    "date": "2025-09-28",
    "rating": 5,
    "text": "Great host and wonderful car!",
    "photo": "/reviews/Roxanne2025-09-28.jpg"
  },
  {
    "id": 181,
    "name": "Frederick",
    "date": "2025-09-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Frederick2025-09-28.jpg"
  },
  {
    "id": 182,
    "name": "Yery",
    "date": "2025-09-28",
    "rating": 5,
    "text": "Auto Exelente !!!!\nLa dueña muy servicial, lo recomiendo 100%",
    "photo": "/reviews/Yery2025-09-28.jpg"
  },
  {
    "id": 183,
    "name": "Thomas",
    "date": "2025-09-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Thomas2025-09-28.jpg"
  },
  {
    "id": 184,
    "name": "Christian",
    "date": "2025-09-28",
    "rating": 5,
    "text": "Loved the car, zero problems",
    "photo": "/reviews/Christian2025-09-28.jpg"
  },
  {
    "id": 185,
    "name": "Tommy",
    "date": "2025-09-27",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Tommy2025-09-27.jpg"
  },
  {
    "id": 186,
    "name": "Amanda",
    "date": "2025-09-27",
    "rating": 5,
    "text": "Great vehicle and friendly host!",
    "photo": "/reviews/Amanda2025-09-27.jpg"
  },
  {
    "id": 187,
    "name": "Leonardo",
    "date": "2025-09-26",
    "rating": 5,
    "text": "Amazing car!",
    "photo": "/reviews/Leonardo2025-09-26.jpg"
  },
  {
    "id": 188,
    "name": "Samantha",
    "date": "2025-09-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Samantha2025-09-26.jpg"
  },
  {
    "id": 189,
    "name": "Guillermo",
    "date": "2025-09-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Guillermo2025-09-26.jpg"
  },
  {
    "id": 190,
    "name": "Raymond",
    "date": "2025-09-26",
    "rating": 5,
    "text": "Truck quality, pickup, location and host were All EXCELLENT!!",
    "photo": "/reviews/Raymond2025-09-26.jpg"
  },
  {
    "id": 191,
    "name": "vegard",
    "date": "2025-09-24",
    "rating": 5,
    "text": "Both the car and the host, Yaineri, were absolutely amazing.\n\nYaineri was incredibly generous and accommodating when we needed to extend our rental, making the whole process stress-free. I can absolutely recommend this to everyone looking for a reliable, fun ride!",
    "photo": "/reviews/vegard2025-09-24.jpg"
  },
  {
    "id": 192,
    "name": "Matheus",
    "date": "2025-09-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Matheus2025-09-24.jpg"
  },
  {
    "id": 193,
    "name": "Glenn",
    "date": "2025-09-23",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Glenn2025-09-23.jpg"
  },
  {
    "id": 194,
    "name": "Jose",
    "date": "2025-09-23",
    "rating": 5,
    "text": "Veryy Amazing Car Host Very Responsive And Helpful when meed Will definitely be renting once Agin In a few Days",
    "photo": "/reviews/Jose2025-09-23.jpg"
  },
  {
    "id": 195,
    "name": "Edgar",
    "date": "2025-09-22",
    "rating": 5,
    "text": "Great host, always available, and the car was clean",
    "photo": "/reviews/Edgar2025-09-22.jpg"
  },
  {
    "id": 196,
    "name": "Christian",
    "date": "2025-09-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christian2025-09-22.jpg"
  },
  {
    "id": 197,
    "name": "Eric",
    "date": "2025-09-21",
    "rating": 5,
    "text": "Great vehicle and host was amazing",
    "photo": "/reviews/Eric2025-09-21.jpg"
  },
  {
    "id": 198,
    "name": "Darrell",
    "date": "2025-09-21",
    "rating": 5,
    "text": "Very helpful and quick response time",
    "photo": "/reviews/Darrell2025-09-21.jpg"
  },
  {
    "id": 199,
    "name": "Juan",
    "date": "2025-09-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Juan2025-09-21.jpg"
  },
  {
    "id": 200,
    "name": "Thomas",
    "date": "2025-09-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Thomas2025-09-21.jpg"
  },
  {
    "id": 201,
    "name": "Tennie",
    "date": "2025-09-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Tennie2025-09-21.jpg"
  },
  {
    "id": 202,
    "name": "Thiago",
    "date": "2025-09-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Thiago2025-09-21.jpg"
  },
  {
    "id": 203,
    "name": "Tomas",
    "date": "2025-09-20",
    "rating": 5,
    "text": "Todo perfecto! El auto y la atención. Siempre disponibles.",
    "photo": "/reviews/Tomas2025-09-20.jpg"
  },
  {
    "id": 204,
    "name": "Theodore",
    "date": "2025-09-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Theodore2025-09-20.jpg"
  },
  {
    "id": 205,
    "name": "Cruz",
    "date": "2025-09-20",
    "rating": 5,
    "text": "Everything perfect",
    "photo": "/reviews/Cruz2025-09-20.jpg"
  },
  {
    "id": 206,
    "name": "kristin",
    "date": "2025-09-20",
    "rating": 5,
    "text": "Great car, great service! This was My\nsecond time renting it",
    "photo": "/reviews/kristin2025-09-20.jpg"
  },
  {
    "id": 207,
    "name": "Rosa",
    "date": "2025-09-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rosa2025-09-18.jpg"
  },
  {
    "id": 208,
    "name": "Khadisha",
    "date": "2025-09-18",
    "rating": 5,
    "text": "Outstanding experience. This car is perfect and finding charging stations was very easy",
    "photo": "/reviews/Khadisha2025-09-18.jpg"
  },
  {
    "id": 209,
    "name": "Can",
    "date": "2025-09-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Can2025-09-17.jpg"
  },
  {
    "id": 210,
    "name": "Rick",
    "date": "2025-09-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rick2025-09-17.jpg"
  },
  {
    "id": 211,
    "name": "Jefferson",
    "date": "2025-09-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jefferson2025-09-17.jpg"
  },
  {
    "id": 212,
    "name": "Walter",
    "date": "2025-09-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Walter2025-09-17.jpg"
  },
  {
    "id": 213,
    "name": "Daniel",
    "date": "2025-09-17",
    "rating": 5,
    "text": "Great car, great host. Recommended!",
    "photo": "/reviews/Daniel2025-09-17.jpg"
  },
  {
    "id": 214,
    "name": "Pedro",
    "date": "2025-09-16",
    "rating": 4,
    "text": "Very Good Experience The Car was in very good condition. Ahí Enjoy, A Lot, More Than, I Expect The, FSD But. My host was not there. Anytime I need it.",
    "photo": "/reviews/Pedro2025-09-16.jpg"
  },
  {
    "id": 215,
    "name": "Yolanda",
    "date": "2025-09-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Yolanda2025-09-15.jpg"
  },
  {
    "id": 216,
    "name": "Hurvens",
    "date": "2025-09-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Hurvens2025-09-15.jpg"
  },
  {
    "id": 217,
    "name": "Dorion",
    "date": "2025-09-15",
    "rating": 5,
    "text": "Great car would book again.",
    "photo": "/reviews/Dorion2025-09-15.jpg"
  },
  {
    "id": 218,
    "name": "Alexander",
    "date": "2025-09-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alexander2025-09-15.jpg"
  },
  {
    "id": 219,
    "name": "Jonathan",
    "date": "2025-09-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jonathan2025-09-15.jpg"
  },
  {
    "id": 220,
    "name": "Leon",
    "date": "2025-09-15",
    "rating": 5,
    "text": "Host was amazing . If you’re interested wont be a bad idea at all",
    "photo": "/reviews/Leon2025-09-15.jpg"
  },
  {
    "id": 221,
    "name": "Deborah",
    "date": "2025-09-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Deborah2025-09-15.jpg"
  },
  {
    "id": 222,
    "name": "Emerson",
    "date": "2025-09-14",
    "rating": 5,
    "text": "Execelente anfitrión\nCarro hermoso y limpio\nSuper nice\nRecomendado 100%",
    "photo": "/reviews/Emerson2025-09-14.jpg"
  },
  {
    "id": 223,
    "name": "Seamus",
    "date": "2025-09-14",
    "rating": 5,
    "text": "Super clean. Communicative and helpful.",
    "photo": "/reviews/Seamus2025-09-14.jpg"
  },
  {
    "id": 224,
    "name": "blake",
    "date": "2025-09-13",
    "rating": 5,
    "text": "Absolutely 5 stars!!! Easy to pickup, and return the car. The host was extremely helpful, and made the entire process simple!!",
    "photo": "/reviews/blake2025-09-13.jpg"
  },
  {
    "id": 225,
    "name": "liya",
    "date": "2025-09-12",
    "rating": 5,
    "text": "Great communication, best Turo experience we ever had!!!! Best price and nicest people. Thank you so much.",
    "photo": "/reviews/liya2025-09-12.jpg"
  },
  {
    "id": 226,
    "name": "Juan Alejandro",
    "date": "2025-09-11",
    "rating": 5,
    "text": "Everything was awesome!",
    "photo": "/reviews/JuanAlejandro2025-09-11.jpg"
  },
  {
    "id": 227,
    "name": "Andre",
    "date": "2025-09-11",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Andre2025-09-11.jpg"
  },
  {
    "id": 228,
    "name": "Jorge",
    "date": "2025-09-11",
    "rating": 5,
    "text": "Tuve una excelente experiencia alquilando con Yaineri 🚗⚡️. Me entregó el Tesla Y 2025 directamente en mi ubicación, todo fue muy rápido y con una comunicación clara y constante. El auto estaba impecable, prácticamente nuevo, hermoso y con mucho espacio. La atención y puntualidad de Yaineri hicieron que el servicio sea de primera. ¡Altamente recomendada y muy agradecido por todo! 🙌✨Muchas gracias !!!.",
    "photo": "/reviews/Jorge2025-09-11.jpg"
  },
  {
    "id": 229,
    "name": "Carlos",
    "date": "2025-09-11",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Carlos2025-09-11.jpg"
  },
  {
    "id": 230,
    "name": "Kenthia",
    "date": "2025-09-10",
    "rating": 5,
    "text": "Amazing host and co-host . Love booking with them.",
    "photo": "/reviews/Kenthia2025-09-10.jpg"
  },
  {
    "id": 231,
    "name": "Walter",
    "date": "2025-09-09",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Walter2025-09-09.jpg"
  },
  {
    "id": 232,
    "name": "Ahmet",
    "date": "2025-09-09",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Ahmet2025-09-09.jpg"
  },
  {
    "id": 233,
    "name": "Luis",
    "date": "2025-09-09",
    "rating": 5,
    "text": "Amazing car and host. Tnx",
    "photo": "/reviews/Luis2025-09-09.jpg"
  },
  {
    "id": 234,
    "name": "Dan",
    "date": "2025-09-08",
    "rating": 5,
    "text": "Top notch host highly recommend. The car is absolutely gorgeous. Thank you.",
    "photo": "/reviews/Dan2025-09-08.jpg"
  },
  {
    "id": 235,
    "name": "Sierra",
    "date": "2025-09-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Sierra2025-09-08.jpg"
  },
  {
    "id": 236,
    "name": "Frederico",
    "date": "2025-09-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Frederico2025-09-07.jpg"
  },
  {
    "id": 237,
    "name": "Lavon",
    "date": "2025-09-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lavon2025-09-07.jpg"
  },
  {
    "id": 238,
    "name": "Celso",
    "date": "2025-09-06",
    "rating": 5,
    "text": "It was an incredible experience. The support was incredible too. Everything was great! The car was also amazing. It was my first experience with Turo, and Yainery was an excellent host!",
    "photo": "/reviews/Celso2025-09-06.jpg"
  },
  {
    "id": 239,
    "name": "Jimmie",
    "date": "2025-09-06",
    "rating": 5,
    "text": "Great car. Super clean. All the features. Easy pickup and drop off. Great host. Best I’ve had yet.",
    "photo": "/reviews/Jimmie2025-09-06.jpg"
  },
  {
    "id": 240,
    "name": "Lazariah",
    "date": "2025-09-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lazariah2025-09-06.jpg"
  },
  {
    "id": 241,
    "name": "Juan Pablo",
    "date": "2025-09-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/JuanPablo2025-09-05.jpg"
  },
  {
    "id": 242,
    "name": "Andre",
    "date": "2025-09-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Andre2025-09-05.jpg"
  },
  {
    "id": 243,
    "name": "Jerry",
    "date": "2025-09-04",
    "rating": 5,
    "text": "Smooth ride. Excellent car. Easy pick up and drop off",
    "photo": "/reviews/Jerry2025-09-04.jpg"
  },
  {
    "id": 244,
    "name": "Miguel",
    "date": "2025-09-04",
    "rating": 5,
    "text": "Great service and communication, the vehicle was just as described.",
    "photo": "/reviews/Miguel2025-09-04.jpg"
  },
  {
    "id": 245,
    "name": "Vanessa",
    "date": "2025-09-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Vanessa2025-09-04.jpg"
  },
  {
    "id": 246,
    "name": "Tyree",
    "date": "2025-09-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Tyree2025-09-04.jpg"
  },
  {
    "id": 247,
    "name": "Alfonso",
    "date": "2025-09-03",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alfonso2025-09-03.jpg"
  },
  {
    "id": 248,
    "name": "Chabrie'",
    "date": "2025-09-03",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Chabrie2025-09-03.jpg"
  },
  {
    "id": 249,
    "name": "Justin",
    "date": "2025-09-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Justin2025-09-02.jpg"
  },
  {
    "id": 250,
    "name": "Janecia",
    "date": "2025-09-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Janecia2025-09-02.jpg"
  },
  {
    "id": 251,
    "name": "Luis C.",
    "date": "2025-09-02",
    "rating": 5,
    "text": "Amazing ride and host. Love everything about this rental!",
    "photo": "/reviews/LuisC2025-09-02.jpg"
  },
  {
    "id": 252,
    "name": "Alexandra",
    "date": "2025-09-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alexandra2025-09-02.jpg"
  },
  {
    "id": 253,
    "name": "Terrell",
    "date": "2025-09-01",
    "rating": 5,
    "text": "Nice clean truck, good communication",
    "photo": "/reviews/Terrell2025-09-01.jpg"
  },
  {
    "id": 254,
    "name": "Shakyra",
    "date": "2025-09-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Shakyra2025-09-01.jpg"
  },
  {
    "id": 255,
    "name": "Diego",
    "date": "2025-09-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Diego2025-09-01.jpg"
  },
  {
    "id": 256,
    "name": "Fernando",
    "date": "2025-09-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Fernando2025-09-01.jpg"
  },
  {
    "id": 257,
    "name": "Anthony",
    "date": "2025-09-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Anthony2025-09-01.jpg"
  },
  {
    "id": 258,
    "name": "Jason",
    "date": "2025-09-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jason2025-09-01.jpg"
  },
  {
    "id": 259,
    "name": "Eathon",
    "date": "2025-09-01",
    "rating": 5,
    "text": "The car was amazing,the look is stylish just like in the pictures,the pickup and drop off was super easy and easy to navigate",
    "photo": "/reviews/Eathon2025-09-01.jpg"
  },
  {
    "id": 260,
    "name": "Blake",
    "date": "2025-09-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Blake2025-09-01.jpg"
  },
  {
    "id": 261,
    "name": "Thiago",
    "date": "2025-08-31",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Thiago2025-08-31.jpg"
  },
  {
    "id": 262,
    "name": "Stanley",
    "date": "2025-08-31",
    "rating": 5,
    "text": "The car was clean and hosts arrived on time to drop off car. They responded really fast about charging questions and coordinating with pick up so the day went super smooth. I’ve had bad experiences where the car wasn’t as described but this car was clean, smelled so good and in excellent condition.",
    "photo": "/reviews/Stanley2025-08-31.jpg"
  },
  {
    "id": 263,
    "name": "Paulo Henrique",
    "date": "2025-08-30",
    "rating": 5,
    "text": "You are amazing and the car superb",
    "photo": "/reviews/PauloHenrique2025-08-30.jpg"
  },
  {
    "id": 264,
    "name": "Victor",
    "date": "2025-08-28",
    "rating": 5,
    "text": "Great car and great service",
    "photo": "/reviews/Victor2025-08-28.jpg"
  },
  {
    "id": 265,
    "name": "Nicolas",
    "date": "2025-08-28",
    "rating": 5,
    "text": "Great car and great host!! Very helpful at any time!!",
    "photo": "/reviews/Nicolas2025-08-28.jpg"
  },
  {
    "id": 266,
    "name": "katiana",
    "date": "2025-08-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/katiana2025-08-28.jpg"
  },
  {
    "id": 267,
    "name": "Alejandro",
    "date": "2025-08-28",
    "rating": 5,
    "text": "The car is amazing, it's new and if you like electric cars and trucks you'll love it, we took a trip to Ginnie Spring and it was perfect, the owner explained everything perfectly and the pick up and drop off were fine, only if you pick them up at the airport they will charge you 20 dollars upon departure, everything else is 100 %",
    "photo": "/reviews/Alejandro2025-08-28.jpg"
  },
  {
    "id": 268,
    "name": "Roberto",
    "date": "2025-08-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Roberto2025-08-28.jpg"
  },
  {
    "id": 269,
    "name": "Alexander",
    "date": "2025-08-28",
    "rating": 5,
    "text": "Very happy with everything!\n\nThe host was very kind to deliver the car to my hotel. All experience was seamless, the car was charged, clean and a pleasure to drive.\n\nAs stated in the description, it also comes with FSD which means that it has a full autopilot. I was impressed with how smooth and good it was. It felt like I rented a car with a chauffeur",
    "photo": "/reviews/Alexander2025-08-28.jpg"
  },
  {
    "id": 270,
    "name": "Konstantin",
    "date": "2025-08-27",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Konstantin2025-08-27.jpg"
  },
  {
    "id": 271,
    "name": "Jacklyn",
    "date": "2025-08-27",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jacklyn2025-08-27.jpg"
  },
  {
    "id": 272,
    "name": "Carlos",
    "date": "2025-08-27",
    "rating": 5,
    "text": "Great car in great conditions. Very neat and clean. Host was the best! Easy-going and easy to communicate with. Highly recommended!",
    "photo": "/reviews/Carlos2025-08-27.jpg"
  },
  {
    "id": 273,
    "name": "Geizian",
    "date": "2025-08-25",
    "rating": 5,
    "text": "A viagem foi perfeita, o anfitrião foi extremamente receptivo e responde super rápido todas as dúvidas. O carro é incrível!!!",
    "photo": "/reviews/Geizian2025-08-25.jpg"
  },
  {
    "id": 274,
    "name": "Christopher",
    "date": "2025-08-25",
    "rating": 5,
    "text": "Excellent rental experience in Miami. Yainery was a super host, very flexible with arrangements for pick up and collection/drop off. Car (2025 Model Y) was in excellent condition and benefitted from FSD! A must have if you e ever tried it. Transformed the experience and made driving a breeze.\n\nHighly recommend using Yainery, we will look her up when we're back the area.\n\n10 out of 10. 🥰",
    "photo": "/reviews/Christopher2025-08-25.jpg"
  },
  {
    "id": 275,
    "name": "Rey",
    "date": "2025-08-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rey2025-08-25.jpg"
  },
  {
    "id": 276,
    "name": "rose",
    "date": "2025-08-25",
    "rating": 5,
    "text": "Car was very nice and host was very reliable.",
    "photo": "/reviews/rose2025-08-25.jpg"
  },
  {
    "id": 277,
    "name": "Kewyn",
    "date": "2025-08-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Kewyn2025-08-25.jpg"
  },
  {
    "id": 278,
    "name": "Joseph",
    "date": "2025-08-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Joseph2025-08-24.jpg"
  },
  {
    "id": 279,
    "name": "G",
    "date": "2025-08-24",
    "rating": 5,
    "text": "Prefect communication and smooth and clean pick up and drop off , even let me extend the trip for an extra 3 hours !",
    "photo": "/reviews/G2025-08-24.jpg"
  },
  {
    "id": 280,
    "name": "roger",
    "date": "2025-08-24",
    "rating": 5,
    "text": "My trip to Miami wouldnt have been made more comfortable than this rental. The owner is so sweet, kind and patient. She gives you all access to the car via the Tesla app (which comes with full self driving).\nCannot wait for my next visit. Highly recommend the service",
    "photo": "/reviews/roger2025-08-24.jpg"
  },
  {
    "id": 281,
    "name": "Will",
    "date": "2025-08-24",
    "rating": 5,
    "text": "Superb communication, vehicle in excellent condition, Appreciated Tesla app access, and FSD was wonderful around Miami",
    "photo": "/reviews/Will2025-08-24.jpg"
  },
  {
    "id": 282,
    "name": "Ariel",
    "date": "2025-08-23",
    "rating": 5,
    "text": "Great host overall and a pleasure to rent Teslas from!",
    "photo": "/reviews/Ariel2025-08-23.jpg"
  },
  {
    "id": 283,
    "name": "Tony",
    "date": "2025-08-23",
    "rating": 5,
    "text": "Perfect trip, very good car and attentive host. I recommend it.",
    "photo": "/reviews/Tony2025-08-23.jpg"
  },
  {
    "id": 284,
    "name": "kristin",
    "date": "2025-08-23",
    "rating": 5,
    "text": "Spacious, nice, and clean! Easy to find at airport and simple drop off as well. Will definitely rent again",
    "photo": "/reviews/kristin2025-08-23.jpg"
  },
  {
    "id": 285,
    "name": "Amarpratap Singh",
    "date": "2025-08-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/AmarpratapSingh2025-08-22.jpg"
  },
  {
    "id": 286,
    "name": "Rafael",
    "date": "2025-08-22",
    "rating": 5,
    "text": "Everything was great WILL be renting again soon.",
    "photo": "/reviews/Rafael2025-08-22.jpg"
  },
  {
    "id": 287,
    "name": "Francisco",
    "date": "2025-08-22",
    "rating": 5,
    "text": "Awesome car and amazing ride today",
    "photo": "/reviews/Francisco2025-08-22.jpg"
  },
  {
    "id": 288,
    "name": "Maude",
    "date": "2025-08-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Maude2025-08-22.jpg"
  },
  {
    "id": 289,
    "name": "Afsheen",
    "date": "2025-08-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Afsheen2025-08-21.jpg"
  },
  {
    "id": 290,
    "name": "Tamika",
    "date": "2025-08-21",
    "rating": 5,
    "text": "Beautiful experience",
    "photo": "/reviews/Tamika2025-08-21.jpg"
  },
  {
    "id": 291,
    "name": "Luis",
    "date": "2025-08-20",
    "rating": 5,
    "text": "Excellent",
    "photo": "/reviews/Luis2025-08-20.jpg"
  },
  {
    "id": 292,
    "name": "M",
    "date": "2025-08-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/M2025-08-20.jpg"
  },
  {
    "id": 293,
    "name": "Christian",
    "date": "2025-08-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christian2025-08-19.jpg"
  },
  {
    "id": 294,
    "name": "Shakyra",
    "date": "2025-08-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Shakyra2025-08-18.jpg"
  },
  {
    "id": 295,
    "name": "Leavon",
    "date": "2025-08-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Leavon2025-08-18.jpg"
  },
  {
    "id": 296,
    "name": "Dariel",
    "date": "2025-08-17",
    "rating": 5,
    "text": "Everything excellent. Great communication, service and car conditions! Hope to rent again with you next time in Miami!",
    "photo": "/reviews/Dariel2025-08-17.jpg"
  },
  {
    "id": 297,
    "name": "Richard",
    "date": "2025-08-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Richard2025-08-17.jpg"
  },
  {
    "id": 298,
    "name": "Marshone",
    "date": "2025-08-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Marshone2025-08-17.jpg"
  },
  {
    "id": 299,
    "name": "Carlos",
    "date": "2025-08-17",
    "rating": 5,
    "text": "Great host fast at communicating and car in excellent condition.",
    "photo": "/reviews/Carlos2025-08-17.jpg"
  },
  {
    "id": 300,
    "name": "Arkeeria",
    "date": "2025-08-17",
    "rating": 5,
    "text": "Smooth ride, host was very sweet !",
    "photo": "/reviews/Arkeeria2025-08-17.jpg"
  },
  {
    "id": 301,
    "name": "Maria",
    "date": "2025-08-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Maria2025-08-17.jpg"
  },
  {
    "id": 302,
    "name": "Charles",
    "date": "2025-08-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Charles2025-08-17.jpg"
  },
  {
    "id": 303,
    "name": "Ozge",
    "date": "2025-08-16",
    "rating": 5,
    "text": "Very easy pick up and drop off. Almost new and clean car without any issue. Great thanks to Yainery!",
    "photo": "/reviews/Ozge2025-08-16.jpg"
  },
  {
    "id": 304,
    "name": "George",
    "date": "2025-08-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/George2025-08-15.jpg"
  },
  {
    "id": 305,
    "name": "Daniel",
    "date": "2025-08-15",
    "rating": 5,
    "text": "Everything about the car, excellent comunication with owner, flexibility at pick up and drop off made everything outstanding. Love the Full self driving, car in top notch quality.",
    "photo": "/reviews/Daniel2025-08-15.jpg"
  },
  {
    "id": 306,
    "name": "Simon",
    "date": "2025-08-15",
    "rating": 5,
    "text": "Excelente servicio y auto, lo volvería a rentar 🤩",
    "photo": "/reviews/Simon2025-08-15.jpg"
  },
  {
    "id": 307,
    "name": "Steven",
    "date": "2025-08-14",
    "rating": 5,
    "text": "Great host will rent again!",
    "photo": "/reviews/Steven2025-08-14.jpg"
  },
  {
    "id": 308,
    "name": "George",
    "date": "2025-08-13",
    "rating": 5,
    "text": "The model Y was amazing! I used the full self driving 99% of the time. It is great when you don’t know where you’re going and you just let the car drive itself.",
    "photo": "/reviews/George2025-08-13.jpg"
  },
  {
    "id": 309,
    "name": "Mariano",
    "date": "2025-08-13",
    "rating": 5,
    "text": "The car was so clean ! We love the car ! Tesla model Y is so cool ! The host is so nice ! Thank you so much!",
    "photo": "/reviews/Mariano2025-08-13.jpg"
  },
  {
    "id": 310,
    "name": "pablo",
    "date": "2025-08-13",
    "rating": 5,
    "text": "El carro está perfecto, el servicio fue impecable. Muchas gracias.",
    "photo": "/reviews/pablo2025-08-13.jpg"
  },
  {
    "id": 311,
    "name": "Emanuel",
    "date": "2025-08-13",
    "rating": 5,
    "text": "The best experience of renting a car. If you are looking to try Self Drive mode, do it, it's the future of driving. Thanks for all !",
    "photo": "/reviews/Emanuel2025-08-13.jpg"
  },
  {
    "id": 312,
    "name": "Matthias",
    "date": "2025-08-12",
    "rating": 5,
    "text": "Great",
    "photo": "/reviews/Matthias2025-08-12.jpg"
  },
  {
    "id": 313,
    "name": "Jonathan",
    "date": "2025-08-11",
    "rating": 5,
    "text": "Everything was super smooth and had a great experience overall with the host and the vehicle. Highly recommend!",
    "photo": "/reviews/Jonathan2025-08-11.jpg"
  },
  {
    "id": 314,
    "name": "Chiedozie",
    "date": "2025-08-10",
    "rating": 5,
    "text": "Everything was perfect! The pickup and drop-off were easy, and the host was very responsive and understanding. My experience renting this car was seamless.",
    "photo": "/reviews/Chiedozie2025-08-10.jpg"
  },
  {
    "id": 315,
    "name": "Mike & Jen",
    "date": "2025-08-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/MikeJen2025-08-10.jpg"
  },
  {
    "id": 316,
    "name": "Rachael",
    "date": "2025-08-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rachael2025-08-10.jpg"
  },
  {
    "id": 317,
    "name": "Nimrod",
    "date": "2025-08-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Nimrod2025-08-10.jpg"
  },
  {
    "id": 318,
    "name": "Nelson",
    "date": "2025-08-10",
    "rating": 5,
    "text": "Muy buen auto maginifico muchas gracias",
    "photo": "/reviews/Nelson2025-08-10.jpg"
  },
  {
    "id": 319,
    "name": "Blaine",
    "date": "2025-08-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Blaine2025-08-08.jpg"
  },
  {
    "id": 320,
    "name": "Dominique",
    "date": "2025-08-08",
    "rating": 5,
    "text": "Car was excellent host is always 5 star review will book again.",
    "photo": "/reviews/Dominique2025-08-08.jpg"
  },
  {
    "id": 321,
    "name": "Luca",
    "date": "2025-08-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Luca2025-08-07.jpg"
  },
  {
    "id": 322,
    "name": "Marc",
    "date": "2025-08-06",
    "rating": 5,
    "text": "Great Turo experience! Pickup and drop-off were seamless, and the car was in excellent condition. Full Self-Driving (FSD) worked perfectly in this area—made the trip even more enjoyable. Highly recommend this host and vehicle. Will definitely rent again in the future!",
    "photo": "/reviews/Marc2025-08-06.jpg"
  },
  {
    "id": 323,
    "name": "Christopher",
    "date": "2025-08-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christopher2025-08-06.jpg"
  },
  {
    "id": 324,
    "name": "Gonzalo",
    "date": "2025-08-04",
    "rating": 5,
    "text": "Great host and great car, thank you!!",
    "photo": "/reviews/Gonzalo2025-08-04.jpg"
  },
  {
    "id": 325,
    "name": "Sayli",
    "date": "2025-08-04",
    "rating": 5,
    "text": "Amazing",
    "photo": "/reviews/Sayli2025-08-04.jpg"
  },
  {
    "id": 326,
    "name": "Afolabi",
    "date": "2025-08-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Afolabi2025-08-04.jpg"
  },
  {
    "id": 327,
    "name": "William",
    "date": "2025-08-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/William2025-08-04.jpg"
  },
  {
    "id": 328,
    "name": "brayan",
    "date": "2025-08-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/brayan2025-08-04.jpg"
  },
  {
    "id": 329,
    "name": "Faisal",
    "date": "2025-08-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Faisal2025-08-01.jpg"
  },
  {
    "id": 330,
    "name": "Andre",
    "date": "2025-08-01",
    "rating": 5,
    "text": "Amazing host and amazing car. Would definitely rent it again.",
    "photo": "/reviews/Andre2025-08-01.jpg"
  },
  {
    "id": 331,
    "name": "Malachi",
    "date": "2025-07-31",
    "rating": 5,
    "text": "Amazing wonderful and can’t wait to book again",
    "photo": "/reviews/Malachi2025-07-31.jpg"
  },
  {
    "id": 332,
    "name": "Maui",
    "date": "2025-07-31",
    "rating": 5,
    "text": "Perfect ride to discover Miami , autopilot is crazy good !\nYainery was a wonderful host.\nMauruuru (thank you)",
    "photo": "/reviews/Maui2025-07-31.jpg"
  },
  {
    "id": 333,
    "name": "Hernan Lucas",
    "date": "2025-07-31",
    "rating": 5,
    "text": "",
    "photo": "/reviews/HernanLucas2025-07-31.jpg"
  },
  {
    "id": 334,
    "name": "Alex",
    "date": "2025-07-30",
    "rating": 5,
    "text": "Host was the best so far, responds instantly, and customer service was the best I have seen",
    "photo": "/reviews/Alex2025-07-30.jpg"
  },
  {
    "id": 335,
    "name": "Lusanda",
    "date": "2025-07-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lusanda2025-07-30.jpg"
  },
  {
    "id": 336,
    "name": "Nicolás R",
    "date": "2025-07-30",
    "rating": 5,
    "text": "What a Car !!!",
    "photo": "/reviews/NicolsR2025-07-30.jpg"
  },
  {
    "id": 337,
    "name": "Steffano",
    "date": "2025-07-28",
    "rating": 5,
    "text": "Host was great and very responsive, the car was exactly as portrayed in the picture and description. I would 100% recommend booking with her.",
    "photo": "/reviews/Steffano2025-07-28.jpg"
  },
  {
    "id": 338,
    "name": "Theodore",
    "date": "2025-07-28",
    "rating": 5,
    "text": "we would book again everything was great",
    "photo": "/reviews/Theodore2025-07-28.jpg"
  },
  {
    "id": 339,
    "name": "Kevin",
    "date": "2025-07-28",
    "rating": 5,
    "text": "Friendly host. Easy checkin and checkout. Car was in good and working conditions. No complaints.",
    "photo": "/reviews/Kevin2025-07-28.jpg"
  },
  {
    "id": 340,
    "name": "Geanine",
    "date": "2025-07-28",
    "rating": 5,
    "text": "The Tesla Model Y was like brand new! Super clean and easy to drive. Excellent customer service and communication by Yaineri (the host). Thank you for making it seamless for our trip.",
    "photo": "/reviews/Geanine2025-07-28.jpg"
  },
  {
    "id": 341,
    "name": "Robert",
    "date": "2025-07-28",
    "rating": 5,
    "text": "Fantastic car. Yainey was a great host.",
    "photo": "/reviews/Robert2025-07-28.jpg"
  },
  {
    "id": 342,
    "name": "Dr. Katy",
    "date": "2025-07-28",
    "rating": 5,
    "text": "Car and host were both lovely. Would rent again.!",
    "photo": "/reviews/DrKaty2025-07-28.jpg"
  },
  {
    "id": 343,
    "name": "Anthony",
    "date": "2025-07-28",
    "rating": 5,
    "text": "Great ride and great host!",
    "photo": "/reviews/Anthony2025-07-28.jpg"
  },
  {
    "id": 344,
    "name": "Edgar",
    "date": "2025-07-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Edgar2025-07-28.jpg"
  },
  {
    "id": 345,
    "name": "Fernando",
    "date": "2025-07-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Fernando2025-07-28.jpg"
  },
  {
    "id": 346,
    "name": "Valmore",
    "date": "2025-07-28",
    "rating": 5,
    "text": "Excellent",
    "photo": "/reviews/Valmore2025-07-28.jpg"
  },
  {
    "id": 347,
    "name": "Ana",
    "date": "2025-07-27",
    "rating": 5,
    "text": "Toda una experiencia",
    "photo": "/reviews/Ana2025-07-27.jpg"
  },
  {
    "id": 348,
    "name": "Brittany",
    "date": "2025-07-27",
    "rating": 5,
    "text": "Host was great, car was clean and as advertised",
    "photo": "/reviews/Brittany2025-07-27.jpg"
  },
  {
    "id": 349,
    "name": "Gabriel",
    "date": "2025-07-26",
    "rating": 5,
    "text": "Excelente atencion. Super buen host pendiente de todo y responde a cualquier consulta siempre.",
    "photo": "/reviews/Gabriel2025-07-26.jpg"
  },
  {
    "id": 350,
    "name": "Nimesh",
    "date": "2025-07-25",
    "rating": 5,
    "text": "Everything was great !",
    "photo": "/reviews/Nimesh2025-07-25.jpg"
  },
  {
    "id": 351,
    "name": "Rafael",
    "date": "2025-07-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rafael2025-07-25.jpg"
  },
  {
    "id": 352,
    "name": "Elliot",
    "date": "2025-07-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Elliot2025-07-25.jpg"
  },
  {
    "id": 353,
    "name": "MICHEL ANGE",
    "date": "2025-07-23",
    "rating": 5,
    "text": "",
    "photo": "/reviews/MICHELANGE2025-07-23.jpg"
  },
  {
    "id": 354,
    "name": "Gerhard",
    "date": "2025-07-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Gerhard2025-07-21.jpg"
  },
  {
    "id": 355,
    "name": "Shelby",
    "date": "2025-07-21",
    "rating": 5,
    "text": "Great communication from host, easy pick up, great truck!",
    "photo": "/reviews/Shelby2025-07-21.jpg"
  },
  {
    "id": 356,
    "name": "Eli",
    "date": "2025-07-21",
    "rating": 5,
    "text": "Comfortable vehicle. Host is helpful and quick to respond.",
    "photo": "/reviews/Eli2025-07-21.jpg"
  },
  {
    "id": 357,
    "name": "Rome",
    "date": "2025-07-20",
    "rating": 5,
    "text": "Yainery’s red Model Y was perfect!",
    "photo": "/reviews/Rome2025-07-20.jpg"
  },
  {
    "id": 358,
    "name": "stefan",
    "date": "2025-07-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/stefan2025-07-20.jpg"
  },
  {
    "id": 359,
    "name": "Kirstie",
    "date": "2025-07-20",
    "rating": 5,
    "text": "Great trip!",
    "photo": "/reviews/Kirstie2025-07-20.jpg"
  },
  {
    "id": 360,
    "name": "Carolyn",
    "date": "2025-07-20",
    "rating": 5,
    "text": "Everything was easy, car is amazing, 100% would book again!",
    "photo": "/reviews/Carolyn2025-07-20.jpg"
  },
  {
    "id": 361,
    "name": "Wilbert",
    "date": "2025-07-19",
    "rating": 5,
    "text": "GREAT! everything perfect was a great communicator and everything was smooth car was very clean and she answered everything in a timely manner",
    "photo": "/reviews/Wilbert2025-07-19.jpg"
  },
  {
    "id": 362,
    "name": "Letti",
    "date": "2025-07-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Letti2025-07-19.jpg"
  },
  {
    "id": 363,
    "name": "Darlan",
    "date": "2025-07-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Darlan2025-07-19.jpg"
  },
  {
    "id": 364,
    "name": "Nivton",
    "date": "2025-07-17",
    "rating": 5,
    "text": "Fantastic!!",
    "photo": "/reviews/Nivton2025-07-17.jpg"
  },
  {
    "id": 365,
    "name": "James",
    "date": "2025-07-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/James2025-07-17.jpg"
  },
  {
    "id": 366,
    "name": "Christian",
    "date": "2025-07-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Christian2025-07-17.jpg"
  },
  {
    "id": 367,
    "name": "Margie",
    "date": "2025-07-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Margie2025-07-15.jpg"
  },
  {
    "id": 368,
    "name": "Joachim",
    "date": "2025-07-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Joachim2025-07-14.jpg"
  },
  {
    "id": 369,
    "name": "Khalid",
    "date": "2025-07-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Khalid2025-07-14.jpg"
  },
  {
    "id": 370,
    "name": "Kareem",
    "date": "2025-07-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Kareem2025-07-14.jpg"
  },
  {
    "id": 371,
    "name": "Zacharry",
    "date": "2025-07-13",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Zacharry2025-07-13.jpg"
  },
  {
    "id": 372,
    "name": "Rina",
    "date": "2025-07-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rina2025-07-12.jpg"
  },
  {
    "id": 373,
    "name": "Deus",
    "date": "2025-07-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Deus2025-07-12.jpg"
  },
  {
    "id": 374,
    "name": "Gian Luca",
    "date": "2025-07-10",
    "rating": 5,
    "text": "Excellent car and service!!",
    "photo": "/reviews/GianLuca2025-07-10.jpg"
  },
  {
    "id": 375,
    "name": "Jadah",
    "date": "2025-07-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jadah2025-07-10.jpg"
  },
  {
    "id": 376,
    "name": "Caleb",
    "date": "2025-07-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Caleb2025-07-10.jpg"
  },
  {
    "id": 377,
    "name": "Rebecca",
    "date": "2025-07-09",
    "rating": 5,
    "text": "great, clean and nice!",
    "photo": "/reviews/Rebecca2025-07-09.jpg"
  },
  {
    "id": 378,
    "name": "Khadijat",
    "date": "2025-07-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Khadijat2025-07-07.jpg"
  },
  {
    "id": 379,
    "name": "Francisco",
    "date": "2025-07-07",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Francisco2025-07-07.jpg"
  },
  {
    "id": 380,
    "name": "Sidny",
    "date": "2025-07-06",
    "rating": 5,
    "text": "El carro estaba impecablemente limpio , es un carro muy bello y nuevo , the host fue magnífica y la comunicación con ella fue perfecta !",
    "photo": "/reviews/Sidny2025-07-06.jpg"
  },
  {
    "id": 381,
    "name": "Rome",
    "date": "2025-07-06",
    "rating": 5,
    "text": "The Y was perfectly maintained. Thx so much!",
    "photo": "/reviews/Rome2025-07-06.jpg"
  },
  {
    "id": 382,
    "name": "Henri",
    "date": "2025-07-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Henri2025-07-06.jpg"
  },
  {
    "id": 383,
    "name": "ashley",
    "date": "2025-07-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/ashley2025-07-06.jpg"
  },
  {
    "id": 384,
    "name": "harold",
    "date": "2025-07-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/harold2025-07-06.jpg"
  },
  {
    "id": 385,
    "name": "Tonnie",
    "date": "2025-07-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Tonnie2025-07-05.jpg"
  },
  {
    "id": 386,
    "name": "Renee",
    "date": "2025-07-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Renee2025-07-05.jpg"
  },
  {
    "id": 387,
    "name": "Denzel",
    "date": "2025-07-03",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Denzel2025-07-03.jpg"
  },
  {
    "id": 388,
    "name": "Ricardo Augusto",
    "date": "2025-07-03",
    "rating": 5,
    "text": "Perfect",
    "photo": "/reviews/RicardoAugusto2025-07-03.jpg"
  },
  {
    "id": 389,
    "name": "Mingkun",
    "date": "2025-07-03",
    "rating": 5,
    "text": "Everything is great. You definitely need full self driving to drive in Miami lol!! It’s much more convenient and accident free.",
    "photo": "/reviews/Mingkun2025-07-03.jpg"
  },
  {
    "id": 390,
    "name": "Ezra",
    "date": "2025-07-03",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Ezra2025-07-03.jpg"
  },
  {
    "id": 391,
    "name": "Bastiaan",
    "date": "2025-07-02",
    "rating": 5,
    "text": "Great car, great host, everything was fantastic. Communication was great and everything went very smooth! Would rent here next time I come to Miami.",
    "photo": "/reviews/Bastiaan2025-07-02.jpg"
  },
  {
    "id": 392,
    "name": "Lawrence",
    "date": "2025-07-01",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lawrence2025-07-01.jpg"
  },
  {
    "id": 393,
    "name": "Hernan",
    "date": "2025-07-01",
    "rating": 5,
    "text": "Yainery was always available for all our doubts. I’ve highly recommend her.",
    "photo": "/reviews/Hernan2025-07-01.jpg"
  },
  {
    "id": 394,
    "name": "Lucas",
    "date": "2025-07-01",
    "rating": 5,
    "text": "A anfitriã é fantástica! Não tive problemas com ela, super atenciosa, recomendo muito! // The hostess is fantastic! I had no problems with her, super attentive, I highly recommend her!",
    "photo": "/reviews/Lucas2025-07-01.jpg"
  },
  {
    "id": 395,
    "name": "Kenthia",
    "date": "2025-06-30",
    "rating": 5,
    "text": "This host is amazing accommodating respectful everything that you need in a host 10 out of 10. Second time booking and both were amazing.",
    "photo": "/reviews/Kenthia2025-06-30.jpg"
  },
  {
    "id": 396,
    "name": "Andres",
    "date": "2025-06-30",
    "rating": 5,
    "text": "Todo excelente muy buena atención.",
    "photo": "/reviews/Andres2025-06-30.jpg"
  },
  {
    "id": 397,
    "name": "Elliott",
    "date": "2025-06-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Elliott2025-06-30.jpg"
  },
  {
    "id": 398,
    "name": "Martin",
    "date": "2025-06-29",
    "rating": 5,
    "text": "All was great. Car amazing. Better than I expected. Host is the best. Answer everything very quick and really helpfull",
    "photo": "/reviews/Martin2025-06-29.jpg"
  },
  {
    "id": 399,
    "name": "Zuber",
    "date": "2025-06-29",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Zuber2025-06-29.jpg"
  },
  {
    "id": 400,
    "name": "Mellow Pepper",
    "date": "2025-06-29",
    "rating": 5,
    "text": "",
    "photo": "/reviews/MellowPepper2025-06-29.jpg"
  },
  {
    "id": 401,
    "name": "Reynold",
    "date": "2025-06-28",
    "rating": 5,
    "text": "Such a lovely experience working with Yainery. My first time using Turo and first trip to Miami Beach. She was very helpful with all my questions and patient with my ignorance. She has a beautiful Tesla with full self drive that I am very used to driving personally and it felt right at home driving her car.",
    "photo": "/reviews/Reynold2025-06-28.jpg"
  },
  {
    "id": 402,
    "name": "Elena",
    "date": "2025-06-28",
    "rating": 5,
    "text": "Car was immaculate, smelling fresh and ready to go when I arrived at the airport. Owner was responsive to communication and pleasant to deal with. I will definitely rent from her again when back in town!",
    "photo": "/reviews/Elena2025-06-28.jpg"
  },
  {
    "id": 403,
    "name": "Mauro",
    "date": "2025-06-28",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Mauro2025-06-28.jpg"
  },
  {
    "id": 404,
    "name": "Aaron",
    "date": "2025-06-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Aaron2025-06-26.jpg"
  },
  {
    "id": 405,
    "name": "Mariah",
    "date": "2025-06-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Mariah2025-06-26.jpg"
  },
  {
    "id": 406,
    "name": "Carla",
    "date": "2025-06-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Carla2025-06-25.jpg"
  },
  {
    "id": 407,
    "name": "Win",
    "date": "2025-06-25",
    "rating": 5,
    "text": "Everything went well as planned. Full self drive available.",
    "photo": "/reviews/Win2025-06-25.jpg"
  },
  {
    "id": 408,
    "name": "Miroslaw",
    "date": "2025-06-25",
    "rating": 5,
    "text": "Yainery is not only a great host, but also a fantastic person. Very nice, punctual and incredibly flexible. My friends and I are very satisfied! The vehicle was super clean and very comfortable. Thank you Yainery! We wish you all the best!",
    "photo": "/reviews/Miroslaw2025-06-25.jpg"
  },
  {
    "id": 409,
    "name": "Brian",
    "date": "2025-06-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Brian2025-06-25.jpg"
  },
  {
    "id": 410,
    "name": "Dylan",
    "date": "2025-06-24",
    "rating": 5,
    "text": "Great experience! Lovely to deal with! Needed help with something and that went out of there way to help which I really appreciated! Would stronger recommend them.",
    "photo": "/reviews/Dylan2025-06-24.jpg"
  },
  {
    "id": 411,
    "name": "Breno",
    "date": "2025-06-24",
    "rating": 5,
    "text": "Everything was excellent.",
    "photo": "/reviews/Breno2025-06-24.jpg"
  },
  {
    "id": 412,
    "name": "JC",
    "date": "2025-06-23",
    "rating": 5,
    "text": "Amazing car and host!",
    "photo": "/reviews/JC2025-06-23.jpg"
  },
  {
    "id": 413,
    "name": "Siahou",
    "date": "2025-06-23",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Siahou2025-06-23.jpg"
  },
  {
    "id": 414,
    "name": "Lucas",
    "date": "2025-06-23",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lucas2025-06-23.jpg"
  },
  {
    "id": 415,
    "name": "Paul",
    "date": "2025-06-23",
    "rating": 5,
    "text": "Car was great. Yainery was great. Trip was great. Definitely recommend - 10/10",
    "photo": "/reviews/Paul2025-06-23.jpg"
  },
  {
    "id": 416,
    "name": "Awek",
    "date": "2025-06-23",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Awek2025-06-23.jpg"
  },
  {
    "id": 417,
    "name": "Jairo",
    "date": "2025-06-22",
    "rating": 5,
    "text": "Impecable Service. Clean car and increíble Owner.",
    "photo": "/reviews/Jairo2025-06-22.jpg"
  },
  {
    "id": 418,
    "name": "Alan",
    "date": "2025-06-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alan2025-06-22.jpg"
  },
  {
    "id": 419,
    "name": "Joao",
    "date": "2025-06-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Joao2025-06-22.jpg"
  },
  {
    "id": 420,
    "name": "Nicolas",
    "date": "2025-06-22",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Nicolas2025-06-22.jpg"
  },
  {
    "id": 421,
    "name": "LUIS",
    "date": "2025-06-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/LUIS2025-06-21.jpg"
  },
  {
    "id": 422,
    "name": "Cobi",
    "date": "2025-06-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Cobi2025-06-20.jpg"
  },
  {
    "id": 423,
    "name": "Shaneah",
    "date": "2025-06-20",
    "rating": 5,
    "text": "Great customer service. I will definitely rent from her again.",
    "photo": "/reviews/Shaneah2025-06-20.jpg"
  },
  {
    "id": 424,
    "name": "Paul",
    "date": "2025-06-19",
    "rating": 5,
    "text": "It is noteworthy that this is my second consecutive rental. Notably, I have never rented from the same vehicle. While I am aware that it is a Tesla, I am not referring to that aspect. Instead, I am referring to the excellent customers service.",
    "photo": "/reviews/Paul2025-06-19.jpg"
  },
  {
    "id": 425,
    "name": "Kwame",
    "date": "2025-06-19",
    "rating": 5,
    "text": "The car was perfect!!! Clean comfortable and the self driving works amazing. If you’re not familiar with the city this helps a lot. Owner was very pleasant and welcoming. Definitely would rent again!",
    "photo": "/reviews/Kwame2025-06-19.jpg"
  },
  {
    "id": 426,
    "name": "GEELISON",
    "date": "2025-06-18",
    "rating": 5,
    "text": "Amazing host, great communication.\nI will definitely book again when I return to Miami! 🌟🌟🌟🌟🌟",
    "photo": "/reviews/GEELISON2025-06-18.jpg"
  },
  {
    "id": 427,
    "name": "Thomas",
    "date": "2025-06-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Thomas2025-06-17.jpg"
  },
  {
    "id": 428,
    "name": "Andy",
    "date": "2025-06-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Andy2025-06-17.jpg"
  },
  {
    "id": 429,
    "name": "Brian",
    "date": "2025-06-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Brian2025-06-16.jpg"
  },
  {
    "id": 430,
    "name": "Bryan",
    "date": "2025-06-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Bryan2025-06-16.jpg"
  },
  {
    "id": 431,
    "name": "Michael",
    "date": "2025-06-16",
    "rating": 5,
    "text": "Great trip, I may just buy this car for my everyday use, if you got 6+ people on a trip and you in Miami i promise this the car, no hassle & great communication",
    "photo": "/reviews/Michael2025-06-16.jpg"
  },
  {
    "id": 432,
    "name": "Omotolani",
    "date": "2025-06-16",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Omotolani2025-06-16.jpg"
  },
  {
    "id": 433,
    "name": "Leigh",
    "date": "2025-06-15",
    "rating": 5,
    "text": "Great car, fun to drive, very clean.",
    "photo": "/reviews/Leigh2025-06-15.jpg"
  },
  {
    "id": 434,
    "name": "Hernan Lucas",
    "date": "2025-06-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/HernanLucas2025-06-15.jpg"
  },
  {
    "id": 435,
    "name": "Jeffrey",
    "date": "2025-06-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jeffrey2025-06-12.jpg"
  },
  {
    "id": 436,
    "name": "Julian",
    "date": "2025-06-11",
    "rating": 5,
    "text": "This Is The Best Experience That I Have had with the Turo app. She was so amazing and helpful with us and I recommend her 100%. The car is incredible in useful for families with Kids You Feel Like You Are driving a Cruise. If we come back to Miami I will book it again for sure",
    "photo": "/reviews/Julian2025-06-11.jpg"
  },
  {
    "id": 437,
    "name": "Steven",
    "date": "2025-06-11",
    "rating": 5,
    "text": "Fantastic host, will use again if the car is available when I got back.",
    "photo": "/reviews/Steven2025-06-11.jpg"
  },
  {
    "id": 438,
    "name": "Martin",
    "date": "2025-06-11",
    "rating": 5,
    "text": "Great car, great host",
    "photo": "/reviews/Martin2025-06-11.jpg"
  },
  {
    "id": 439,
    "name": "Korbinian",
    "date": "2025-06-11",
    "rating": 5,
    "text": "Everything was great, the car was brand new and there were no problems. The rental company was extremely friendly and reliable.",
    "photo": "/reviews/Korbinian2025-06-11.jpg"
  },
  {
    "id": 440,
    "name": "Luis",
    "date": "2025-06-09",
    "rating": 5,
    "text": "Great host the transition was smooth and easy 100% recommended",
    "photo": "/reviews/Luis2025-06-09.jpg"
  },
  {
    "id": 441,
    "name": "Ugur",
    "date": "2025-06-08",
    "rating": 5,
    "text": "Wonderful host",
    "photo": "/reviews/Ugur2025-06-08.jpg"
  },
  {
    "id": 442,
    "name": "Walter",
    "date": "2025-06-08",
    "rating": 5,
    "text": "Excellent experience driving this car, definitely recommend the car and the turo service, and especially Yainery in particular for his attention and prompt response. We hope to return soon and use this vehicle again.",
    "photo": "/reviews/Walter2025-06-08.jpg"
  },
  {
    "id": 443,
    "name": "ALFONZA",
    "date": "2025-06-08",
    "rating": 5,
    "text": "Smooth and seamless experience from start to finish. The vehicle was delivered right on time with clear instructions for pickup, making everything simple and stress free. All around great service. Thank you.",
    "photo": "/reviews/ALFONZA2025-06-08.jpg"
  },
  {
    "id": 444,
    "name": "Jamiere",
    "date": "2025-06-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jamiere2025-06-08.jpg"
  },
  {
    "id": 445,
    "name": "Tomas",
    "date": "2025-06-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Tomas2025-06-08.jpg"
  },
  {
    "id": 446,
    "name": "Kevin",
    "date": "2025-06-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Kevin2025-06-08.jpg"
  },
  {
    "id": 447,
    "name": "Rafael",
    "date": "2025-06-07",
    "rating": 5,
    "text": "Awesome experience, especially the autopilot. Very friendly hosts. Super impressed! Highly recommend 🚀",
    "photo": "/reviews/Rafael2025-06-07.jpg"
  },
  {
    "id": 448,
    "name": "Jonathan",
    "date": "2025-06-04",
    "rating": 5,
    "text": "Host was super nice and helpful, and car was amazing would recommend this host made drop off and pick up super easy",
    "photo": "/reviews/Jonathan2025-06-04.jpg"
  },
  {
    "id": 449,
    "name": "Lucy",
    "date": "2025-06-04",
    "rating": 5,
    "text": "2nd time renting and a 5 star ⭐️ experience in every way again. Very understanding and accommodating host! Cant say enough good things! Also these cars with autopilot are amazing!",
    "photo": "/reviews/Lucy2025-06-04.jpg"
  },
  {
    "id": 450,
    "name": "Максим",
    "date": "2025-06-04",
    "rating": 5,
    "text": "The perfect host with the perfect car",
    "photo": "/reviews/2025-06-04.jpg"
  },
  {
    "id": 451,
    "name": "Cesar",
    "date": "2025-06-03",
    "rating": 5,
    "text": "Yainery was an excellent host, the car was amazing!!! Driving with FSD was like living in the future. Definitely will drive again.",
    "photo": "/reviews/Cesar2025-06-03.jpg"
  },
  {
    "id": 452,
    "name": "Cristian",
    "date": "2025-06-03",
    "rating": 5,
    "text": "everything was awesome, we booked with really short notice, and had no issues, I’d book again",
    "photo": "/reviews/Cristian2025-06-03.jpg"
  },
  {
    "id": 453,
    "name": "Juan",
    "date": "2025-06-02",
    "rating": 5,
    "text": "As usual. Perfect at in perfect conditions",
    "photo": "/reviews/Juan2025-06-02.jpg"
  },
  {
    "id": 454,
    "name": "Sandro",
    "date": "2025-06-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Sandro2025-06-02.jpg"
  },
  {
    "id": 455,
    "name": "Arash",
    "date": "2025-06-02",
    "rating": 5,
    "text": "Amazing car and host!",
    "photo": "/reviews/Arash2025-06-02.jpg"
  },
  {
    "id": 456,
    "name": "CYRIL",
    "date": "2025-06-01",
    "rating": 5,
    "text": "Fantastic host as usual ! Thank you !",
    "photo": "/reviews/CYRIL2025-06-01.jpg"
  },
  {
    "id": 457,
    "name": "Monica",
    "date": "2025-06-01",
    "rating": 5,
    "text": "The car was nice and accommodating the whole group, the host was quick to answer any questions.",
    "photo": "/reviews/Monica2025-06-01.jpg"
  },
  {
    "id": 458,
    "name": "Darya",
    "date": "2025-05-31",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Darya2025-05-31.jpg"
  },
  {
    "id": 459,
    "name": "Paul",
    "date": "2025-05-31",
    "rating": 5,
    "text": "Lovely car beautiful 🤩 I LOVE 💕 IT",
    "photo": "/reviews/Paul2025-05-31.jpg"
  },
  {
    "id": 460,
    "name": "Vladimyr",
    "date": "2025-05-30",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Vladimyr2025-05-30.jpg"
  },
  {
    "id": 461,
    "name": "Louise",
    "date": "2025-05-30",
    "rating": 5,
    "text": "So responsive and helpful!",
    "photo": "/reviews/Louise2025-05-30.jpg"
  },
  {
    "id": 462,
    "name": "M",
    "date": "2025-05-30",
    "rating": 5,
    "text": "Great host, always available and extremely helpful!! Car is amazing!!",
    "photo": "/reviews/M2025-05-30.jpg"
  },
  {
    "id": 463,
    "name": "Jasmine",
    "date": "2025-05-29",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jasmine2025-05-29.jpg"
  },
  {
    "id": 464,
    "name": "Kareem",
    "date": "2025-05-26",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Kareem2025-05-26.jpg"
  },
  {
    "id": 465,
    "name": "Ilan",
    "date": "2025-05-26",
    "rating": 5,
    "text": "Host is highly communicative and reliable. Car was in mind condition.",
    "photo": "/reviews/Ilan2025-05-26.jpg"
  },
  {
    "id": 466,
    "name": "Luis",
    "date": "2025-05-26",
    "rating": 5,
    "text": "Amazing car from a fantastic host!",
    "photo": "/reviews/Luis2025-05-26.jpg"
  },
  {
    "id": 467,
    "name": "Malesa",
    "date": "2025-05-26",
    "rating": 5,
    "text": "Car was very spacious and really big.",
    "photo": "/reviews/Malesa2025-05-26.jpg"
  },
  {
    "id": 468,
    "name": "Richard",
    "date": "2025-05-25",
    "rating": 5,
    "text": "Quick responses and great host. Great car as well!",
    "photo": "/reviews/Richard2025-05-25.jpg"
  },
  {
    "id": 469,
    "name": "Taylor",
    "date": "2025-05-25",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Taylor2025-05-25.jpg"
  },
  {
    "id": 470,
    "name": "YIZHE",
    "date": "2025-05-24",
    "rating": 5,
    "text": "",
    "photo": "/reviews/YIZHE2025-05-24.jpg"
  },
  {
    "id": 471,
    "name": "Kamal",
    "date": "2025-05-24",
    "rating": 5,
    "text": "Amazing Host !\nEverything was easy and smooth.",
    "photo": "/reviews/Kamal2025-05-24.jpg"
  },
  {
    "id": 472,
    "name": "Veronika",
    "date": "2025-05-24",
    "rating": 5,
    "text": "I recently had the pleasure of renting a Tesla Y from Yai, and I can’t say enough about how wonderful the entire experience was. The car itself was absolutely stunning—luxurious, impeccably clean, and exactly as described. It was a real treat to drive and brought a bit of brightness to a stressful time while my own car was being repaired and eventually totaled. Yai was an exceptional host: warm, accommodating, and always quick to reply to any questions or concerns. She made the whole process feel easy and comforting, even as the rental kept extending unexpectedly. Her attention to detail and personal kindness set her apart from anyone I’ve rented from before. I am deeply grateful for her understanding and flexibility. If you’re looking for a truly top-notch rental experience with someone who goes the extra mile, Yai is the perfect choice!",
    "photo": "/reviews/Veronika2025-05-24.jpg"
  },
  {
    "id": 473,
    "name": "Vladimyr",
    "date": "2025-05-24",
    "rating": 5,
    "text": "Great car",
    "photo": "/reviews/Vladimyr2025-05-24.jpg"
  },
  {
    "id": 474,
    "name": "Umut",
    "date": "2025-05-24",
    "rating": 5,
    "text": "Great experience with that car and great host. Thank you",
    "photo": "/reviews/Umut2025-05-24.jpg"
  },
  {
    "id": 475,
    "name": "Lucy",
    "date": "2025-05-23",
    "rating": 5,
    "text": "Amazing host. Excellent car. The self driving is an absolute game changer!",
    "photo": "/reviews/Lucy2025-05-23.jpg"
  },
  {
    "id": 476,
    "name": "Максим",
    "date": "2025-05-21",
    "rating": 5,
    "text": "Great car in perfect condition! Great host always on call answers any even stupid questions! Already rented for my next trip",
    "photo": "/reviews/2025-05-21.jpg"
  },
  {
    "id": 477,
    "name": "Arash",
    "date": "2025-05-20",
    "rating": 5,
    "text": "Great car and host",
    "photo": "/reviews/Arash2025-05-20.jpg"
  },
  {
    "id": 478,
    "name": "Rodenise",
    "date": "2025-05-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rodenise2025-05-20.jpg"
  },
  {
    "id": 479,
    "name": "Thijs",
    "date": "2025-05-20",
    "rating": 5,
    "text": "Yainery was an absolute fenomenal host and the car was great. I asked if I could return the car to a different location than pickup and if pickup could be arranged a little earlier and non of that was any problem. Also, the car is equipped with Full Self Driving, which was very nice to use.",
    "photo": "/reviews/Thijs2025-05-20.jpg"
  },
  {
    "id": 480,
    "name": "Jacob",
    "date": "2025-05-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jacob2025-05-20.jpg"
  },
  {
    "id": 481,
    "name": "Edner",
    "date": "2025-05-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Edner2025-05-20.jpg"
  },
  {
    "id": 482,
    "name": "Stacy",
    "date": "2025-05-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Stacy2025-05-20.jpg"
  },
  {
    "id": 483,
    "name": "Thomas",
    "date": "2025-05-19",
    "rating": 5,
    "text": "Car was clean and in great condition. Host was very attentive and kind. Highly recommend her!",
    "photo": "/reviews/Thomas2025-05-19.jpg"
  },
  {
    "id": 484,
    "name": "Gerardo",
    "date": "2025-05-19",
    "rating": 5,
    "text": "The service and the car were excelent!",
    "photo": "/reviews/Gerardo2025-05-19.jpg"
  },
  {
    "id": 485,
    "name": "Rodrigo",
    "date": "2025-05-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Rodrigo2025-05-19.jpg"
  },
  {
    "id": 486,
    "name": "Jason",
    "date": "2025-05-18",
    "rating": 4,
    "text": "Great vehicle love the FSD feature",
    "photo": "/reviews/Jason2025-05-18.jpg"
  },
  {
    "id": 487,
    "name": "2stroke",
    "date": "2025-05-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/2stroke2025-05-18.jpg"
  },
  {
    "id": 488,
    "name": "Jermaine",
    "date": "2025-05-18",
    "rating": 5,
    "text": "Loved the car thanks",
    "photo": "/reviews/Jermaine2025-05-18.jpg"
  },
  {
    "id": 489,
    "name": "Blake",
    "date": "2025-05-17",
    "rating": 5,
    "text": "Great host. Responded quickly and hospitable.",
    "photo": "/reviews/Blake2025-05-17.jpg"
  },
  {
    "id": 490,
    "name": "Janiece",
    "date": "2025-05-17",
    "rating": 5,
    "text": "This Tesla Model 3 was phenomenal and one of the smoothest cars I’ve ever drove. The host response time was very fast and the pick up & drop off was a breeze. I will definitely book again!",
    "photo": "/reviews/Janiece2025-05-17.jpg"
  },
  {
    "id": 491,
    "name": "Alan",
    "date": "2025-05-14",
    "rating": 5,
    "text": "Everything was great.",
    "photo": "/reviews/Alan2025-05-14.jpg"
  },
  {
    "id": 492,
    "name": "Gerardo",
    "date": "2025-05-14",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Gerardo2025-05-14.jpg"
  },
  {
    "id": 493,
    "name": "Kevin",
    "date": "2025-05-12",
    "rating": 5,
    "text": "Amazing host and super clean vehicle. Above and beyond to answer my questions as a first time user",
    "photo": "/reviews/Kevin2025-05-12.jpg"
  },
  {
    "id": 494,
    "name": "Jess",
    "date": "2025-05-12",
    "rating": 5,
    "text": "Quality was excellent and great communication!",
    "photo": "/reviews/Jess2025-05-12.jpg"
  },
  {
    "id": 495,
    "name": "Jan",
    "date": "2025-05-12",
    "rating": 5,
    "text": "I can’t say enough about this amazing host. Such a professional and organized process. Super responsive and very accommodating. The car was clean and equipped with everything needed to get going. 10/10 great experience.",
    "photo": "/reviews/Jan2025-05-12.jpg"
  },
  {
    "id": 496,
    "name": "Arash",
    "date": "2025-05-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Arash2025-05-12.jpg"
  },
  {
    "id": 497,
    "name": "Maurice",
    "date": "2025-05-10",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Maurice2025-05-10.jpg"
  },
  {
    "id": 498,
    "name": "Michael",
    "date": "2025-05-08",
    "rating": 5,
    "text": "Car was great, communication was professional and prompt. Definitely recommend",
    "photo": "/reviews/Michael2025-05-08.jpg"
  },
  {
    "id": 499,
    "name": "Makyla",
    "date": "2025-05-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Makyla2025-05-08.jpg"
  },
  {
    "id": 500,
    "name": "Shakari",
    "date": "2025-05-08",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Shakari2025-05-08.jpg"
  },
  {
    "id": 501,
    "name": "Frederico",
    "date": "2025-05-06",
    "rating": 5,
    "text": "Perfect",
    "photo": "/reviews/Frederico2025-05-06.jpg"
  },
  {
    "id": 502,
    "name": "Henry",
    "date": "2025-05-06",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Henry2025-05-06.jpg"
  },
  {
    "id": 503,
    "name": "Lorenzo",
    "date": "2025-05-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Lorenzo2025-05-05.jpg"
  },
  {
    "id": 504,
    "name": "Michael",
    "date": "2025-05-05",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Michael2025-05-05.jpg"
  },
  {
    "id": 505,
    "name": "Jhon",
    "date": "2025-05-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Jhon2025-05-04.jpg"
  },
  {
    "id": 506,
    "name": "Angel",
    "date": "2025-05-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Angel2025-05-04.jpg"
  },
  {
    "id": 507,
    "name": "Moises",
    "date": "2025-05-04",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Moises2025-05-04.jpg"
  },
  {
    "id": 508,
    "name": "Ivan",
    "date": "2025-05-02",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Ivan2025-05-02.jpg"
  },
  {
    "id": 509,
    "name": "Daniel",
    "date": "2025-05-01",
    "rating": 5,
    "text": "Car in excellent condition. Host great communication.",
    "photo": "/reviews/Daniel2025-05-01.jpg"
  },
  {
    "id": 510,
    "name": "Hernan",
    "date": "2025-04-30",
    "rating": 5,
    "text": "This car is amazing!!!!!",
    "photo": "/reviews/Hernan2025-04-30.jpg"
  },
  {
    "id": 511,
    "name": "Jason",
    "date": "2025-04-29",
    "rating": 5,
    "text": "Very clean, handled nicely and all features advertised are working perfectly. Honestly very happy at the seamlessness process from day one with both the car and my hosts, highly recommended these folks",
    "photo": "/reviews/Jason2025-04-29.jpg"
  },
  {
    "id": 512,
    "name": "Eissa",
    "date": "2025-04-29",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Eissa2025-04-29.jpg"
  },
  {
    "id": 513,
    "name": "Kevin",
    "date": "2025-04-29",
    "rating": 5,
    "text": "A five-star service from Yainery! She provided invaluable assistance before, during, and after the rental. I will definitely rent again without hesitation.",
    "photo": "/reviews/Kevin2025-04-29.jpg"
  },
  {
    "id": 514,
    "name": "Luis",
    "date": "2025-04-28",
    "rating": 5,
    "text": "Car was in excellent conditions, really enjoyed driving it. Would definitely rent it again!",
    "photo": "/reviews/Luis2025-04-28.jpg"
  },
  {
    "id": 515,
    "name": "Juan",
    "date": "2025-04-27",
    "rating": 5,
    "text": "Perfect! As usual",
    "photo": "/reviews/Juan2025-04-27.jpg"
  },
  {
    "id": 516,
    "name": "Isaac",
    "date": "2025-04-27",
    "rating": 5,
    "text": "Great host",
    "photo": "/reviews/Isaac2025-04-27.jpg"
  },
  {
    "id": 517,
    "name": "Jordyn",
    "date": "2025-04-25",
    "rating": 5,
    "text": "Great, answered all my questions. Super helpful.",
    "photo": "/reviews/Jordyn2025-04-25.jpg"
  },
  {
    "id": 518,
    "name": "Kenthia",
    "date": "2025-04-25",
    "rating": 5,
    "text": "Very helpful and smooth transaction.",
    "photo": "/reviews/Kenthia2025-04-25.jpg"
  },
  {
    "id": 519,
    "name": "Xeuris",
    "date": "2025-04-24",
    "rating": 5,
    "text": "Excellent service!!!",
    "photo": "/reviews/Xeuris2025-04-24.jpg"
  },
  {
    "id": 520,
    "name": "Henry",
    "date": "2025-04-24",
    "rating": 3,
    "text": "Great car and easy experience, car just needs new brakes",
    "photo": "/reviews/Henry2025-04-24.jpg"
  },
  {
    "id": 521,
    "name": "derek",
    "date": "2025-04-23",
    "rating": 5,
    "text": "",
    "photo": "/reviews/derek2025-04-23.jpg"
  },
  {
    "id": 522,
    "name": "Elias",
    "date": "2025-04-22",
    "rating": 5,
    "text": "Great trip.",
    "photo": "/reviews/Elias2025-04-22.jpg"
  },
  {
    "id": 523,
    "name": "Richard",
    "date": "2025-04-21",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Richard2025-04-21.jpg"
  },
  {
    "id": 524,
    "name": "Miguel",
    "date": "2025-04-20",
    "rating": 5,
    "text": "Everything was excellent!",
    "photo": "/reviews/Miguel2025-04-20.jpg"
  },
  {
    "id": 525,
    "name": "D'Avion",
    "date": "2025-04-20",
    "rating": 5,
    "text": "",
    "photo": "/reviews/DAvion2025-04-20.jpg"
  },
  {
    "id": 526,
    "name": "Samantha",
    "date": "2025-04-19",
    "rating": 5,
    "text": "Car was great and parked in a convenient location at the airport for us.",
    "photo": "/reviews/Samantha2025-04-19.jpg"
  },
  {
    "id": 527,
    "name": "Darya",
    "date": "2025-04-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Darya2025-04-19.jpg"
  },
  {
    "id": 528,
    "name": "Javis",
    "date": "2025-04-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Javis2025-04-19.jpg"
  },
  {
    "id": 529,
    "name": "Javis",
    "date": "2025-04-19",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Javis2025-04-19.jpg"
  },
  {
    "id": 530,
    "name": "Licio",
    "date": "2025-04-18",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Licio2025-04-18.jpg"
  },
  {
    "id": 531,
    "name": "Andrey",
    "date": "2025-04-18",
    "rating": 5,
    "text": "Really grateful for the experience! Car is amazing, Yainery is great, always ready to help and really client oriented! Thank you once again!",
    "photo": "/reviews/Andrey2025-04-18.jpg"
  },
  {
    "id": 532,
    "name": "keerthikanth",
    "date": "2025-04-18",
    "rating": 5,
    "text": "She is the best!!! One of those rare host who is always willing to accommodate!!",
    "photo": "/reviews/keerthikanth2025-04-18.jpg"
  },
  {
    "id": 533,
    "name": "Vivian",
    "date": "2025-04-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Vivian2025-04-17.jpg"
  },
  {
    "id": 534,
    "name": "Fernando",
    "date": "2025-04-17",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Fernando2025-04-17.jpg"
  },
  {
    "id": 535,
    "name": "Jacob",
    "date": "2025-04-17",
    "rating": 5,
    "text": "The entire experience was a breeze",
    "photo": "/reviews/Jacob2025-04-17.jpg"
  },
  {
    "id": 536,
    "name": "Duval",
    "date": "2025-04-16",
    "rating": 5,
    "text": "Fantastic car, host was very accommodating! Easy rental, will book again!",
    "photo": "/reviews/Duval2025-04-16.jpg"
  },
  {
    "id": 537,
    "name": "Jon",
    "date": "2025-04-16",
    "rating": 5,
    "text": "I normally don’t give reviews but this was exceptional! The host was so responsive the entire time and even installed a car seat for my son. Car was super clean and smelled great. The host was responsive and accommodating for anything I needed. Great experience",
    "photo": "/reviews/Jon2025-04-16.jpg"
  },
  {
    "id": 538,
    "name": "Florian",
    "date": "2025-04-15",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Florian2025-04-15.jpg"
  },
  {
    "id": 539,
    "name": "Lizbeth",
    "date": "2025-04-15",
    "rating": 5,
    "text": "Incredible service, incredible attention and car was amazing! Definitely renting again. 100% great experience. 👍🏼😁",
    "photo": "/reviews/Lizbeth2025-04-15.jpg"
  },
  {
    "id": 540,
    "name": "Duval",
    "date": "2025-04-14",
    "rating": 5,
    "text": "It was great Car. The host was perfect. Very communicative. Will rent again",
    "photo": "/reviews/Duval2025-04-14.jpg"
  },
  {
    "id": 541,
    "name": "Meeka",
    "date": "2025-04-14",
    "rating": 5,
    "text": "I was so pleased with the vehicle. The host was amazing and flexible. I will be renting again.",
    "photo": "/reviews/Meeka2025-04-14.jpg"
  },
  {
    "id": 542,
    "name": "Crystal",
    "date": "2025-04-14",
    "rating": 5,
    "text": "Great car. Yainery was very responsive and helpful. Would definitely recommend.",
    "photo": "/reviews/Crystal2025-04-14.jpg"
  },
  {
    "id": 543,
    "name": "Thomas",
    "date": "2025-04-13",
    "rating": 5,
    "text": "Great host. Friendly and very helpful.\nBest possible experience.",
    "photo": "/reviews/Thomas2025-04-13.jpg"
  },
  {
    "id": 544,
    "name": "Alex",
    "date": "2025-04-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Alex2025-04-12.jpg"
  },
  {
    "id": 545,
    "name": "Paul",
    "date": "2025-04-12",
    "rating": 5,
    "text": "",
    "photo": "/reviews/Paul2025-04-12.jpg"
  },
  {
    "id": 546,
    "name": "Ashish",
    "date": "2025-04-12",
    "rating": 5,
    "text": "I recently had the pleasure of renting a vehicle from this host, and I must say it was an overwhelmingly positive experience. From start to finish, the host was absolutely awesome – incredibly accommodating, responsive, and a genuine pleasure to communicate with.\n\nFurthermore, the physical condition of the car was impeccable. It was clean, well-maintained, and a joy to drive. It's clear that the host takes great pride in ensuring their vehicle is in top-notch shape for renters.\n\nAll in all, this was a truly great experience, and I will absolutely be booking with this host again without any second thoughts.\n\nMinor Feedback:\n\nThe only minor inconvenience I encountered during my rental was with the software aspect of the car. My Tesla driver profile unfortunately wouldn't activate. While this didn't significantly impact my overall enjoyment, I suspect it might be due to the car's software not being up to the latest version.\n\nThis is just a small piece of feedback for the host to consider – ensuring the Tesla software is up-to-date would undoubtedly provide an even smoother experience for future users.\n\nConclusion:\n\nDespite this very minor software glitch, everything else about this rental was flawless. The exceptional host and the excellent condition of the car far outweighed this small issue. I highly recommend this host and will definitely be a repeat customer!",
    "photo": "/reviews/Ashish2025-04-12.jpg"
  },
  {
    "id": 547,
    "name": "Carlos",
    "date": "2025-04-12",
    "rating": 5,
    "text": "Awesome host",
    "photo": "/reviews/Carlos2025-04-12.jpg"
  }
];

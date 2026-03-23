export interface BikePreset {
  id: string;
  name: string;
  price: number;
  mileage: number;
  maintenance: number;
  brand: string;
  image: string;
  cc: number;
}

export const BIKE_PRESETS: BikePreset[] = [
  {
    id: 're-guerrilla-450',
    name: 'Guerrilla 450',
    brand: 'Royal Enfield',
    price: 239000,
    mileage: 30,
    maintenance: 6000,
    cc: 452,
    image: 'https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/guerrilla-450/landing/motorcycle/guerrilla-450-brava-blue.png',
  },
  {
    id: 'ktm-duke-390',
    name: 'Duke 390',
    brand: 'KTM',
    price: 311000,
    mileage: 25,
    maintenance: 8000,
    cc: 399,
    image: 'https://www.ktm.com/content/dam/ktm/models/naked/2024/ktm-390-duke/ktm-390-duke-orange.png',
  },
  {
    id: 'triumph-speed-400',
    name: 'Speed 400',
    brand: 'Triumph',
    price: 233000,
    mileage: 28,
    maintenance: 5000,
    cc: 398,
    image: 'https://images.triumphmotorcycles.co.uk/media-library/images/motorcycles/modern-classics/speed-400/2024/speed-400-caspian-blue.png',
  },
  {
    id: 'yamaha-r15-v4',
    name: 'R15 V4',
    brand: 'Yamaha',
    price: 182000,
    mileage: 45,
    maintenance: 4000,
    cc: 155,
    image: 'https://www.yamaha-motor-india.com/yamaha-r15v4/images/racing-blue.png',
  },
  {
    id: 'honda-cb350',
    name: 'CB350 H\'ness',
    brand: 'Honda',
    price: 210000,
    mileage: 35,
    maintenance: 4500,
    cc: 348,
    image: 'https://www.hondabigwing.in/Content/images/cb350/cb350-precious-red-metallic.png',
  },
  {
    id: 'bmw-g310r',
    name: 'G 310 R',
    brand: 'BMW',
    price: 290000,
    mileage: 30,
    maintenance: 10000,
    cc: 313,
    image: 'https://www.bmw-motorrad.in/content/dam/bmwmotorradnsc/marketIN/bmw-motorrad-in/motorcycles/roadster/g310r/2024/g310r-limestone-metallic.png',
  },
  {
    id: 'kawasaki-ninja-300',
    name: 'Ninja 300',
    brand: 'Kawasaki',
    price: 343000,
    mileage: 25,
    maintenance: 12000,
    cc: 296,
    image: 'https://www.kawasaki-india.com/wp-content/uploads/2023/05/Ninja-300-Lime-Green.png',
  },
  {
    id: 'tvs-apache-rr310',
    name: 'Apache RR 310',
    brand: 'TVS',
    price: 272000,
    mileage: 30,
    maintenance: 6000,
    cc: 312,
    image: 'https://www.tvsmotor.com/tvs-apache/rr310/images/rr310-racing-red.png',
  }
];

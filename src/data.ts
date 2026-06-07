/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facility, RoomOption, GalleryItem, Testimonial } from './types';

export const FACILITIES: Facility[] = [
  {
    id: 'f1',
    name: 'Fully Furnished Rooms',
    description: 'Each room includes a premium wooden bed, study desk, comfortable chair, and private spacious lockers.',
    iconName: 'Bed',
    isFeatured: true,
  },
  {
    id: 'f2',
    name: 'High-Speed WiFi',
    description: 'Ultra-fast fiber broadband WiFi coverage in all rooms, study lounges, and common dining areas.',
    iconName: 'Wifi',
    isFeatured: true,
  },
  {
    id: 'f3',
    name: 'Attached Bathrooms',
    description: 'Modern, sparkling clean attached washrooms with 24/7 hot/cold running water installed.',
    iconName: 'ShowerHead',
    isFeatured: true,
  },
  {
    id: 'f4',
    name: 'Daily Cleaning',
    description: 'Professional janitorial services for daily corridor sweeping, room cleaning, and waste disposal.',
    iconName: 'Sparkles',
    isFeatured: false,
  },
  {
    id: 'f5',
    name: 'Laundry Service',
    description: 'On-site washing machine setup and affordable laundry/ironing service available for residents.',
    iconName: 'Shirt',
    isFeatured: false,
  },
  {
    id: 'f6',
    name: 'CCTV Security',
    description: 'Double-tier security with continuous high-definition CCTV surveillance and active guards on duty.',
    iconName: 'Shield',
    isFeatured: true,
  },
  {
    id: 'f7',
    name: '24/7 Electricity Backup',
    description: 'Reliable power backup system ensuring uninterrupted study, fans, lights, and WiFi during load shedding.',
    iconName: 'Zap',
    isFeatured: true,
  },
  {
    id: 'f8',
    name: 'Pure Water Supply',
    description: 'Continuous fresh Borewell water supply with high-quality RO purification drinking filters installed.',
    iconName: 'Droplet',
    isFeatured: false,
  },
  {
    id: 'f9',
    name: 'Comfortable Beds',
    description: 'Ortho-support foam mattresses with pillows and fresh linen provided to ensure restful quality sleep.',
    iconName: 'BedDouble',
    isFeatured: false,
  },
  {
    id: 'f10',
    name: 'Study Environment',
    description: 'Dedicated silent reading room with individual desks, bright lighting, and charging sockets for focused preparation.',
    iconName: 'BookOpen',
    isFeatured: true,
  },
  {
    id: 'f11',
    name: 'Parking Area',
    description: 'Spacious secure indoor garage parking exclusively for resident motorbikes and vehicles.',
    iconName: 'SquareParking',
    isFeatured: false,
  },
  {
    id: 'f12',
    name: 'Mess / Food Facility',
    description: 'Delicious twice-daily home-style meals with a diverse and hygiene-vetted menu prepared by professional chefs.',
    iconName: 'Utensils',
    isFeatured: true,
  },
];

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: 'r1',
    name: 'Shared Room (Triple Sharing)',
    tagline: 'Budget Friendly Co-Living',
    description: 'Ideal for students looking for affordability without compromising on cleanliness or quality amenities. Includes individual wardrobes and study desks.',
    image: 'https://images.unsplash.com/photo-1555854877-abab0e564b86?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Ortho-support beds',
      'Shared study desk & chair',
      'High-speed unlimited WiFi',
      'Attached bathroom with geyser',
      'Individual lockers',
      'Water & generator charge list included',
    ],
    priceMonthly: 7500,
    priceDaily: 400,
    capacity: '3 Residents',
    availabilityStatus: 'Available',
  },
  {
    id: 'r2',
    name: 'Double Sharing Room',
    tagline: 'Extra Comfort & Focus Space',
    description: 'A perfect balance of privacy and budget. Offers extra personal study space and a quieter environment, highly recommended for Khushal Khan Khattak University students.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Two separate comfortable single beds',
      'Dedicated dual study desks',
      'Ample natural window light',
      'Attached modern washroom',
      'Spacious double wardrobes',
      'Full generator electricity backup',
    ],
    priceMonthly: 12000,
    priceDaily: 700,
    capacity: '2 Residents',
    availabilityStatus: 'Limited',
  },
  {
    id: 'r3',
    name: 'Private Premium Room',
    tagline: 'Maximum Privacy & Luxury Living',
    description: 'Designed for professionals, university instructors, and students who require absolute silence and comfort. Features a premium design layout and independent balcony view.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Queen-size luxury custom bed',
      'Executive study desk & chair',
      'Private modern attached bathroom',
      'Independent clothing wardrobe',
      'Balcony with premium sky view',
      'Express cleaning priority',
    ],
    priceMonthly: 22000,
    priceDaily: 1200,
    capacity: '1 Resident',
    availabilityStatus: 'Limited',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Rooms',
    title: 'Shared Dorm Room',
    image: 'https://images.unsplash.com/photo-1555854877-abab0e564b86?auto=format&fit=crop&w=800&q=80',
    description: 'Sparkling clean shared room layout showing comfortable wooden bunks and custom ladder systems.',
  },
  {
    id: 'g2',
    category: 'Rooms',
    title: 'Private Room Setup',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    description: 'Independent living quarters equipped with an executive desk, plush bed, and serene decor accents.',
  },
  {
    id: 'g3',
    category: 'Amenities',
    title: 'Dedicated Study Lounge',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'Quiet Study Hall designed to facilitate learning, exams prep, and research with desk sockets.',
  },
  {
    id: 'g4',
    category: 'Dining',
    title: 'Hygienic Mess Hall',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff1443cd?auto=format&fit=crop&w=800&q=80',
    description: 'Clean dining hall where freshly cooked nutritious meals are served twice daily to residents.',
  },
  {
    id: 'g5',
    category: 'Lobby',
    title: 'Modern Reception Entrance',
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
    description: 'Polished foyer greeting visitors, managing safe entries, and answering inquiries.',
  },
  {
    id: 'g6',
    category: 'Amenities',
    title: 'Modern Bathroom Fixtures',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Fully tiled, hygienic attached bathrooms with hot water boilers and premium sanitary layout.',
  },
  {
    id: 'g7',
    category: 'Exterior',
    title: 'Hostel Secure Building Entrance',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful multi-story custom security gate and facade structure near Jail Chowk, Karak.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Bilal Khan',
    role: 'KKKUK Student (BS Computer Science)',
    rating: 5,
    comment: 'Excellent hostel with clean rooms and good management. The study environment in the silent reading lounge is extremely supportive. Jail Chowk location is perfect for university students.',
    date: 'May 12, 2026',
  },
  {
    id: 't2',
    name: 'Usman Shah',
    role: 'Software Engineer & Remote Professional',
    rating: 5,
    comment: 'Having high-speed internet and uninterrupted power backup is crucial for my work. This is the only hostel in Karak offering truly reliable backup electricity and fiber WiFi. Private rooms are highly comfortable.',
    date: 'April 03, 2026',
  },
  {
    id: 't3',
    name: 'Hamza Ali',
    role: 'Civil Services Aspirant',
    rating: 5,
    comment: 'Best hostel near Jail Chowk Karak. Security is highly professional, and the mess serves delicious, clean home-cooked food. The management is very responsive to clean request.',
    date: 'March 28, 2026',
  },
];

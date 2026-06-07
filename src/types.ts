/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string; // From lucide-react names like Wifi, ShieldAlert, etc.
  isFeatured: boolean;
}

export interface RoomOption {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  priceMonthly: number; // in PKR
  priceDaily: number; // in PKR
  capacity: string;
  availabilityStatus: 'Available' | 'Limited' | 'Full';
}

export interface GalleryItem {
  id: string;
  category: 'Rooms' | 'Exterior' | 'Lobby' | 'Amenities' | 'Dining';
  title: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "KKKUK Student", "Software Engineer"
  rating: number; // typically 5
  comment: string;
  date: string;
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  roomType: string;
  checkInDate: string;
  duration: string; // e.g., "3 Months", "1 Semester", etc.
  message: string;
  status: 'Pending' | 'Confirmed' | 'Archived';
  createdAt: string;
}

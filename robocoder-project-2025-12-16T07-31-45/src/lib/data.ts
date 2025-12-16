import { Space, Review } from './types';

export const spaces: Space[] = [
  {
    id: 1,
    name: "The Business Hub",
    description: "A premium coworking space in the heart of BKC with state-of-the-art facilities and stunning city views. Perfect for professionals and growing teams.",
    location: "Bandra Kurla Complex, Mumbai",
    address: "Tower A, BKC Business Center, Bandra East, Mumbai 400051",
    city: "Mumbai",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/59ab13dc-1440-4010-a0b5-ac6d7df1498d.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c6278715-21a9-4a39-8ac6-2af78a87ed79.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5b89fa0c-c463-41da-a1a9-09d3f878446a.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f188b10d-4288-48c2-8066-1a3395617ce3.png"
    ],
    rating: 4.8,
    reviews: 124,
    price: 899,
    type: "Hot Desk",
    capacity: 50,
    amenities: ["High-Speed WiFi", "Coffee Bar", "Parking", "Meeting Rooms", "24/7 Access", "Reception", "Printing", "Air Conditioning"],
    features: ["City Views", "Natural Light", "Modern Furniture", "Sound Proof Rooms"],
    availability: {
      "2024-01-15": { "09:00": true, "10:00": true, "11:00": false, "14:00": true },
      "2024-01-16": { "09:00": true, "10:00": true, "11:00": true, "14:00": true }
    },
    workingHours: { start: "08:00", end: "22:00" },
    featured: true,
    verified: true
  },
  {
    id: 2,
    name: "Creative Studio",
    description: "An inspiring workspace designed for creative professionals with vibrant interiors and collaborative spaces.",
    location: "Andheri West, Mumbai",
    address: "Creative Complex, Andheri West, Mumbai 400058",
    city: "Mumbai",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/258e8d7f-6cdc-484d-8337-cef9d33c2616.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/68594e70-c10f-4a93-847e-f708c7757c06.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/de2f6325-36db-4c74-9d20-a10e72fe820e.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b2694fbd-f34f-4505-9ba4-2ff08d9c4778.png"
    ],
    rating: 4.6,
    reviews: 89,
    price: 1299,
    type: "Private Office",
    capacity: 8,
    amenities: ["24/7 Access", "Printing", "Lounge Area", "Kitchen", "High-Speed WiFi", "Whiteboard", "Projector"],
    features: ["Creative Design", "Flexible Layout", "Artistic Environment", "Collaborative Spaces"],
    availability: {
      "2024-01-15": { "09:00": true, "10:00": false, "11:00": true, "14:00": true },
      "2024-01-16": { "09:00": true, "10:00": true, "11:00": true, "14:00": false }
    },
    workingHours: { start: "24/7", end: "24/7" },
    featured: true,
    verified: true
  },
  {
    id: 3,
    name: "Tech Valley",
    description: "A technology-focused coworking space with high-speed internet, gaming zones, and tech support.",
    location: "Powai, Mumbai",
    address: "Tech Park, Powai, Mumbai 400076",
    city: "Mumbai",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/15955ce8-a18b-401a-87b1-39ab6cdfaac9.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c75dd497-c639-4348-aac9-15491aeda5a8.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d29ca032-6005-4aba-807a-75b7d276a03f.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9469eee5-3532-465d-a753-0b40027654d1.png"
    ],
    rating: 4.9,
    reviews: 156,
    price: 699,
    type: "Hot Desk",
    capacity: 75,
    amenities: ["High-Speed WiFi", "Tech Support", "Gaming Zone", "Cafeteria", "Parking", "Security", "Lockers"],
    features: ["Tech Focus", "Gaming Area", "24/7 Support", "Modern Equipment"],
    availability: {
      "2024-01-15": { "09:00": true, "10:00": true, "11:00": true, "14:00": true },
      "2024-01-16": { "09:00": false, "10:00": true, "11:00": true, "14:00": true }
    },
    workingHours: { start: "06:00", end: "24:00" },
    featured: true,
    verified: true
  },
  {
    id: 4,
    name: "Executive Suites",
    description: "Luxury executive offices with premium amenities, concierge services, and stunning city views.",
    location: "Lower Parel, Mumbai",
    address: "Executive Tower, Lower Parel, Mumbai 400013",
    city: "Mumbai",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e2176e8d-d398-495a-95b1-3c084c4a1f5c.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a1d57e03-4cd7-43ba-a376-f30e35f41cc1.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/603d6c7a-b55f-4f61-8f70-3bdb90540772.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf04bad6-5ae5-42cb-a57b-2b3081ae2efc.png"
    ],
    rating: 4.7,
    reviews: 92,
    price: 2499,
    type: "Private Office",
    capacity: 4,
    amenities: ["Concierge", "Premium Furniture", "City Views", "Reception", "Valet Parking", "Executive Lounge", "Fine Dining"],
    features: ["Luxury Design", "Premium Location", "Executive Services", "Prestigious Address"],
    availability: {
      "2024-01-15": { "09:00": true, "10:00": true, "11:00": true, "14:00": false },
      "2024-01-16": { "09:00": true, "10:00": true, "11:00": false, "14:00": true }
    },
    workingHours: { start: "07:00", end: "21:00" },
    featured: true,
    verified: true
  },
  {
    id: 5,
    name: "Startup Incubator",
    description: "A collaborative space designed for startups with mentorship programs and networking events.",
    location: "Goregaon East, Mumbai",
    address: "Innovation Hub, Goregaon East, Mumbai 400063",
    city: "Mumbai",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a9cc147-770a-43ea-9780-1a468d14b29e.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/af1dc3d8-4864-44eb-8a71-3e4bba80b4b8.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd591f2f-7e70-4ec4-890b-eb135f2da324.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9696fa04-8329-4396-b908-b0fcd2b2c4be.png"
    ],
    rating: 4.5,
    reviews: 67,
    price: 799,
    type: "Hot Desk",
    capacity: 40,
    amenities: ["Mentorship", "Networking Events", "Pitch Room", "High-Speed WiFi", "Coffee", "Phone Booths"],
    features: ["Startup Focus", "Community Events", "Mentorship Programs", "Networking"],
    availability: {
      "2024-01-15": { "09:00": true, "10:00": true, "11:00": true, "14:00": true },
      "2024-01-16": { "09:00": true, "10:00": false, "11:00": true, "14:00": true }
    },
    workingHours: { start: "08:00", end: "20:00" },
    featured: false,
    verified: true
  },
  {
    id: 6,
    name: "Conference Center",
    description: "Professional meeting and conference rooms with advanced AV equipment and catering services.",
    location: "Nariman Point, Mumbai",
    address: "Business Center, Nariman Point, Mumbai 400021",
    city: "Mumbai",
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/95c747b0-bae2-49cc-a160-fda6f6148ab1.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/89407ab0-96cc-40d6-926e-d49c3a0d1fed.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/50d1940d-e6b0-4d3d-af7a-921d2d5897d9.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce8f32de-d515-4776-b011-709c63bbabbc.png"
    ],
    rating: 4.8,
    reviews: 203,
    price: 3999,
    type: "Meeting Room",
    capacity: 50,
    amenities: ["AV Equipment", "Catering", "Video Conferencing", "Whiteboard", "Projector", "Sound System"],
    features: ["Professional Setup", "Large Capacity", "Premium Location", "Full Service"],
    availability: {
      "2024-01-15": { "09:00": false, "10:00": true, "11:00": true, "14:00": true },
      "2024-01-16": { "09:00": true, "10:00": true, "11:00": true, "14:00": false }
    },
    workingHours: { start: "08:00", end: "18:00" },
    featured: false,
    verified: true
  }
];

export const reviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    spaceId: 1,
    rating: 5,
    comment: "Excellent workspace with great amenities. The location is perfect and the staff is very helpful.",
    createdAt: "2024-01-10",
    userName: "Rajesh Kumar",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b6f5bdb5-8c63-4eed-acfe-38fa2c124920.png"
  },
  {
    id: "2",
    userId: "user2",
    spaceId: 1,
    rating: 4,
    comment: "Good facilities and fast internet. Could use more meeting rooms during peak hours.",
    createdAt: "2024-01-08",
    userName: "Priya Sharma",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bde42096-cdaf-4877-a276-814fdd98fde8.png"
  },
  {
    id: "3",
    userId: "user3",
    spaceId: 2,
    rating: 5,
    comment: "Love the creative environment! Perfect for our design team. Highly recommended.",
    createdAt: "2024-01-12",
    userName: "Arjun Patel",
    userAvatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ad46cc89-e9c3-448e-9224-b9e5940c660f.png"
  }
];

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Pune",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad"
];

export const amenitiesList = [
  "High-Speed WiFi",
  "Coffee Bar",
  "Parking",
  "Meeting Rooms",
  "24/7 Access",
  "Reception",
  "Printing",
  "Air Conditioning",
  "Kitchen",
  "Lounge Area",
  "Security",
  "Lockers",
  "Phone Booths",
  "Gaming Zone",
  "Tech Support",
  "Concierge",
  "Valet Parking",
  "City Views",
  "Natural Light",
  "Sound Proof Rooms"
];
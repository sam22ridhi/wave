export const mockVolunteers = [
  { id: 1, name: 'Arjun Patel', points: 2847, level: 'Ocean Guardian', avatar: '👨‍🌾', badges: 15 },
  { id: 2, name: 'Priya Sharma', points: 2456, level: 'Wave Warrior', avatar: '👩‍💼', badges: 12 },
  { id: 3, name: 'Rohit Kumar', points: 2234, level: 'Eco Champion', avatar: '👨‍🔬', badges: 11 },
  { id: 4, name: 'Anita Singh', points: 2156, level: 'Green Guardian', avatar: '👩‍🎨', badges: 10 },
  { id: 5, name: 'Vikram Rao', points: 1987, level: 'Beach Protector', avatar: '👨‍💻', badges: 9 },
  { id: 6, name: 'Meera Gupta', points: 1876, level: 'Tide Turner', avatar: '👩‍⚕️', badges: 8 },
  { id: 7, name: 'Karan Mehta', points: 1654, level: 'Wave Rider', avatar: '👨‍🎓', badges: 7 },
  { id: 8, name: 'Sneha Joshi', points: 1543, level: 'Coral Keeper', avatar: '👩‍🏫', badges: 6 },
  { id: 9, name: 'Rajesh Iyer', points: 1432, level: 'Sea Savior', avatar: '👨‍⚡', badges: 5 },
  { id: 10, name: 'Kavya Nair', points: 1247, level: 'Eco Warrior', avatar: '👩‍🚀', badges: 4 },
];

export const mockEvents = [
  {
    id: 1,
    title: 'Juhu Beach Sunrise Cleanup',
    location: 'Juhu Beach, Mumbai',
    date: '2024-01-15',
    time: '06:00 AM',
    volunteers: 45,
    maxVolunteers: 60,
    organizer: 'Marine Conservation Society',
    description: 'Join us for a beautiful sunrise cleanup at Juhu Beach.',
    difficulty: 'Easy',
    lat: 19.1076,
    lng: 72.8263,
  },
  {
    id: 2,
    title: 'Versova Beach Plastic Drive',
    location: 'Versova Beach, Mumbai',
    date: '2024-01-18',
    time: '07:30 AM',
    volunteers: 32,
    maxVolunteers: 50,
    organizer: 'EcoWarriors Mumbai',
    description: 'Focus on plastic waste collection and segregation.',
    difficulty: 'Medium',
    lat: 19.1317,
    lng: 72.8117,
  },
  {
    id: 3,
    title: 'Chowpatty Conservation Day',
    location: 'Chowpatty Beach, Mumbai',
    date: '2024-01-20',
    time: '08:00 AM',
    volunteers: 28,
    maxVolunteers: 40,
    organizer: 'Green Mumbai Initiative',
    description: 'Community-driven beach restoration project.',
    difficulty: 'Easy',
    lat: 18.9547,
    lng: 72.8156,
  },
];

export const mockAchievements = [
  { id: 1, name: 'First Steps', description: 'Complete your first cleanup', icon: '🏃‍♂️', unlocked: true },
  { id: 2, name: 'Waste Warrior', description: 'Collect 100kg of waste', icon: '⚔️', unlocked: true },
  { id: 3, name: 'Team Player', description: 'Participate in 5 group cleanups', icon: '🤝', unlocked: true },
  { id: 4, name: 'Early Bird', description: 'Join a sunrise cleanup', icon: '🌅', unlocked: false },
  { id: 5, name: 'Plastic Hunter', description: 'Identify 500 plastic items', icon: '🔍', unlocked: false },
  { id: 6, name: 'Ocean Guardian', description: 'Complete 50+ cleanups', icon: '🌊', unlocked: false },
];

export const mockVouchers = [
  { id: 1, amount: 10, vendor: 'Cafe Mocha', type: 'Food', validity: '30 days' },
  { id: 2, amount: 25, vendor: 'EcoStore', type: 'Shopping', validity: '60 days' },
  { id: 3, amount: 50, vendor: 'GreenMart', type: 'Groceries', validity: '45 days' },
];

export const mockWasteTypes = [
  { type: 'Plastic Bottle', points: 15, color: '#ef4444' },
  { type: 'Plastic Bag', points: 10, color: '#f97316' },
  { type: 'Food Wrapper', points: 8, color: '#eab308' },
  { type: 'Cigarette Butt', points: 5, color: '#84cc16' },
  { type: 'Glass Bottle', points: 20, color: '#06b6d4' },
  { type: 'Metal Can', points: 12, color: '#8b5cf6' },
];

export const mockStats = {
  beachesCleaned: 247,
  wasteCollected: 12847,
  volunteersActive: 5623,
  co2Saved: 1847,
};
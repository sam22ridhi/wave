import React, { useState } from 'react';
import { Camera, Heart, Share2, MapPin, Calendar, Users, Award, Filter, Search } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Stories', count: 156 },
    { id: 'before-after', label: 'Before & After', count: 42 },
    { id: 'volunteers', label: 'Volunteers', count: 68 },
    { id: 'wildlife', label: 'Wildlife', count: 23 },
    { id: 'events', label: 'Events', count: 23 }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Juhu Beach Transformation',
      description: 'From plastic-covered shore to pristine beach in just 6 months of dedicated cleanup efforts.',
      category: 'before-after',
      location: 'Juhu Beach, Mumbai',
      date: '2024-01-15',
      photographer: 'Arjun Patel',
      likes: 234,
      volunteers: 45,
      wasteCollected: '2.3 tons',
      image: '🏖️',
      story: 'This incredible transformation shows what dedicated community effort can achieve. Over 200 volunteers participated in weekly cleanups, removing over 2 tons of plastic waste and debris.',
      impact: 'Restored 2km of coastline, protected 15 sea turtle nesting sites'
    },
    {
      id: 2,
      title: 'Young Eco Warriors',
      description: 'School children from Mumbai leading the charge in beach conservation.',
      category: 'volunteers',
      location: 'Versova Beach, Mumbai',
      date: '2024-01-12',
      photographer: 'Priya Sharma',
      likes: 189,
      volunteers: 120,
      wasteCollected: '850 kg',
      image: '👦👧',
      story: 'Students from 5 local schools organized this massive cleanup drive, showing that age is no barrier to environmental action.',
      impact: 'Educated 500+ students, removed 850kg of waste'
    },
    {
      id: 3,
      title: 'Sea Turtle Rescue',
      description: 'Rescued sea turtle found entangled in plastic debris, now safely returned to ocean.',
      category: 'wildlife',
      location: 'Marine Drive, Mumbai',
      date: '2024-01-10',
      photographer: 'Dr. Kavya Nair',
      likes: 456,
      volunteers: 8,
      wasteCollected: '50 kg',
      image: '🐢',
      story: 'Our marine rescue team successfully freed this olive ridley turtle from fishing nets and plastic waste. After rehabilitation, it was released back to the ocean.',
      impact: 'Saved 1 sea turtle, cleared 50kg of marine debris'
    },
    {
      id: 4,
      title: 'Sunrise Cleanup Heroes',
      description: 'Dedicated volunteers starting their day with purpose at 5 AM cleanup drive.',
      category: 'volunteers',
      location: 'Chowpatty Beach, Mumbai',
      date: '2024-01-08',
      photographer: 'Rohit Kumar',
      likes: 167,
      volunteers: 32,
      wasteCollected: '1.2 tons',
      image: '🌅',
      story: 'The dedication of our early morning volunteers is truly inspiring. Rain or shine, they show up to protect our coastline.',
      impact: 'Cleaned 1.5km of beach, inspired 50 new volunteers'
    },
    {
      id: 5,
      title: 'Plastic Monster Defeated',
      description: 'Massive pile of collected plastic waste ready for proper recycling and disposal.',
      category: 'before-after',
      location: 'Bandra Bandstand, Mumbai',
      date: '2024-01-05',
      photographer: 'Meera Gupta',
      likes: 298,
      volunteers: 67,
      wasteCollected: '3.1 tons',
      image: '♻️',
      story: 'This mountain of plastic represents just one day\'s collection from our largest cleanup event. Every bottle, bag, and wrapper was properly sorted for recycling.',
      impact: 'Recycled 3.1 tons of plastic, prevented ocean pollution'
    },
    {
      id: 6,
      title: 'Community Unity',
      description: 'Families, students, and professionals united for a common cause.',
      category: 'events',
      location: 'Worli Sea Face, Mumbai',
      date: '2024-01-03',
      photographer: 'Anita Singh',
      likes: 203,
      volunteers: 89,
      wasteCollected: '1.8 tons',
      image: '🤝',
      story: 'This event brought together people from all walks of life, proving that environmental protection is everyone\'s responsibility.',
      impact: 'United 89 volunteers, cleaned 2km coastline'
    },
    {
      id: 7,
      title: 'Mangrove Restoration',
      description: 'Planting native mangroves to restore coastal ecosystem and prevent erosion.',
      category: 'wildlife',
      location: 'Mahim Creek, Mumbai',
      date: '2024-01-01',
      photographer: 'Vikram Rao',
      likes: 145,
      volunteers: 25,
      wasteCollected: '500 kg',
      image: '🌱',
      story: 'Beyond cleanup, we\'re actively restoring coastal ecosystems. These mangroves will protect the shore and provide habitat for marine life.',
      impact: 'Planted 200 mangroves, restored 0.5km of coastline'
    },
    {
      id: 8,
      title: 'Technology Meets Conservation',
      description: 'Using AI-powered waste detection to make cleanup efforts more efficient.',
      category: 'events',
      location: 'Aksa Beach, Mumbai',
      date: '2023-12-28',
      photographer: 'Sneha Joshi',
      likes: 312,
      volunteers: 54,
      wasteCollected: '2.2 tons',
      image: '📱',
      story: 'Our innovative approach combines traditional cleanup methods with cutting-edge technology for maximum impact.',
      impact: 'Tested AI detection, improved efficiency by 40%'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Impact Gallery</h1>
        <p className="text-indigo-100 text-lg">Witness the transformation through powerful stories and stunning visuals</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories, locations, or photographers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Filter by:</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">{item.image}</span>
              </div>
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.likes}</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {item.category.replace('-', ' ')}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {item.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {item.date}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {item.volunteers} volunteers
                  </div>
                  <div className="flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    {item.wasteCollected}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
              >
                ×
              </button>

              {/* Image */}
              <div className="h-64 md:h-96 bg-gradient-to-br from-indigo-400 to-purple-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl md:text-9xl">{selectedImage.image}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedImage.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedImage.description}</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <button className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span>{selectedImage.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Story */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">The Story</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedImage.story}</p>
                </div>

                {/* Impact */}
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Environmental Impact</h3>
                  <p className="text-green-700 dark:text-green-300">{selectedImage.impact}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <MapPin className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedImage.location}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Date</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedImage.date}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Users className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Volunteers</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedImage.volunteers}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Award className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Waste Collected</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{selectedImage.wasteCollected}</p>
                  </div>
                </div>

                {/* Photographer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <Camera className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Photo by <span className="font-medium text-gray-900 dark:text-white">{selectedImage.photographer}</span>
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Join Similar Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Community Impact in Numbers
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Stories Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2.4K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Volunteers Featured</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">47</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Beaches Documented</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">89K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
          </div>
        </div>
      </div>
    </div>
  );
}
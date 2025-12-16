"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Mumbai");

  // Featured spaces data
  const featuredSpaces = [
    {
      id: 1,
      name: "The Business Hub",
      location: "Bandra Kurla Complex, Mumbai",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7c9edce0-278e-467d-a939-c05c58b851d2.png",
      rating: 4.8,
      reviews: 124,
      price: 899,
      type: "Hot Desk",
      amenities: ["High-Speed WiFi", "Coffee Bar", "Parking", "Meeting Rooms"],
      featured: true
    },
    {
      id: 2,
      name: "Creative Studio",
      location: "Andheri West, Mumbai",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/58fa6107-35dd-432f-9a00-b2ae4d918256.png",
      rating: 4.6,
      reviews: 89,
      price: 1299,
      type: "Private Office",
      amenities: ["24/7 Access", "Printing", "Lounge Area", "Kitchen"],
      featured: true
    },
    {
      id: 3,
      name: "Tech Valley",
      location: "Powai, Mumbai",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/048d177a-7591-4d4c-a664-6c4a2749d2b6.png",
      rating: 4.9,
      reviews: 156,
      price: 699,
      type: "Hot Desk",
      amenities: ["High-Speed WiFi", "Tech Support", "Gaming Zone", "Cafeteria"],
      featured: true
    },
    {
      id: 4,
      name: "Executive Suites",
      location: "Lower Parel, Mumbai",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/18f19a45-98dd-4ca6-b2e6-c94040c77b77.png",
      rating: 4.7,
      reviews: 92,
      price: 2499,
      type: "Private Office",
      amenities: ["Concierge", "Premium Furniture", "City Views", "Reception"],
      featured: true
    }
  ];

  const categories = [
    {
      name: "Hot Desks",
      description: "Flexible seating in shared spaces",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/89474c9f-629a-4291-a8d2-280aea52d8eb.png",
      count: "500+ spaces"
    },
    {
      name: "Private Offices",
      description: "Dedicated offices for teams",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/965d53b1-f8ac-4747-a9ef-6e4537c3f002.png",
      count: "200+ spaces"
    },
    {
      name: "Meeting Rooms",
      description: "Professional meeting spaces",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7d721356-3ba2-4c49-a968-da638151a6ce.png",
      count: "150+ rooms"
    },
    {
      name: "Event Spaces",
      description: "Large venues for events",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bfc2cc0b-c6e8-4933-abcc-45e001ea7a55.png",
      count: "50+ venues"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-blue-600 block">Workspace</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover premium coworking spaces, private offices, and meeting rooms. 
              Book flexible workspaces that inspire productivity and collaboration.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for spaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 h-12 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
                <Button size="lg" className="h-12 text-lg">
                  Search Spaces
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1000+</div>
                <div className="text-gray-600">Workspaces</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Workspace Type
            </h2>
            <p className="text-lg text-gray-600">
              From hot desks to private offices, find the perfect space for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Workspaces
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked premium spaces in prime locations
              </p>
            </div>
            <Link href="/spaces">
              <Button variant="outline" size="lg">
                View All Spaces
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSpaces.map((space) => (
              <Card key={space.id} className="group hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600">
                        {space.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 rounded-full p-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{space.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {space.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{space.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {space.amenities.slice(0, 2).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {space.amenities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{space.amenities.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{space.price}
                        </span>
                        <span className="text-gray-600 text-sm">/day</span>
                      </div>
                      <Button size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Workspace?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their ideal workspace. 
            Start your search today and boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse All Spaces
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              List Your Space
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Star, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { spaces, cities, amenitiesList } from "@/lib/data";
import { Space, SearchFilters } from "@/lib/types";

export default function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: "Mumbai",
    spaceType: [],
    priceRange: { min: 0, max: 5000 },
    amenities: [],
    capacity: 1
  });

  // Filter and sort spaces
  const filteredSpaces = useMemo(() => {
    let filtered = spaces.filter(space => {
      // Location filter
      if (filters.location !== "all" && space.city !== filters.location) {
        return false;
      }

      // Search query
      if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !space.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Space type filter
      if (filters.spaceType.length > 0 && !filters.spaceType.includes(space.type)) {
        return false;
      }

      // Price range filter
      if (space.price < filters.priceRange.min || space.price > filters.priceRange.max) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          space.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Capacity filter
      if (space.capacity < filters.capacity) {
        return false;
      }

      return true;
    });

    // Sort spaces
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleSpaceTypeChange = (spaceType: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      spaceType: checked 
        ? [...prev.spaceType, spaceType]
        : prev.spaceType.filter(type => type !== spaceType)
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "Mumbai",
      spaceType: [],
      priceRange: { min: 0, max: 5000 },
      amenities: [],
      capacity: 1
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Workspace</h1>
              <p className="text-gray-600 mt-1">
                {filteredSpaces.length} spaces available in {selectedCity}
              </p>
            </div>
            
            {/* Search and Location */}
            <div className="flex flex-col sm:flex-row gap-4 lg:max-w-2xl lg:flex-1 lg:mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search spaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full sm:w-48">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-6`}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Space Type */}
              <div className="space-y-4">
                <h4 className="font-medium">Space Type</h4>
                {["Hot Desk", "Private Office", "Meeting Room", "Event Space"].map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.spaceType.includes(type)}
                      onCheckedChange={(checked) => handleSpaceTypeChange(type, checked as boolean)}
                    />
                    <label htmlFor={type} className="text-sm">{type}</label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-medium">Price Range (per day)</h4>
                <div className="px-2">
                  <Slider
                    value={[filters.priceRange.min, filters.priceRange.max]}
                    onValueChange={([min, max]) => setFilters(prev => ({
                      ...prev,
                      priceRange: { min, max }
                    }))}
                    max={5000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹{filters.priceRange.min}</span>
                    <span>₹{filters.priceRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-4">
                <h4 className="font-medium">Minimum Capacity</h4>
                <Select 
                  value={filters.capacity.toString()} 
                  onValueChange={(value) => setFilters(prev => ({
                    ...prev,
                    capacity: parseInt(value)
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="5">5+ people</SelectItem>
                    <SelectItem value="10">10+ people</SelectItem>
                    <SelectItem value="20">20+ people</SelectItem>
                    <SelectItem value="50">50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h4 className="font-medium">Amenities</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {amenitiesList.slice(0, 10).map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <label htmlFor={amenity} className="text-sm">{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Spaces Grid/List */}
          <div className="flex-1">
            {filteredSpaces.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <SlidersHorizontal className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {filteredSpaces.map(space => (
                  <SpaceCard key={space.id} space={space} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpaceCard({ space, viewMode }: { space: Space; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-80 h-48 relative overflow-hidden">
            <img
              src={space.images[0]}
              alt={space.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600">{space.type}</Badge>
            </div>
            {space.featured && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">Featured</Badge>
              </div>
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{space.name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{space.rating}</span>
                <span className="text-gray-600">({space.reviews})</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{space.location}</span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{space.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {space.amenities.slice(0, 4).map(amenity => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {space.amenities.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{space.amenities.length - 4} more
                </Badge>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-gray-900">₹{space.price}</span>
                <span className="text-gray-600">/day</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/spaces/${space.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Link href={`/booking/${space.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={space.images[0]}
            alt={space.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-600">{space.type}</Badge>
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 rounded-full p-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{space.rating}</span>
              </div>
            </div>
          </div>
          {space.featured && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary">Featured</Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{space.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{space.location}</span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{space.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {space.amenities.slice(0, 2).map(amenity => (
              <Badge key={amenity} variant="outline" className="text-xs">
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
              <span className="text-xl font-bold text-gray-900">₹{space.price}</span>
              <span className="text-gray-600 text-sm">/day</span>
            </div>
            <div className="flex gap-2">
              <Link href={`/spaces/${space.id}`}>
                <Button variant="outline" size="sm">View</Button>
              </Link>
              <Link href={`/booking/${space.id}`}>
                <Button size="sm">Book</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
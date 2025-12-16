"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Shield, 
  Phone, 
  Mail,
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  CheckCircle
} from "lucide-react";
import { spaces, reviews } from "@/lib/data";

export default function SpaceDetailPage() {
  const params = useParams();
  const spaceId = parseInt(params.id as string);
  const space = spaces.find(s => s.id === spaceId);
  const spaceReviews = reviews.filter(r => r.spaceId === spaceId);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Space Not Found</h1>
          <p className="text-gray-600 mb-6">The workspace you're looking for doesn't exist.</p>
          <Link href="/spaces">
            <Button>Browse All Spaces</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/spaces" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Spaces
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={space.images[selectedImageIndex]}
                  alt={space.name}
                  className="w-full h-96 object-cover"
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
              
              {space.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {space.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative overflow-hidden rounded-lg ${
                        selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${space.name} ${index + 1}`}
                        className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Space Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{space.name}</h1>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{space.rating}</span>
                    <span className="text-gray-600">({space.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{space.location}</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{space.description}</p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-gray-600">Capacity</div>
                  <div className="font-semibold">{space.capacity} people</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-gray-600">Hours</div>
                  <div className="font-semibold">{space.workingHours.start} - {space.workingHours.end}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-gray-600">Verified</div>
                  <div className="font-semibold">{space.verified ? 'Yes' : 'No'}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Star className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="font-semibold">{space.rating}/5</div>
                </div>
              </div>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {space.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  {space.features.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <h4 className="font-medium mb-3">Special Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {space.features.map((feature, index) => (
                          <Badge key={index} variant="outline">{feature}</Badge>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location & Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Address</h4>
                    <p className="text-gray-600">{space.address}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">info@workspace.com</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">Interactive map would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              {spaceReviews.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews ({spaceReviews.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {spaceReviews.map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={review.userAvatar} />
                            <AvatarFallback>{review.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <Separator />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">₹{space.price}</div>
                      <div className="text-gray-600">per day</div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Quick Booking</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Today</Button>
                      <Button variant="outline" size="sm">Tomorrow</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Link href={`/booking/${space.id}`}>
                      <Button className="w-full" size="lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book This Space
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      Schedule a Tour
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base price</span>
                      <span>₹{space.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span>₹{Math.round(space.price * 0.1)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total (1 day)</span>
                      <span>₹{space.price + Math.round(space.price * 0.1)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    Free cancellation up to 24 hours before booking
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">support@workspace.com</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
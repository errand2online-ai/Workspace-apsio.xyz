"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Star, 
  Heart, 
  Settings, 
  CreditCard,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import { spaces } from "@/lib/data";
import { Booking } from "@/lib/types";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('booking') === 'success') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  // Mock user data
  const user = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    company: "Tech Solutions Pvt Ltd",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d5a7ddc0-0fec-436d-b3c1-282393791ac0.png",
    memberSince: "January 2024"
  };

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: "BK001",
      userId: "user1",
      spaceId: 1,
      date: "2024-01-20",
      startTime: "09:00",
      endTime: "17:00",
      duration: 8,
      totalCost: 7992,
      status: "confirmed",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      additionalServices: ["catering", "av"],
      notes: "Team meeting and presentation"
    },
    {
      id: "BK002",
      userId: "user1",
      spaceId: 3,
      date: "2024-01-25",
      startTime: "10:00",
      endTime: "15:00",
      duration: 5,
      totalCost: 3845,
      status: "pending",
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16"
    },
    {
      id: "BK003",
      userId: "user1",
      spaceId: 2,
      date: "2024-01-10",
      startTime: "14:00",
      endTime: "18:00",
      duration: 4,
      totalCost: 5716,
      status: "completed",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-10"
    }
  ];

  // Mock favorite spaces
  const favoriteSpaces = [spaces[0], spaces[2], spaces[3]];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Booking confirmed successfully! You'll receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Member since {user.memberSince}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Link href="/spaces">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{favoriteSpaces.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{bookings.reduce((sum, b) => sum + b.totalCost, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const space = spaces.find(s => s.id === booking.spaceId);
                    if (!space) return null;

                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <img
                            src={space.images[0]}
                            alt={space.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{space.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {space.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {booking.date} • {booking.startTime} - {booking.endTime}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(booking.status)}
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-lg font-semibold text-gray-900">₹{booking.totalCost.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Booking #{booking.id}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteSpaces.map((space) => (
                    <div key={space.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={space.images[0]}
                        alt={space.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{space.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {space.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{space.rating}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">₹{space.price}</span>
                            <span className="text-sm text-gray-600">/day</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Link href={`/spaces/${space.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">View</Button>
                          </Link>
                          <Link href={`/booking/${space.id}`} className="flex-1">
                            <Button size="sm" className="w-full">Book</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Company</label>
                    <p className="text-gray-900">{user.company}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive booking confirmations and updates</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-gray-600">Manage your saved payment methods</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Privacy Settings</p>
                      <p className="text-sm text-gray-600">Control your data and privacy preferences</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Clock, 
  MapPin,
  Star,
  AlertCircle
} from "lucide-react";
import { spaces } from "@/lib/data";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const spaceId = parseInt(params.id as string);
  const space = spaces.find(s => s.id === spaceId);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Space Not Found</h1>
          <p className="text-gray-600 mb-6">The workspace you're trying to book doesn't exist.</p>
          <Link href="/spaces">
            <Button>Browse All Spaces</Button>
          </Link>
        </div>
      </div>
    );
  }

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  const additionalServicesList = [
    { id: "catering", name: "Catering Service", price: 500 },
    { id: "av", name: "AV Equipment", price: 300 },
    { id: "parking", name: "Reserved Parking", price: 200 },
    { id: "reception", name: "Reception Service", price: 400 },
    { id: "cleaning", name: "Post-Event Cleaning", price: 250 }
  ];

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const calculateTotal = () => {
    const duration = calculateDuration();
    const basePrice = space.price * duration;
    const servicesPrice = additionalServices.reduce((total, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    const serviceFee = (basePrice + servicesPrice) * 0.1;
    return basePrice + servicesPrice + serviceFee;
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setAdditionalServices(prev => 
      checked 
        ? [...prev, serviceId]
        : prev.filter(id => id !== serviceId)
    );
  };

  const handleBooking = async () => {
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard?booking=success');
    }, 2000);
  };

  const isFormValid = () => {
    return selectedDate && startTime && endTime && 
           contactInfo.name && contactInfo.email && contactInfo.phone;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/spaces/${space.id}`} className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {space.name}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                    {step === 1 ? 'Date & Time' : step === 2 ? 'Details' : 'Payment'}
                  </span>
                  {step < 3 && <div className="w-8 h-px bg-gray-300 ml-4" />}
                </div>
              ))}
            </div>

            {/* Step 1: Date & Time Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Choose Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="start-time" className="text-base font-medium">Start Time</Label>
                        <Select value={startTime} onValueChange={setStartTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="end-time" className="text-base font-medium">End Time</Label>
                        <Select value={endTime} onValueChange={setEndTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select end time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="attendees" className="text-base font-medium">Number of Attendees</Label>
                        <Select value={attendees.toString()} onValueChange={(value) => setAttendees(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: space.capacity }, (_, i) => i + 1).map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'person' : 'people'}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {calculateDuration() > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">
                              Duration: {calculateDuration()} hours
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedDate || !startTime || !endTime}
                    >
                      Continue to Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Additional Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          value={contactInfo.company}
                          onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {additionalServicesList.map(service => (
                      <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={service.id}
                            checked={additionalServices.includes(service.id)}
                            onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                          />
                          <label htmlFor={service.id} className="font-medium">{service.name}</label>
                        </div>
                        <span className="text-sm font-medium">₹{service.price}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Special Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or notes for your booking..."
                      rows={4}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">
                        Demo Mode: Payment processing is simulated
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        defaultValue="4111 1111 1111 1111"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          defaultValue="12/25"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          defaultValue="123"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardholder">Cardholder Name</Label>
                      <Input
                        id="cardholder"
                        placeholder="John Doe"
                        defaultValue={contactInfo.name}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button 
                      onClick={handleBooking}
                      disabled={!isFormValid() || isLoading}
                      className="min-w-32"
                    >
                      {isLoading ? "Processing..." : "Complete Booking"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Space Info */}
                  <div className="flex space-x-3">
                    <img
                      src={space.images[0]}
                      alt={space.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{space.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {space.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {space.rating} ({space.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Booking Details */}
                  <div className="space-y-2 text-sm">
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span>{selectedDate.toLocaleDateString()}</span>
                      </div>
                    )}
                    {startTime && endTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span>{startTime} - {endTime}</span>
                      </div>
                    )}
                    {calculateDuration() > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span>{calculateDuration()} hours</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendees</span>
                      <span>{attendees} {attendees === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base price ({calculateDuration()}h)</span>
                      <span>₹{(space.price * calculateDuration()).toFixed(0)}</span>
                    </div>
                    
                    {additionalServices.length > 0 && (
                      <>
                        {additionalServices.map(serviceId => {
                          const service = additionalServicesList.find(s => s.id === serviceId);
                          return service ? (
                            <div key={serviceId} className="flex justify-between">
                              <span className="text-gray-600">{service.name}</span>
                              <span>₹{service.price}</span>
                            </div>
                          ) : null;
                        })}
                      </>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span>₹{(calculateTotal() * 0.1 / 1.1).toFixed(0)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>₹{calculateTotal().toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center mt-4">
                    Free cancellation up to 24 hours before booking
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
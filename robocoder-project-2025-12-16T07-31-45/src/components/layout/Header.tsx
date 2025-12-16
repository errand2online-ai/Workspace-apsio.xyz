"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MapPin, Menu, User, Heart, Calendar } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WorkSpace</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for coworking spaces..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
              <MapPin className="w-4 h-4" />
              <span>Mumbai</span>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/spaces" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse Spaces
            </Link>
            <Link href="/meeting-rooms" className="text-gray-700 hover:text-blue-600 font-medium">
              Meeting Rooms
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">
              Events
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Favorites - Hidden on mobile */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Calendar className="w-4 h-4 mr-2" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="w-4 h-4 mr-2" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search spaces..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              
              {/* Mobile Navigation */}
              <div className="space-y-2">
                <Link href="/spaces" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Browse Spaces
                </Link>
                <Link href="/meeting-rooms" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Meeting Rooms
                </Link>
                <Link href="/events" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Events
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
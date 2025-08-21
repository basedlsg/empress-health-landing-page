"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Crown, Star, Globe, TrendingUp, Stethoscope, Facebook, Instagram, Mail } from 'lucide-react';

export default function HomePage() {
  const handleGetStarted = () => {
    window.location.href = '/survey';
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Crown className="h-8 w-8 text-purple-700" />
                <Star className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-purple-700">Empress Health</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-700">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-700">Services</a>
              <a href="#" className="text-gray-700 hover:text-purple-700">About us</a>
              <a href="#" className="text-gray-700 hover:text-purple-700">Find Doctors</a>
              <a href="#" className="text-gray-700 hover:text-purple-700">Products</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex space-x-4">
              <Button onClick={handleGetStarted} className="bg-purple-700 hover:bg-purple-800">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-purple-700 mb-6">
                Where Menopause Meets Care That Listens
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Empress Health is where AI meets empathy, connecting women in menopause with trusted experts, uplifting affirmations, and personalized wellness care.
              </p>
              <div className="flex space-x-4">
                <Button onClick={handleGetStarted} size="lg" className="bg-purple-700 hover:bg-purple-800">
                  Get started
                </Button>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="bg-gradient-to-br from-purple-100 to-yellow-100 rounded-2xl p-8 text-center">
              <div className="w-full h-80 bg-gradient-to-br from-purple-200 to-yellow-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700 mb-2">Where Menopause Meets Care That Listens</div>
                  <div className="text-purple-600">Empress Health. Smarter care for menopause, built on empathy and designed for you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-3">About us</h3>
                <p className="text-gray-600">AI-powered wellness, delivered with empathy for women in menopause</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-3">Features</h3>
                <p className="text-gray-600">Empress Health: AI-powered care and support for every stage of menopause</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-3">Why Empress Health</h3>
                <p className="text-gray-600">Empress Health is an AI platform offering personalized care, expert support, and affirmations to guide women through menopause</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-8">
            Smart technology, compassionate support for every woman's menopause journey
          </h2>
          <Button onClick={handleGetStarted} size="lg" className="bg-purple-700 hover:bg-purple-800">
            Get started
          </Button>
        </div>
      </section>

      {/* Backed by Experts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 mb-2">Backed by experts</p>
            <h2 className="text-4xl font-bold text-purple-700">Smart care, compassionate support.</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Feature Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-purple-700 mb-2">Trusted guidance</h3>
                  <p className="text-sm text-gray-600">Confidence in managing menopause with Empress Health</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-purple-700 mb-2">Smarter support</h3>
                  <p className="text-sm text-gray-600">Daily affirmations, less guesswork</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-purple-700 mb-2">Tailored to you</h3>
                  <p className="text-sm text-gray-600">Guiding you with personalized care and affirmations</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-purple-700 mb-2">Confidence boost</h3>
                  <p className="text-sm text-gray-600">Feel more supported in just 2 weeks of AI-guided care</p>
                </CardContent>
              </Card>
            </div>

            {/* Right - Image Placeholder */}
            <div className="bg-gradient-to-br from-purple-100 to-yellow-100 rounded-2xl p-8">
              <div className="w-full h-80 bg-gradient-to-br from-purple-200 to-yellow-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-purple-700">
                  <div className="text-2xl font-bold mb-2">Empowering Women</div>
                  <div className="text-lg">Through Every Stage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lower CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">
            Ready for AI-powered support made for you?
          </h2>
          <p className="text-xl text-gray-600 mb-8">Personalized care, guided by AI</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
              <Globe className="h-4 w-4 text-purple-700" />
              <span className="text-purple-700 text-sm">Global support for women</span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
              <TrendingUp className="h-4 w-4 text-yellow-700" />
              <span className="text-yellow-700 text-sm">Real-time insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Stethoscope className="h-4 w-4 text-yellow-700" />
              <span className="text-yellow-700 text-sm">Expert-backed AI</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-700 px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-white" />
              <span className="text-white text-sm">Rated 4.9/5</span>
            </div>
          </div>

          <Button onClick={handleGetStarted} size="lg" className="bg-purple-700 hover:bg-purple-800">
            Get started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Navigation Columns */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-700">Our Mission</a></li>
                <li><a href="#" className="hover:text-purple-700">How It Works</a></li>
                <li><a href="#" className="hover:text-purple-700">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-700">Onboarding Process</a></li>
                <li><a href="#" className="hover:text-purple-700">Wellness Features</a></li>
                <li><a href="#" className="hover:text-purple-700">Resources & Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-700">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-700">Terms of Use</a></li>
                <li><a href="#" className="hover:text-purple-700">Contact</a></li>
                <li><a href="#" className="hover:text-purple-700">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-700">Facebook</a></li>
                <li><a href="#" className="hover:text-purple-700">Instagram</a></li>
                <li><a href="#" className="hover:text-purple-700">Newsletter</a></li>
                <li><a href="#" className="hover:text-purple-700">Career</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Empresshealth AI</h3>
              <p className="text-gray-600 mb-4">Subscribe to our letter to receive our latest offers</p>
              <div className="flex space-x-2">
                <Input placeholder="Enter your Email" className="flex-1" />
                <Button className="bg-purple-700 hover:bg-purple-800">Subscribe</Button>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox id="privacy" />
                <Label htmlFor="privacy" className="text-xs text-gray-500">
                  I agree to Osisipages privacy and cookie policy. You can unsubscribe from newsletter at anytime
                </Label>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Crown className="h-8 w-8 text-purple-700" />
              <span className="text-xl font-bold text-purple-700">Empress Health</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-purple-700">Accept the legal terms</a>
              <a href="#" className="hover:text-purple-700">Accessibility</a>
              <a href="#" className="hover:text-purple-700">Cookies</a>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 Empress Health. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
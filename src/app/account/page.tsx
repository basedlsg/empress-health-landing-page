"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AccountPage() {
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this data from Firestore
    setStreak(5);
    setPoints(150);
    setBadges(['First Check-in', 'Community Starter']);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Your Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{streak} days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{points}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
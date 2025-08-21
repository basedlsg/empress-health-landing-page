"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const specialties = [
  'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Psychiatry', 'Urology'
];

export default function DoctorsPage() {
  const [email, setEmail] = useState('');

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd save this to a 'waitlistDoctors' collection in Firestore
      alert(`Thank you! We will notify you at ${email} when the directory is live.`);
      setEmail('');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Doctors Directory (Coming Soon)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty) => (
            <Card key={specialty}>
              <CardHeader>
                <CardTitle>{specialty}</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Notify Me</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Get Notified</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleNotify} className="space-y-4">
                      <p>Be the first to know when we launch the {specialty} directory.</p>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button type="submit">Notify Me</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
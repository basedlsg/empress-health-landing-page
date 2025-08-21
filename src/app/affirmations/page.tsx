"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TimePicker } from '@/components/ui/time-picker';

export default function AffirmationsPage() {
  const [times, setTimes] = useState<Date[]>([]);
  const [tone, setTone] = useState<'calm' | 'confident'>('calm');
  const [categories, setCategories] = useState<string[]>([]);

  const handleSchedule = async () => {
    const response = await fetch('/api/affirmations/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        times: times.map((time) => time.toTimeString().slice(0, 5)),
        tone,
        categories,
      }),
    });

    if (response.ok) {
      alert('Affirmations scheduled successfully!');
    } else {
      alert('Failed to schedule affirmations. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Schedule Your Affirmations</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Choose Your Times</h2>
            <TimePicker value={times} onChange={setTimes} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Choose Your Tone</h2>
            <RadioGroup value={tone} onValueChange={(value: 'calm' | 'confident') => setTone(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="calm" id="calm" />
                <Label htmlFor="calm">Calm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confident" id="confident" />
                <Label htmlFor="confident">Confident</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Choose Your Categories</h2>
            <div className="space-y-2">
              {['Self-Love', 'Body Positivity', 'Resilience', 'Gratitude'].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={categories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCategories([...categories, category]);
                      } else {
                        setCategories(categories.filter((c) => c !== category));
                      }
                    }}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleSchedule}>Schedule Affirmations</Button>
        </div>
      </div>
    </main>
  );
}
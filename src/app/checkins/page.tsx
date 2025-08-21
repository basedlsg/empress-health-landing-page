"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function CheckinsPage() {
  const [hotFlashes, setHotFlashes] = useState({ count: 0, severity: 1 });
  const [sleep, setSleep] = useState(3);
  const [mood, setMood] = useState(3);
  const [adherence, setAdherence] = useState(false);
  const [note, setNote] = useState('');

  const handleCheckin = async () => {
    const response = await fetch('/api/checkins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hotFlashes,
        sleep,
        mood,
        adherence,
        note,
      }),
    });

    if (response.ok) {
      alert('Check-in saved successfully!');
    } else {
      alert('Failed to save check-in. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Weekly Check-in</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Hot Flashes</h2>
            <div className="space-y-4">
              <div>
                <Label>Count: {hotFlashes.count}</Label>
                <Slider
                  value={[hotFlashes.count]}
                  onValueChange={([value]) => setHotFlashes({ ...hotFlashes, count: value })}
                  max={10}
                  step={1}
                />
              </div>
              <div>
                <Label>Severity</Label>
                <RadioGroup
                  value={String(hotFlashes.severity)}
                  onValueChange={(value) => setHotFlashes({ ...hotFlashes, severity: Number(value) as 1 | 2 | 3 })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="severity-1" />
                    <Label htmlFor="severity-1">Mild</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="severity-2" />
                    <Label htmlFor="severity-2">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="severity-3" />
                    <Label htmlFor="severity-3">Severe</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sleep Quality</h2>
            <Slider value={[sleep]} onValueChange={([value]) => setSleep(value)} max={5} step={1} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Mood</h2>
            <Slider value={[mood]} onValueChange={([value]) => setMood(value)} max={5} step={1} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="adherence" checked={adherence} onCheckedChange={setAdherence} />
            <Label htmlFor="adherence">Adherence to plan</Label>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Notes</h2>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <Button onClick={handleCheckin}>Save Check-in</Button>
        </div>
      </div>
    </main>
  );
}
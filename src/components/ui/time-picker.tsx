"use client";

import React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent } from './card';
import { Clock, Plus, X } from 'lucide-react';

interface TimePickerProps {
  value: Date[];
  onChange: (times: Date[]) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const addTime = () => {
    const newTime = new Date();
    newTime.setHours(9, 0, 0, 0); // Default to 9:00 AM
    onChange([...value, newTime]);
  };

  const removeTime = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateTime = (index: number, timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    
    const newTimes = [...value];
    newTimes[index] = newTime;
    onChange(newTimes);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <Label>Daily Reminder Times</Label>
          </div>
          
          {value.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No times selected. Add a time to receive daily affirmations.
            </p>
          )}
          
          <div className="space-y-2">
            {value.map((time, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="time"
                  value={time.toTimeString().slice(0, 5)}
                  onChange={(e) => updateTime(index, e.target.value)}
                  className="w-32"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTime(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={addTime}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

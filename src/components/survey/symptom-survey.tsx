"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const onboardingQuestions = [
  {
    id: 'emotionsExperienced',
    text: 'Which of these emotions have you experienced in the last month? (select all that apply)',
    options: [
      { id: 'anger', label: 'Anger' },
      { id: 'irritability', label: 'Irritability' },
      { id: 'mood-swings', label: 'Mood Swings' },
      { id: 'overwhelm', label: 'Overwhelm' },
      { id: 'stressed', label: 'Stressed' },
      { id: 'anxious', label: 'Anxious' },
      { id: 'loneliness', label: 'Loneliness' },
      { id: 'grief', label: 'Grief' },
      { id: 'depression', label: 'Depression' },
      { id: 'critical', label: 'Critical (of self or others)' },
      { id: 'exhaustion', label: 'Exhaustion' },
      { id: 'insecure', label: 'Insecure' },
      { id: 'mistrust', label: 'Mistrust' },
      { id: 'apathy', label: 'Apathy or numbness' },
      { id: 'worry', label: 'Worry' },
    ],
  },
  {
    id: 'affirmationCategories',
    text: 'Which of these emotions would you like affirmations or help with every day? (select all that apply)',
    options: [
      { id: 'overwhelm-help', label: 'Overwhelm' },
      { id: 'anxious-help', label: 'Anxious' },
      { id: 'loneliness-help', label: 'Loneliness' },
      { id: 'helplessness-help', label: 'Helplessness' },
      { id: 'grief-help', label: 'Grief' },
      { id: 'critical-help', label: 'Critical (of self or others)' },
      { id: 'insecurity-help', label: 'Insecurity' },
      { id: 'self-confidence-help', label: 'Self-confidence' },
      { id: 'hope-help', label: 'Hope' },
      { id: 'powerfulness-help', label: 'Powerfulness' },
      { id: 'gratitude-help', label: 'Gratitude' },
      { id: 'peace-help', label: 'Peace' },
      { id: 'creativity-help', label: 'Creativity' },
      { id: 'energetic-help', label: 'Energetic' },
      { id: 'safety-help', label: 'Safety' },
    ],
  },
];

export interface SurveyAnswers {
  emotionsExperienced: string[];
  affirmationCategories: string[];
}

interface SymptomSurveyProps {
  onComplete: (answers: SurveyAnswers) => void;
}

export const SymptomSurvey: React.FC<SymptomSurveyProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<SurveyAnswers>({
    emotionsExperienced: [],
    affirmationCategories: [],
  });

  const handleCheckboxChange = (questionId: keyof SurveyAnswers, optionId: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentSelection = prev[questionId];
      const newSelection = checked
        ? [...currentSelection, optionId]
        : currentSelection.filter((id) => id !== optionId);
      return { ...prev, [questionId]: newSelection };
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Your Journey Starts Here</CardTitle>
        </CardHeader>
        <CardContent>
          {onboardingQuestions.map((q) => (
            <div key={q.id} className="mb-8">
              <p className="font-semibold mb-4">{q.text}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {q.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${q.id}-${option.id}`}
                      onCheckedChange={(checked) => handleCheckboxChange(q.id as keyof SurveyAnswers, option.id, !!checked)}
                    />
                    <Label htmlFor={`${q.id}-${option.id}`}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => onComplete(answers)}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



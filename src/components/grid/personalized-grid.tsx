"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DetailsModal } from '@/components/modal/details-modal';
import { SurveyAnswers } from '@/components/survey/symptom-survey';
import { doctors } from '@/lib/data/doctors';
import { affirmations } from '@/lib/data/affirmations';
import { podFeed } from '@/lib/data/pods';
import { AskEmpressChat } from '@/components/chat/ask-empress-chat';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface PersonalizedGridProps {
  surveyAnswers: SurveyAnswers;
}

const symptomToSpecialty: { [key: string]: string[] } = {
  anger: ['Mood', 'Emotional wellness'],
  irritability: ['Mood', 'Emotional wellness'],
  'mood-swings': ['Mood swings', 'Hormone imbalance'],
  overwhelm: ['Stress', 'Anxiety', 'Emotional support'],
  stressed: ['Stress', 'Anxiety', 'Emotional wellness'],
  anxious: ['Anxiety', 'Mood', 'Emotional support'],
  loneliness: ['Emotional support', 'Support groups'],
  grief: ['Emotional support', 'Grief'],
  depression: ['Depression', 'Mood', 'Emotional wellness'],
  critical: ['Emotional support', 'Mood'],
  exhaustion: ['Fatigue', 'Energy boost'],
  insecure: ['Body image concerns', 'Emotional support'],
  mistrust: ['Emotional support'],
  apathy: ['Mood', 'Depression'],
  worry: ['Anxiety', 'Stress'],
};

export const PersonalizedGrid: React.FC<PersonalizedGridProps> = ({ surveyAnswers }) => {
  const [modalContent, setModalContent] = useState<{ title: string; description: string; children?: React.ReactNode } | null>(null);
  const [email, setEmail] = useState<string>("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistMsg, setWaitlistMsg] = useState<string>("");

  const getRecommendedDoctors = () => {
    const recommended: typeof doctors = [];
    const specialties = new Set<string>();

    surveyAnswers.emotionsExperienced.forEach(symptom => {
      symptomToSpecialty[symptom]?.forEach(specialty => specialties.add(specialty.toLowerCase()));
    });

    doctors.forEach(doctor => {
      const doctorSpecialties = doctor.specialties.map(s => s.toLowerCase());
      if (doctorSpecialties.some(s => specialties.has(s))) {
        recommended.push(doctor);
      }
    });

    return recommended.slice(0, 3);
  };

  const getAffirmations = () => {
    const selectedAffirmations: string[] = [];
    surveyAnswers.affirmationCategories.forEach(category => {
      if (affirmations[category]) {
        selectedAffirmations.push(...affirmations[category]);
      }
    });
    return selectedAffirmations.slice(0, 5);
  };
  
  const recommendedDoctors = getRecommendedDoctors();
  const selectedAffirmations = getAffirmations();
  const selectedAffirmationKeys = useMemo(() => surveyAnswers.affirmationCategories, [surveyAnswers.affirmationCategories]);

  const handleCardClick = (data: { title: string; description: string; children?: React.ReactNode }) => {
    setModalContent(data);
  };

  const toGoogleDate = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const y = date.getUTCFullYear();
    const m = pad(date.getUTCMonth() + 1);
    const d = pad(date.getUTCDate());
    const h = pad(date.getUTCHours());
    const min = pad(date.getUTCMinutes());
    const s = pad(date.getUTCSeconds());
    return `${y}${m}${d}T${h}${min}${s}Z`;
  };

  const addToGoogleCalendar = () => {
    const title = 'Empress Daily Affirmations';
    const desc = selectedAffirmations.join('\n');
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(8, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const dates = `${toGoogleDate(start)}/${toGoogleDate(end)}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(desc)}&dates=${dates}`;
    window.open(url, '_blank');
  };

  const downloadICS = () => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(8, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const formatICS = (d: Date) => {
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
    };
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Empress Health//Affirmations//EN\nBEGIN:VEVENT\nUID:${Date.now()}@empress.health\nDTSTAMP:${formatICS(new Date())}\nDTSTART:${formatICS(start)}\nDTEND:${formatICS(end)}\nSUMMARY:Empress Daily Affirmations\nDESCRIPTION:${selectedAffirmations.join('\\n')}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'empress-affirmations.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleJoinWaitlist = async (specialtyGuess: string) => {
    try {
      setWaitlistStatus('loading');
      setWaitlistMsg('');
      const resp = await fetch('/api/doctors/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, specialty: specialtyGuess || 'General symptoms' }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to join waitlist');
      }
      setWaitlistStatus('success');
      setWaitlistMsg('You’re on the list. We’ll reach out with a curated match.');
      setEmail('');
    } catch (e: any) {
      setWaitlistStatus('error');
      setWaitlistMsg(e?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <Card onClick={() => handleCardClick({
          title: 'Doctor Recommendations',
          description: 'Expert clinicians matched to your current needs.',
          children: (
            <div className="space-y-6 mt-4">
              {recommendedDoctors.map((doc, i) => (
                <div key={i} className="p-5 rounded-lg border bg-white/70">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-[#2D1B33]">{doc.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {doc.specialties.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-[#F5F2EF] text-[#6B5B73] border">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <Input
                  placeholder="Your email for a curated match"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10"
                />
                <Button
                  className="bg-[#4A235A] hover:bg-[#4A235A]/90"
                  disabled={!email || waitlistStatus === 'loading'}
                  onClick={() => handleJoinWaitlist(Array.from(new Set(Object.values(symptomToSpecialty).flat()))[0] || 'General symptoms')}
                >
                  {waitlistStatus === 'loading' ? 'Joining…' : 'Join Waitlist'}
                </Button>
              </div>
              {waitlistMsg && (
                <p className={`text-sm ${waitlistStatus === 'success' ? 'text-green-700' : 'text-red-600'}`}>{waitlistMsg}</p>
              )}
            </div>
          )
        })}>
          <CardHeader>
            <CardTitle className="display-text">Doctor Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#6B5B73]">Personalized recommendations based on your survey.</p>
          </CardContent>
        </Card>
        <Card onClick={() => handleCardClick({
          title: 'Ask Empress',
          description: 'Get answers to your questions.',
          children: <AskEmpressChat />
        })}>
          <CardHeader>
            <CardTitle>Ask Empress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Embed the chat function with suggested questions.</p>
          </CardContent>
        </Card>
        <Card onClick={() => handleCardClick({
          title: 'Community Pods',
          description: 'Connect with others who share your experiences.',
          children: (
            <div className="space-y-4 mt-4">
              {podFeed.map(post => (
                <div key={post.id} className="p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{post.user.name}</p>
                  </div>
                  <p>{post.post}</p>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4">Join Pod</Button>
            </div>
          )
        })}>
          <CardHeader>
            <CardTitle>Community Pods</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Join a pod to connect with others.</p>
          </CardContent>
        </Card>
        <Card onClick={() => handleCardClick({
          title: 'Daily Affirmations',
          description: 'A few quiet words for each morning.',
          children: (
            <div className="space-y-6 mt-4">
              {selectedAffirmationKeys.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedAffirmationKeys.map((key) => (
                    <span key={key} className="px-3 py-1 text-xs rounded-full bg-[#F5F2EF] text-[#6B5B73] border">{key.replace('-help','')}</span>
                  ))}
                </div>
              )}
              <div className="space-y-3">
                {selectedAffirmations.map((affirmation, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/70 border">
                    <p className="italic text-[#2D1B33]">“{affirmation}”</p>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button className="w-full bg-[#4A235A] hover:bg-[#4A235A]/90" onClick={addToGoogleCalendar}>
                  Add to Google Calendar
                </Button>
                <Button className="w-full" variant="outline" onClick={downloadICS}>
                  Download .ics
                </Button>
              </div>
              <p className="text-xs text-[#6B5B73]">We’ll never share your data. Calendar reminders are for your eyes only.</p>
            </div>
          )
        })}>
          <CardHeader>
            <CardTitle className="display-text">Daily Affirmations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#6B5B73]">Get daily affirmations tailored to your needs.</p>
          </CardContent>
        </Card>
      </div>
      {modalContent && (
        <DetailsModal
          isOpen={!!modalContent}
          onClose={() => setModalContent(null)}
          title={modalContent.title}
          description={modalContent.description}
        >
          {modalContent.children}
        </DetailsModal>
      )}
    </>
  );
};



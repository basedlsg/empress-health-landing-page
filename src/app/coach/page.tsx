"use client";

import React from 'react';
import { AskEmpressChat } from '@/components/chat/ask-empress-chat';

export default function CoachPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <AskEmpressChat />
      </div>
    </main>
  );
}
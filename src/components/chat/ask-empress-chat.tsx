"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrCreateAnonId } from '@/lib/anon';

export function AskEmpressChat() {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const anonId = getOrCreateAnonId();
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
  
      const response = await fetch('/api/askEmpress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input, anonId }),
      });
  
      if (response.ok) {
        const { answer } = await response.json();
        setMessages((prevMessages) => [...prevMessages, { text: answer, sender: 'bot' }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AskEmpress</CardTitle>
      </CardHeader>
      <CardContent className="h-96 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask about sleep, hot flashes, mood..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
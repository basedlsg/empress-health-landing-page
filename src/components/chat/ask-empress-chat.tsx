"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface Message {
  id: number;
  conversationId: number;
  speaker: 'user' | 'assistant';
  text: string;
  timestamp: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}

export const AskEmpressChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { label: "Sleep", message: "I'm having trouble sleeping during menopause. Can you help?" },
    { label: "Hot Flashes", message: "How can I manage hot flashes naturally?" },
    { label: "Mood", message: "I'm experiencing mood swings. What should I know?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'AskEmpress Chat'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      const conversation: Conversation = await response.json();
      setConversationId(conversation.id);
    } catch (err) {
      setError('Failed to initialize chat. Please refresh and try again.');
      console.error('Error initializing conversation:', err);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !conversationId || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      conversationId,
      text: content.trim(),
      speaker: 'user',
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Save user message to database
      const messageResponse = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          speaker: 'user',
          text: userMessage.text,
          timestamp: userMessage.timestamp,
        }),
      });

      if (!messageResponse.ok) {
        throw new Error('Failed to save message');
      }

      // Get AI response from Gemini
      const aiResponse = await fetch('/api/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
        }),
      });

      if (!aiResponse.ok) {
        throw new Error('Failed to get AI response');
      }

      const aiData = await aiResponse.json();
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        conversationId,
        text: aiData.response,
        speaker: 'assistant',
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save assistant message to database
      await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          speaker: 'assistant',
          text: assistantMessage.text,
          timestamp: assistantMessage.timestamp,
        }),
      });

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (error && !conversationId) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#4A235A] to-[#4A235A]/90 p-6 text-white">
          <h2 className="font-serif text-2xl font-semibold">AskEmpress</h2>
          <p className="text-white/80 text-sm">Your personal menopause companion</p>
        </div>
        <div className="p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={initializeConversation} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4A235A] to-[#4A235A]/90 p-6 text-white">
        <h2 className="font-serif text-2xl font-semibold">AskEmpress</h2>
        <p className="text-white/80 text-sm">Your personal menopause companion</p>
      </div>

      {/* Messages Container */}
      <div className="h-96 md:h-[500px] overflow-y-auto p-4 space-y-4 bg-[#FAF8F5]">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#6B5B73] mb-4">
              <p className="text-lg font-medium">Welcome to AskEmpress! 👋</p>
              <p className="text-sm">Ask me anything about menopause and wellness.</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                message.speaker === 'user'
                  ? 'bg-[#4A235A] text-white ml-4'
                  : 'bg-[#D7BCE8]/30 text-[#2D1B33] mr-4'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>
              <p className={`text-xs mt-2 opacity-70 ${
                message.speaker === 'user' ? 'text-white' : 'text-[#6B5B73]'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-[#D7BCE8]/30 text-[#2D1B33] rounded-2xl px-4 py-3 mr-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Empress is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[#E8E0E5] bg-white p-4 space-y-3">
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.message)}
              disabled={isLoading}
              className="text-xs bg-[#D7BCE8]/20 border-[#D7BCE8] hover:bg-[#D7BCE8]/30 text-[#4A235A]"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask me about menopause, wellness, or health..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 border-[#E8E0E5] focus:ring-[#4A235A] focus:border-[#4A235A]"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-[#4A235A] hover:bg-[#4A235A]/90 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        <p className="text-xs text-[#6B5B73] text-center">
          Empress provides wellness guidance, not medical diagnosis. Consult healthcare providers for medical concerns.
        </p>
      </div>
    </div>
  );
};
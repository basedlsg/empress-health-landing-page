"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface Pod {
  id: string;
  name: string;
  description: string;
}

interface Post {
  id: string;
  text: string;
  author: string;
}

export default function PodsPage() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [selectedPod, setSelectedPod] = useState<Pod | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch these from your backend
    setPods([
      { id: '1', name: 'Hot Flash Heroes', description: 'A space to share tips and support for managing hot flashes.' },
      { id: '2', name: 'Sleep Seekers', description: 'Find solidarity and solutions for menopause-related sleep issues.' },
      { id: '3', name: 'Mood Swing Mavens', description: 'Navigate the emotional ups and downs with others who get it.' },
    ]);
  }, []);

  const handleSelectPod = (pod: Pod) => {
    setSelectedPod(pod);
    // In a real app, you'd fetch posts for the selected pod
    setPosts([
      { id: '1', text: 'Welcome to the pod!', author: 'Admin' },
    ]);
  };

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: String(posts.length + 1), text: newPost, author: 'You' }]);
      setNewPost('');
    }
  };

  const handleMembershipToggle = () => {
    setIsMember(!isMember);
    // In a real app, you'd save this preference to Firestore
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h1 className="text-4xl font-bold mb-8">Micro-Pods</h1>
            <div className="space-y-4">
              {pods.map((pod) => (
                <Card key={pod.id} onClick={() => handleSelectPod(pod)} className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>{pod.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{pod.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/pods/calendar" passHref>
                <Button>View AMA Calendar</Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            {selectedPod ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">{selectedPod.name}</h2>
                  <div className="flex items-center space-x-2">
                    <Switch id="membership" checked={isMember} onCheckedChange={handleMembershipToggle} />
                    <Label htmlFor="membership">Join Pod</Label>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4">
                        <p>{post.text}</p>
                        <p className="text-sm text-muted-foreground">- {post.author}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="space-y-4">
                  <Textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share your thoughts..." />
                  <Button onClick={handlePost}>Post</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a pod to view the conversation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
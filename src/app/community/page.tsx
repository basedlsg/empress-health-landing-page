"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Loader2 } from 'lucide-react';

interface Pod {
  id: number;
  name: string;
  topic: string;
  createdAt: string;
}

interface MembershipStatus {
  isMember: boolean;
}

export default function CommunityPodsPage() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [memberships, setMemberships] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const userId = 1; // Hardcoded for now

  useEffect(() => {
    fetchPods();
  }, []);

  const fetchPods = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/pods');
      if (!response.ok) throw new Error('Failed to fetch pods');
      
      const podsData = await response.json();
      setPods(podsData);

      // Fetch membership status for each pod
      const membershipPromises = podsData.map(async (pod: Pod) => {
        try {
          const membershipResponse = await fetch(`/api/pods/${pod.id}/membership?userId=${userId}`);
          if (membershipResponse.ok) {
            const membershipData: MembershipStatus = await membershipResponse.json();
            return { podId: pod.id, isMember: membershipData.isMember };
          }
          return { podId: pod.id, isMember: false };
        } catch {
          return { podId: pod.id, isMember: false };
        }
      });

      const membershipResults = await Promise.all(membershipPromises);
      const membershipMap = membershipResults.reduce((acc, result) => {
        acc[result.podId] = result.isMember;
        return acc;
      }, {} as Record<number, boolean>);

      setMemberships(membershipMap);
    } catch (err) {
      setError('Failed to load community pods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinLeave = async (podId: number, isJoining: boolean) => {
    setLoadingStates(prev => ({ ...prev, [podId]: true }));
    setError(null);

    try {
      const endpoint = isJoining ? `/api/pods/${podId}/join` : `/api/pods/${podId}/leave`;
      const method = isJoining ? 'POST' : 'DELETE';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to ${isJoining ? 'join' : 'leave'} pod`);
      }

      // Optimistically update membership status
      setMemberships(prev => ({ ...prev, [podId]: isJoining }));

    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${isJoining ? 'join' : 'leave'} pod. Please try again.`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [podId]: false }));
    }
  };

  const handleCardClick = (podId: number) => {
    router.push(`/community/${podId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#4A235A] mb-4 font-serif">Community Pods</h1>
            <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
              Join supportive micro-communities for your menopause journey
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A235A]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button variant="ghost" onClick={() => router.back()} className="absolute top-6 left-6">
            &larr; Back
          </Button>
          <h1 className="text-4xl font-bold text-[#4A235A] mb-4 font-serif">Community Pods</h1>
          <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
            Join supportive micro-communities for your menopause journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Pods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pods.map((pod) => (
            <Card 
              key={pod.id}
              className="bg-[#FAF8F5] border-[#E8E0E5] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => handleCardClick(pod.id)}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-[#4A235A] font-serif group-hover:text-[#4A235A]/80 transition-colors">
                  {pod.name}
                </CardTitle>
                <CardDescription className="text-[#D7BCE8] font-medium">
                  {pod.topic}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Member indicator */}
                <div className="flex items-center gap-2 text-[#6B5B73]">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    {memberships[pod.id] ? 'You are a member' : 'Not a member'}
                  </span>
                </div>

                {/* Join/Leave Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinLeave(pod.id, !memberships[pod.id]);
                  }}
                  disabled={loadingStates[pod.id]}
                  variant={memberships[pod.id] ? "outline" : "default"}
                  className={`w-full transition-all duration-200 ${
                    memberships[pod.id]
                      ? 'border-[#4A235A] text-[#4A235A] hover:bg-[#4A235A] hover:text-white'
                      : 'bg-[#4A235A] hover:bg-[#4A235A]/90 text-white'
                  }`}
                >
                  {loadingStates[pod.id] ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {memberships[pod.id] ? 'Leave Pod' : 'Join Pod'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {pods.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-[#6B5B73] text-lg">No community pods available at the moment.</p>
            <p className="text-[#6B5B73] text-sm mt-2">Check back soon for new communities to join!</p>
          </div>
        )}
      </div>
    </div>
  );
}
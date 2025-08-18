"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Users, MessageSquare, Clock, Send, Loader2 } from 'lucide-react';

interface Pod {
  id: number;
  name: string;
  topic: string;
  createdAt: string;
}

interface Post {
  id: number;
  userId: number;
  podId: number;
  text: string;
  timestamp: string;
  createdAt: string;
}

interface Membership {
  isMember: boolean;
  membership: any;
}

export default function PodThreadPage() {
  const params = useParams();
  const router = useRouter();
  const podId = params.id as string;

  const [pod, setPod] = useState<Pod | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [joiningLeaving, setJoiningLeaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_CHARS = 1000;
  const userId = 1; // Hardcoded for now

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch pod details
        const podResponse = await fetch(`/api/pods?id=${podId}`);
        if (!podResponse.ok) throw new Error('Failed to fetch pod details');
        const podData = await podResponse.json();
        setPod(podData);

        // Fetch membership status
        const membershipResponse = await fetch(`/api/pods/${podId}/membership?userId=${userId}`);
        if (!membershipResponse.ok) throw new Error('Failed to fetch membership status');
        const membershipData = await membershipResponse.json();
        setMembership(membershipData);

        // Fetch posts
        const postsResponse = await fetch(`/api/pods/${podId}/posts`);
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pod data');
      } finally {
        setLoading(false);
      }
    };

    if (podId) {
      fetchData();
    }
  }, [podId]);

  const handleJoinLeave = async () => {
    if (!membership || joiningLeaving) return;

    try {
      setJoiningLeaving(true);
      setError(null);
      
      const endpoint = membership.isMember ? `/api/pods/${podId}/leave` : `/api/pods/${podId}/join`;
      const method = membership.isMember ? 'DELETE' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to ${membership.isMember ? 'leave' : 'join'} pod`);
      }

      setMembership({ isMember: !membership.isMember, membership: null });
      
      // If leaving, clear posts since non-members shouldn't see them
      if (membership.isMember) {
        setPosts([]);
      } else {
        // If joining, refetch posts
        const postsResponse = await fetch(`/api/pods/${podId}/posts`);
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update membership');
    } finally {
      setJoiningLeaving(false);
    }
  };

  const handleSubmitPost = async () => {
    if (!newPost.trim() || submitting || !membership?.isMember) return;

    try {
      setSubmitting(true);
      setError(null);
      
      const response = await fetch(`/api/pods/${podId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          text: newPost.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create post');
      }

      const newPostData = await response.json();
      setPosts([newPostData, ...posts]);
      setNewPost('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getUserName = (userId: number) => {
    return `User ${userId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A235A]" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !pod) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push('/community')}
            className="mb-6 text-[#4A235A] hover:text-[#4A235A]/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Community
          </Button>
          <Card className="bg-[#FAF8F5] border-[#E8E0E5]">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-[#4A235A] mb-2 font-serif">
                {error || 'Pod not found'}
              </h2>
              <p className="text-[#6B5B73]">
                We couldn't load the pod you're looking for.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.push('/community')}
          className="mb-6 text-[#4A235A] hover:text-[#4A235A]/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </Button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Pod Header */}
        {pod && (
          <Card className="mb-8 bg-[#FAF8F5] border-[#E8E0E5] shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-[#4A235A] font-serif">
                    {pod.name}
                  </h1>
                  <p className="text-[#D7BCE8] font-medium">{pod.topic}</p>
                  <div className="flex items-center gap-4 text-sm text-[#6B5B73]">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{posts.length} posts</span>
                    </div>
                  </div>
                </div>
                {membership && (
                  <Button
                    onClick={handleJoinLeave}
                    disabled={joiningLeaving}
                    variant={membership.isMember ? "outline" : "default"}
                    className={`transition-all duration-200 ${
                      membership.isMember
                        ? 'border-[#4A235A] text-[#4A235A] hover:bg-[#4A235A] hover:text-white'
                        : 'bg-[#4A235A] hover:bg-[#4A235A]/90 text-white'
                    }`}
                  >
                    {joiningLeaving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {membership.isMember ? 'Leave Pod' : 'Join Pod'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Post Composer - Only for members */}
        {membership?.isMember && (
          <Card className="mb-8 bg-[#FAF8F5] border-[#E8E0E5] shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts with the pod..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  maxLength={MAX_CHARS}
                  className="min-h-[100px] resize-none border-[#E8E0E5] focus:border-[#4A235A] focus:ring-[#4A235A]/20"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B5B73]">
                    {newPost.length}/{MAX_CHARS} characters
                  </span>
                  <Button
                    onClick={handleSubmitPost}
                    disabled={!newPost.trim() || submitting}
                    className="bg-[#4A235A] hover:bg-[#4A235A]/90 text-white"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {submitting ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Thread */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card className="bg-[#FAF8F5] border-[#E8E0E5] shadow-sm">
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-[#6B5B73]/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#4A235A] font-serif mb-2">
                  No posts yet
                </h3>
                <p className="text-[#6B5B73]">
                  {membership?.isMember 
                    ? "Be the first to start a conversation in this pod!"
                    : "Join this pod to see and participate in discussions."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card 
                key={post.id} 
                className="bg-[#FAF8F5] border-[#E8E0E5] shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 bg-[#D7BCE8]">
                      <AvatarFallback className="text-[#4A235A] font-medium">
                        {getUserName(post.userId).charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#4A235A]">
                          {getUserName(post.userId)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-[#6B5B73]">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                      <p className="text-[#2D1B33] whitespace-pre-wrap leading-relaxed">
                        {post.text}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();
    const { message, systemPrompt } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Maximum 1000 characters allowed.' },
        { status: 400 }
      );
    }

    // Use provided system prompt or default Empress Sense prompt
    const defaultSystemPrompt = "Empress Sense: compassionate menopause guide. Provide structure/function advice, no diagnosis, ≤180 words.";
    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;

    // Log request for debugging (remove in production)
    console.log('Gemini API request:', {
      systemPrompt: finalSystemPrompt,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });

    // TODO: Replace with actual Orchids.app HTTP action integration
    // For now, using a realistic stub response that matches Empress Sense persona
    const mockResponse = await generateMockEmpressResponse(message);

    /* 
    // Future implementation with actual Gemini API via Orchids.app:
    const geminiResponse = await fetch(process.env.ORCHIDS_GEMINI_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ORCHIDS_API_KEY}`,
        'X-Orchids-Action': 'gemini-chat'
      },
      body: JSON.stringify({
        systemPrompt: finalSystemPrompt,
        userMessage: message,
        maxTokens: 200,
        temperature: 0.7
      }),
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      
      if (geminiResponse.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.', code: 'RATE_LIMITED' },
          { status: 429 }
        );
      }
      
      if (geminiResponse.status >= 500) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Please try again.', code: 'SERVICE_ERROR' },
          { status: 503 }
        );
      }
      
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    */

    return NextResponse.json({ 
      response: mockResponse 
    });

  } catch (error: unknown) {
    console.error('Gemini API route error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle specific error types
    if (errorMessage.includes('timeout') || errorMessage.includes('AbortError')) {
      return NextResponse.json(
        { error: 'Request timeout. Please try again.', code: 'TIMEOUT' },
        { status: 408 }
      );
    }
    
    if (errorMessage.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error. Please check your connection and try again.', code: 'NETWORK_ERROR' },
        { status: 503 }
      );
    }
    
    if (errorMessage.includes('JSON')) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

// Mock response generator for development - matches Empress Sense persona
async function generateMockEmpressResponse(message: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const lowercaseMessage = message.toLowerCase();
  
  // Topic-based responses that align with Empress Sense persona
  if (lowercaseMessage.includes('hot flash') || lowercaseMessage.includes('hot flush')) {
    return "Hot flashes occur when fluctuating estrogen affects your hypothalamus, your body's temperature control center. Consider layered clothing, breathable fabrics, and cooling techniques like cold water on wrists. Regular exercise, stress management, and avoiding triggers like spicy foods can help. Keep a cool environment and practice deep breathing during episodes. Some find relief with fans, cooling towels, or adjusting room temperature. Remember, this phase will pass as your body adjusts to hormonal changes.";
  }
  
  if (lowercaseMessage.includes('sleep') || lowercaseMessage.includes('insomnia')) {
    return "Sleep disruption during menopause often stems from hormonal fluctuations affecting melatonin production and temperature regulation. Create a cool, dark sleep environment and establish consistent bedtime routines. Avoid caffeine after 2 PM and screens before bed. Consider relaxation techniques like gentle yoga or meditation. Magnesium may support better sleep quality. If night sweats wake you, keep cooling towels nearby and wear moisture-wicking sleepwear. Your sleep patterns will stabilize as hormone levels settle.";
  }
  
  if (lowercaseMessage.includes('mood') || lowercaseMessage.includes('anxiety') || lowercaseMessage.includes('depression')) {
    return "Mood changes during menopause are linked to declining estrogen, which affects serotonin and other mood-regulating neurotransmitters. Regular exercise releases endorphins that naturally boost mood. Prioritize stress management through mindfulness, deep breathing, or journaling. Maintain social connections and don't hesitate to share your experiences. Omega-3 fatty acids and B vitamins support brain health. Remember, these feelings are temporary and your body is adapting to significant hormonal shifts.";
  }
  
  if (lowercaseMessage.includes('weight') || lowercaseMessage.includes('metabolism')) {
    return "Metabolic changes during menopause occur due to declining estrogen, which affects how your body stores fat and builds muscle. Focus on strength training to maintain muscle mass, which supports metabolism. Prioritize protein at each meal and eat regularly to stabilize blood sugar. Stay hydrated and consider smaller, more frequent meals. Your body composition may shift, but healthy habits will support your overall well-being throughout this transition.";
  }
  
  if (lowercaseMessage.includes('joint') || lowercaseMessage.includes('ache') || lowercaseMessage.includes('pain')) {
    return "Joint discomfort during menopause relates to decreased estrogen, which has anti-inflammatory properties and supports joint health. Gentle, regular movement like walking, swimming, or yoga can maintain joint mobility. Consider anti-inflammatory foods like fatty fish, leafy greens, and berries. Warm baths or gentle stretching may provide comfort. Stay hydrated and maintain a healthy weight to reduce joint stress. These symptoms often improve as your body adapts to new hormone levels.";
  }
  
  if (lowercaseMessage.includes('brain fog') || lowercaseMessage.includes('memory') || lowercaseMessage.includes('concentration')) {
    return "Cognitive changes during menopause result from estrogen's role in brain function and neurotransmitter activity. Stay mentally active with puzzles, reading, or learning new skills. Prioritize quality sleep and regular exercise to support brain health. Omega-3 fatty acids and antioxidant-rich foods nourish cognitive function. Use organizational tools like lists or calendars. Practice stress reduction, as cortisol can impact memory. These symptoms typically improve as hormone levels stabilize.";
  }
  
  // Default compassionate response
  return "I understand you're navigating changes during menopause. This transition involves complex hormonal shifts that affect multiple body systems. Each woman's experience is unique, and your feelings are completely valid. Focus on gentle self-care, nourishing foods, regular movement, and stress management. Stay connected with supportive people and remember that this phase, while challenging, is temporary. Your body is adapting, and with patience and care, you'll find your new balance. Consider discussing your specific concerns with a healthcare provider for personalized guidance.";
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  );
}
import { getDb } from '@/db';
import { messages } from '@/db/schema';

async function main() {
    const sampleMessages = [
        // Conversation 1: Sleep Issues
        {
            id: 1,
            conversationId: 1,
            speaker: 'user',
            text: "I'm so exhausted. I just can't seem to get a good night's sleep anymore. I wake up sweating constantly.",
            timestamp: new Date('2024-03-10T09:00:00Z').toISOString(),
            createdAt: new Date('2024-03-10T09:00:00Z').toISOString(),
        },
        {
            id: 2,
            conversationId: 1,
            speaker: 'assistant',
            text: "I hear you, and it sounds incredibly frustrating. Sleep disturbances, especially those accompanied by night sweats, are very common during menopause. It's a challenging symptom, but there are many things we can explore together to help you find more restful nights. Tell me, how long has this been going on?",
            timestamp: new Date('2024-03-10T09:01:30Z').toISOString(),
            createdAt: new Date('2024-03-10T09:01:30Z').toISOString(),
        },
        {
            id: 3,
            conversationId: 1,
            speaker: 'user',
            text: "For months now. I try everything - cool room, no caffeine, but nothing works. The insomnia is just as bad as the sweats.",
            timestamp: new Date('2024-03-10T09:03:00Z').toISOString(),
            createdAt: new Date('2024-03-10T09:03:00Z').toISOString(),
        },
        {
            id: 4,
            conversationId: 1,
            speaker: 'assistant',
            text: "It's understandable to feel discouraged when you've tried so much already. Both insomnia and night sweats often go hand-in-hand during this phase. Let's look at some strategies, perhaps focusing on evening routines, what you eat and drink before bed, and even certain techniques to manage those hot flushes when they occur at night. We can also discuss when it might be helpful to speak with your doctor about potential medical options.",
            timestamp: new Date('2024-03-10T09:04:45Z').toISOString(),
            createdAt: new Date('2024-03-10T09:04:45Z').toISOString(),
        },
        {
            id: 5,
            conversationId: 1,
            speaker: 'user',
            text: "That sounds helpful. I just want to feel rested again.",
            timestamp: new Date('2024-03-10T09:06:00Z').toISOString(),
            createdAt: new Date('2024-03-10T09:06:00Z').toISOString(),
        },

        // Conversation 2: Hot Flashes
        {
            id: 6,
            conversationId: 2,
            speaker: 'user',
            text: "These hot flashes are driving me crazy! One minute I'm fine, the next I'm drenched. It's so embarrassing at work.",
            timestamp: new Date('2024-03-11T10:15:00Z').toISOString(),
            createdAt: new Date('2024-03-11T10:15:00Z').toISOString(),
        },
        {
            id: 7,
            conversationId: 2,
            speaker: 'assistant',
            text: "Hot flashes can certainly feel overwhelming and disruptive, especially in public or professional settings. You're not alone in experiencing this; it's one of the most common and bothersome symptoms for many women. We can explore some short-term coping strategies to help you manage them when they strike, and also discuss identifying your personal triggers to potentially reduce their frequency.",
            timestamp: new Date('2024-03-11T10:16:45Z').toISOString(),
            createdAt: new Date('2024-03-11T10:16:45Z').toISOString(),
        },
        {
            id: 8,
            conversationId: 2,
            speaker: 'user',
            text: "It feels like anything sets them off. Coffee, stress, even just walking too fast.",
            timestamp: new Date('2024-03-11T10:18:00Z').toISOString(),
            createdAt: new Date('2024-03-11T10:18:00Z').toISOString(),
        },
        {
            id: 9,
            conversationId: 2,
            speaker: 'assistant',
            text: "That's a very keen observation. Coffee and stress are indeed common triggers, and even slight increases in body temperature can initiate a hot flash. We can work on a 'hot flash diary' to pinpoint your unique patterns, which can be incredibly empowering. We can also look at breathwork techniques that have been shown to help reduce the intensity and duration of flashes when they occur.",
            timestamp: new Date('2024-03-11T10:19:30Z').toISOString(),
            createdAt: new Date('2024-03-11T10:19:30Z').toISOString(),
        },
        {
            id: 10,
            conversationId: 2,
            speaker: 'user',
            text: "A diary sounds like a good idea. I need some control over this.",
            timestamp: new Date('2024-03-11T10:21:00Z').toISOString(),
            createdAt: new Date('2024-03-11T10:21:00Z').toISOString(),
        },
        {
            id: 11,
            conversationId: 2,
            speaker: 'assistant',
            text: "Precisely. Knowing your triggers gives you valuable insight. We'll find ways to help you feel more comfortable and lessen their impact on your daily life. Remember, every small step towards understanding your body's changes is a victory.",
            timestamp: new Date('2024-03-11T10:22:30Z').toISOString(),
            createdAt: new Date('2024-03-11T10:22:30Z').toISOString(),
        },

        // Conversation 3: Mood Support
        {
            id: 12,
            conversationId: 3,
            speaker: 'user',
            text: "I feel like I'm on an emotional roller coaster. One minute I'm fine, the next I'm crying over something silly. My anxiety is through the roof.",
            timestamp: new Date('2024-03-12T14:30:00Z').toISOString(),
            createdAt: new Date('2024-03-12T14:30:00Z').toISOString(),
        },
        {
            id: 13,
            conversationId: 3,
            speaker: 'assistant',
            text: "It sounds like you're navigating quite a difficult emotional landscape, and it's perfectly normal to feel that way during menopause. Hormonal fluctuations can profoundly impact mood, leading to increased anxiety, irritability, and even feelings of sadness. Please know that what you're experiencing is valid, and you're not alone. Let's talk about some strategies to support your emotional well-being.",
            timestamp: new Date('2024-03-12T14:31:45Z').toISOString(),
            createdAt: new Date('2024-03-12T14:31:45Z').toISOString(),
        },
        {
            id: 14,
            conversationId: 3,
            speaker: 'user',
            text: "I just feel so overwhelmed and not like myself. Sometimes I snap at my family, and then I feel guilty.",
            timestamp: new Date('2024-03-12T14:33:00Z').toISOString(),
            createdAt: new Date('2024-03-12T14:33:00Z').toISOString(),
        },
        {
            id: 15,
            conversationId: 3,
            speaker: 'assistant',
            text: "That feeling of guilt is tough, but it's important to be kind to yourself. These shifts in mood are a biological response to changing hormone levels. We can explore mindfulness techniques, gentle exercises, and nutritional choices that can positively influence your mental state. Sometimes, even just acknowledging these feelings can be a powerful first step. We'll focus on building resilience and finding moments of calm.",
            timestamp: new Date('2024-03-12T14:34:30Z').toISOString(),
            createdAt: new Date('2024-03-12T14:34:30Z').toISOString(),
        },
        {
            id: 16,
            conversationId: 3,
            speaker: 'user',
            text: "I'm willing to try anything to feel more balanced.",
            timestamp: new Date('2024-03-12T14:36:00Z').toISOString(),
            createdAt: new Date('2024-03-12T14:36:00Z').toISOString(),
        },
        {
            id: 17,
            conversationId: 3,
            speaker: 'assistant',
            text: "That's a wonderful spirit. We'll work on practical steps together. Remember, managing your emotional health is just as crucial as addressing physical symptoms. Empress Sense is here to provide you with grounded advice and compassionate support as you navigate these changes. You're doing a great job by reaching out.",
            timestamp: new Date('2024-03-12T14:37:30Z').toISOString(),
            createdAt: new Date('2024-03-12T14:37:30Z').toISOString(),
        },
    ];

    const db = getDb();
    await db.insert(messages).values(sampleMessages);

    console.log('✅ Messages seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
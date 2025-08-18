import { db } from '@/db';
import { podPosts } from '@/db/schema';

async function main() {
    const NOW = new Date();
    const dateOffset = (days: number) => {
        const d = new Date(NOW);
        d.setDate(NOW.getDate() - days);
        return d.toISOString();
    };

    const samplePodPosts = [
        // Sleep Support Pod (ID: 1 - assuming pods are seeded first with IDs 1, 2, 3)
        {
            userId: 1, // Member of Sleep Support
            podId: 1,
            text: "Anyone else struggling with night sweats disrupting sleep? So frustrating!",
            timestamp: dateOffset(5),
            createdAt: dateOffset(5),
        },
        {
            userId: 3, // Member of Sleep Support
            podId: 1,
            text: "I've started using a cooling pillow and it helps a little. Definitely not a cure-all, but it's something.",
            timestamp: dateOffset(4.5),
            createdAt: dateOffset(4.5),
        },
        {
            userId: 5, // Member of Sleep Support
            podId: 1,
            text: "Magnesium supplements have been a game changer for my restless nights. Worth looking into if you haven't!",
            timestamp: dateOffset(3.2),
            createdAt: dateOffset(3.2),
        },
        {
            userId: 2, // Member of Sleep Support
            podId: 1,
            text: "Agreed on the magnesium! Also, trying to stick to a strict sleep schedule makes a difference.",
            timestamp: dateOffset(2.8),
            createdAt: dateOffset(2.8),
        },
        {
            userId: 1, // Member of Sleep Support
            podId: 1,
            text: "Thanks for the tips everyone! Will try the magnesium and cooling pillow. Praying for a full night's rest soon!",
            timestamp: dateOffset(1.5),
            createdAt: dateOffset(1.5),
        },

        // Hot Flash Heroes Pod (ID: 2)
        {
            userId: 2, // Member of Hot Flash Heroes
            podId: 2,
            text: "Another day, another hot flash wave. Any quick relief tips for when they hit hard at work?",
            timestamp: dateOffset(6),
            createdAt: dateOffset(6),
        },
        {
            userId: 4, // Member of Hot Flash Heroes
            podId: 2,
            text: "Keep a small portable fan handy! And layering clothing helps so much for quick adjustments.",
            timestamp: dateOffset(5.5),
            createdAt: dateOffset(5.5),
        },
        {
            userId: 1, // Member of Hot Flash Heroes
            podId: 2,
            text: "I swear by ice water and deep breathing exercises. Calms me down and helps the flush pass faster.",
            timestamp: dateOffset(4.1),
            createdAt: dateOffset(4.1),
        },
        {
            userId: 3, // Member of Hot Flash Heroes
            podId: 2,
            text: "Loose, breathable fabrics are my best friend. Cotton and linen all the way!",
            timestamp: dateOffset(3.7),
            createdAt: dateOffset(3.7),
        },
        {
            userId: 5, // Member of Hot Flash Heroes
            podId: 2,
            text: "A cold pack on the wrists or neck can provide immediate relief. Stay strong, heroes!",
            timestamp: dateOffset(2.1),
            createdAt: dateOffset(2.1),
        },

        // Mood & Mindfulness Pod (ID: 3)
        {
            userId: 3, // Member of Mood & Mindfulness
            podId: 3,
            text: "Feeling overwhelmed and irritable lately. Does anyone have go-to mindfulness exercises for mood swings?",
            timestamp: dateOffset(7),
            createdAt: dateOffset(7),
        },
        {
            userId: 5, // Member of Mood & Mindfulness
            podId: 3,
            text: "Journaling really helps me process emotions and identify triggers. Even just 5 minutes a day.",
            timestamp: dateOffset(6.5),
            createdAt: dateOffset(6.5),
        },
        {
            userId: 1, // Member of Mood & Mindfulness
            podId: 3,
            text: "Gentle yoga and meditation apps are my lifesavers. Even short sessions help recenter.",
            timestamp: dateOffset(5.2),
            createdAt: dateOffset(5.2),
        },
        {
            userId: 2, // Member of Mood & Mindfulness
            podId: 3,
            text: "Prioritize self-care! A warm bath or a walk in nature can do wonders for a low mood.",
            timestamp: dateOffset(4.8),
            createdAt: dateOffset(4.8),
        },
        {
            userId: 4, // Member of Mood & Mindfulness
            podId: 3,
            text: "Practicing gratitude daily has shifted my perspective significantly. Try noting 3 things you're grateful for.",
            timestamp: dateOffset(3.1),
            createdAt: dateOffset(3.1),
        },
    ];

    await db.insert(podPosts).values(samplePodPosts);

    console.log('✅ Pod Posts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
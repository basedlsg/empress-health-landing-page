import { getDb } from '@/db';
const db = getDb();
import { pods } from '@/db/schema';

async function main() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const samplePods = [
        {
            name: 'Sleep Support',
            topic: 'Share sleep tips and struggles',
            createdAt: twoDaysAgo.toISOString(),
        },
        {
            name: 'Hot Flash Heroes',
            topic: 'Cooling strategies and support',
            createdAt: oneDayAgo.toISOString(),
        },
        {
            name: 'Mood & Mindfulness',
            topic: 'Mental wellness during menopause',
            createdAt: now.toISOString(),
        }
    ];

    await db.insert(pods).values(samplePods);
    
    console.log('✅ Pods seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
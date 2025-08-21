import { getDb } from '@/db';
const db = getDb();
import { conversations } from '@/db/schema';

async function main() {
    const now = new Date();

    const sampleConversations = [
        {
            title: 'Sleep Issues Discussion',
            createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 10, 0, 0).toISOString(),
            updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 10, 35, 0).toISOString(),
        },
        {
            title: 'Managing Hot Flashes',
            createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 14, 15, 0).toISOString(),
            updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 15, 0, 0).toISOString(),
        },
        {
            title: 'Mood Support Chat',
            createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 9, 30, 0).toISOString(),
            updatedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 10, 10, 0).toISOString(),
        },
    ];

    await db.insert(conversations).values(sampleConversations);

    console.log('✅ Conversations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
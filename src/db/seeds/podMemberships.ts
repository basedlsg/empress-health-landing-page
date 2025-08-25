import { getDb } from '@/db';
import { podMemberships } from '@/db/schema';

async function main() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    const fourDaysAgo = new Date(today);
    fourDaysAgo.setDate(today.getDate() - 4);
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);

    const samplePodMemberships = [
        {
            userId: 1,
            podId: 1,
            joinedAt: fiveDaysAgo.toISOString(),
        },
        {
            userId: 2,
            podId: 1,
            joinedAt: fourDaysAgo.toISOString(),
        },
        {
            userId: 3,
            podId: 1,
            joinedAt: threeDaysAgo.toISOString(),
        },
        {
            userId: 1,
            podId: 2,
            joinedAt: twoDaysAgo.toISOString(),
        },
        {
            userId: 4,
            podId: 2,
            joinedAt: yesterday.toISOString(),
        },
        {
            userId: 5,
            podId: 2,
            joinedAt: today.toISOString(),
        },
        {
            userId: 2,
            podId: 3,
            joinedAt: threeDaysAgo.toISOString(),
        },
        {
            userId: 3,
            podId: 3,
            joinedAt: twoDaysAgo.toISOString(),
        },
        {
            userId: 5,
            podId: 3,
            joinedAt: yesterday.toISOString(),
        },
    ];

    const db = getDb();
    await db.insert(podMemberships).values(samplePodMemberships);

    console.log('✅ Pod Memberships seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
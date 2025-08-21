import { getDb } from '@/db';
const db = getDb();
import { products } from '@/db/schema';

async function main() {
    const sampleProducts = [
        {
            title: 'MenoEase Evening Primrose Oil - 1300mg',
            imageUrl: 'https://img.example.com/evening-primrose-oil.jpg',
            price: 29.99,
            description: 'Pure Evening Primrose Oil known to support hormone balance and alleviate common menopause symptoms like hot flashes and night sweats. A natural source of GLA.',
            createdAt: new Date('2024-03-01T10:00:00Z').toISOString(),
        },
        {
            title: 'ChillSleep Cooling Pillow',
            imageUrl: 'https://img.example.com/cooling-pillow.jpg',
            price: 54.95,
            description: 'Experience instant relief from night sweats with our advanced gel-infused cooling pillow. Designed to regulate temperature for uninterrupted, comfortable sleep.',
            createdAt: new Date('2024-03-05T11:30:00Z').toISOString(),
        },
        {
            title: 'My Meno Journey Mindfulness Journal',
            imageUrl: 'https://img.example.com/menopause-journal.jpg',
            price: 22.50,
            description: 'A beautifully designed journal with prompts and exercises to help navigate the emotional and psychological aspects of menopause with mindfulness and self-compassion.',
            createdAt: new Date('2024-03-10T14:00:00Z').toISOString(),
        },
        {
            title: 'Harmony Balance Hormone Support Complex',
            imageUrl: 'https://img.example.com/hormone-balance-supplement.jpg',
            price: 48.75,
            description: 'A comprehensive blend of botanicals and vitamins formulated to support natural hormone balance during peri- and post-menopause, reducing discomfort.',
            createdAt: new Date('2024-03-15T09:45:00Z').toISOString(),
        },
        {
            title: 'CoolComfort Instant Cooling Towels (3-Pack)',
            imageUrl: 'https://img.example.com/cooling-towels.jpg',
            price: 24.00,
            description: 'Revolutionary cooling towels that provide immediate relief from hot flashes. Simply wet, wring, and snap for an instant cooling sensation anywhere, anytime.',
            createdAt: new Date('2024-03-20T16:20:00Z').toISOString(),
        },
        {
            title: 'The Menopause Blueprint: A Holistic Guide',
            imageUrl: 'https://img.example.com/menopause-guidebook.jpg',
            price: 26.99,
            description: 'An essential guidebook offering evidence-based strategies, lifestyle advice, and natural remedies to empower women through their menopause transition.',
            createdAt: new Date('2024-03-25T13:10:00Z').toISOString(),
        },
        {
            title: 'SereniTEA Herbal Menopause Support Blend',
            imageUrl: 'https://img.example.com/herbal-tea-menopause.jpg',
            price: 18.50,
            description: 'A soothing herbal tea carefully crafted with ingredients like red clover and black cohosh to help alleviate hot flashes, mood swings, and improve sleep.',
            createdAt: new Date('2024-03-30T10:00:00Z').toISOString(),
        },
        {
            title: 'Uplift & Calm Essential Oil Set',
            imageUrl: 'https://img.example.com/essential-oil-set.jpg',
            price: 38.00,
            description: 'A curated set of therapeutic-grade essential oils (lavender, clary sage, frankincense) designed to promote emotional balance and calm during menopause.',
            createdAt: new Date('2024-04-05T12:40:00Z').toISOString(),
        },
        {
            title: 'DreamCool Temperature Regulating Sleepwear',
            imageUrl: 'https://img.example.com/cooling-sleepwear.jpg',
            price: 59.99,
            description: 'Innovative sleepwear made from moisture-wicking, thermoregulating fabric to keep you cool and dry throughout the night, combating night sweats.',
            createdAt: new Date('2024-04-10T09:00:00Z').toISOString(),
        },
        {
            title: 'ZenFlow Meditation Cushion & Bolster Set',
            imageUrl: 'https://img.example.com/meditation-cushion.jpg',
            price: 65.00,
            description: 'Ergonomically designed meditation cushion and bolster set to support comfortable posture during mindfulness practices, aiding stress reduction and emotional well-being.',
            createdAt: new Date('2024-04-15T15:00:00Z').toISOString(),
        },
    ];

    await db.insert(products).values(sampleProducts);

    console.log('✅ Products seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
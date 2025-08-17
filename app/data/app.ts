
import { ArtType } from "@prisma/client";

import { User, ArtWork, Order, AppReview, Role, OrderStatus } from '@/app/models/artwork';

export const testimonials = [
    { message: "The painting I bought exceeded all my expectations. It adds so much life and color to my home. The artist's talent is truly remarkable!", name: "Jane D.", title: "Art Collector" },
    { message: "I've never seen such stunning photography. The quality and emotional depth of the work are incredible. It was a pleasure doing business here.", name: "Michael S.", title: "Photography Enthusiast" },
    { message: "The custom decor piece is a masterpiece! It's clear that every detail was crafted with care and passion. It's a true treasure.", name: "Sarah L.", title: "Interior Designer" },
    { message: "The painting I bought exceeded all my expectations. It adds so much life and color to my home. The artist's talent is truly remarkable!", name: "Crishtopher D.", title: "Artist" },
    { message: "I've never seen such stunning photography. The quality and emotional depth of the work are incredible. It was a pleasure doing business here.", name: "Superman S.", title: "Photography" },
    { message: "The custom decor piece is a masterpiece! It's clear that every detail was crafted with care and passion. It's a true treasure.", name: "Jannet L.", title: "Designer" },
];

export const artType = {
    Home: {
        name: 'Meaningful',
        quotes: [
            'Every art is imbued with a sense of calm and serenity. It holds a profound meaning and significance. So, feel the life in the meaningful artworks.',
            'Step into a world where imagination comes alive, and let the artworks guide you on extraordinary journeys',
            'Art enables us to find ourselves and lose ourselves at the same time. It is a journey of self-discovery and expression.',
        ],
    },
    Paintings: {
        name: 'Paintings',
        quotes: [
            'Paintings are the windows to the soul, capturing emotions and stories in vibrant colors and intricate brushstrokes.',
            'Each painting is a unique expression of creativity, inviting you to explore the depths of imagination and inspiration.',
            'Artworks evoke a sense of joy and inspiration, Make it bring a smile to your soul. Feel the life in the meaningful artworks.'
        ],
    },
    Photography: {
        name: 'Photography',
        quotes: [
            'Discover a world of positivity and warmth. Experience the enchantment and emotional depth of the artistic creations.',
            'Discover the interplay of light and shadow in the sculptures, capturing moments frozen in time, waiting to be explored'
        ],
    },
    Decors: {
        name: 'Decors',
        quotes: [
            'Decor pieces are like silent poets, adorning your space with verses of beauty and grace.',
            'Transform your space into a haven of creativity and inspiration with the captivating decor pieces.'
        ],
    },
    Artifacts: {
        name: 'Artifacts',
        quotes: [
            'Artifacts are the storytellers of history, whispering tales of cultures and civilizations long gone.',
            'Each artifact is a testament to human creativity, a bridge connecting us to our ancestors and their legacies.',
            'Experience the enchantment and emotional depth of the artistic creations'
        ]
    },
}

export const artTypes = [artType.Paintings.name, artType.Photography.name, artType.Decors.name, artType.Artifacts.name];


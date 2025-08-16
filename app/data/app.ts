
import { ArtType } from "@prisma/client";

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

export const artworksSeed = [
    // ------------------- PAINTINGS (20) -------------------
    {
        id: 1,
        artType: ArtType.Paintings,
        title: "Golden Horizon",
        description: "A warm-toned landscape that glows with late evening light. Subtle gradients guide the eye to a calm, radiant end of day.",
        images: [
            "/resources/artworks/paintings/0db4ec40387045d7b3fb6caa2b32ac3a.jpg",
            "/resources/artworks/paintings/image2_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "18x24x15",
        price: 2300,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 2,
        artType: ArtType.Paintings,
        title: "Silent Meadow",
        description: "Soft strokes and muted tones evoke a meadow at rest. The composition invites a breath and a lingering pause.",
        images: [
            "/resources/artworks/paintings/2bad5287b8041bd7895f861bef40ee25.jpg",
            "/resources/artworks/paintings/image5_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "20x28x12",
        price: 1750,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 3,
        artType: ArtType.Paintings,
        title: "Ocean Whisper",
        description: "Fluid brushwork captures the hush of rolling tides. A gentle palette carries the calm of a distant shore.",
        images: [
            "/resources/artworks/paintings/37c065859c0950e74b33487cf89d92d7.jpg",
            "/resources/artworks/paintings/home9.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "22x30x14",
        price: 2680,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 4,
        artType: ArtType.Paintings,
        title: "Ember Sky",
        description: "A blaze of color spreads across the canvas like evening embers. The layered glow hints at stories beneath the surface.",
        images: [
            "/resources/artworks/paintings/4b04439bafb8234833da05574dd221f6.jpg",
            "/resources/artworks/paintings/image4_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "24x32x18",
        price: 3150,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 5,
        artType: ArtType.Paintings,
        title: "Dream Path",
        description: "An abstract trail winds through color and light. It invites the viewer to wander and find quiet meaning.",
        images: [
            "/resources/artworks/paintings/587f4bb587fc875aaefe4799b37b2bfd.jpg",
            "/resources/artworks/paintings/painting2.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "23x31x17",
        price: 1920,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 6,
        artType: ArtType.Paintings,
        title: "Eternal Flow",
        description: "Curving forms drift across a tranquil field of color. The motion feels steady, like breath or tide.",
        images: [
            "/resources/artworks/paintings/a03582cc187c56853e4ddcfbbe6c1dff.jpg",
            "/resources/artworks/paintings/image6_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "19x27x13",
        price: 2890,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 7,
        artType: ArtType.Paintings,
        title: "Sacred Bloom",
        description: "Petals burst from a luminous heart, unfolding with grace. Light and shadow dance in quiet reverence.",
        images: [
            "/resources/artworks/paintings/eca2e065f25a1cb7b5de4402d5875bf6.jpg",
            "/resources/artworks/paintings/image7_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "26x34x16",
        price: 3420,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 8,
        artType: ArtType.Paintings,
        title: "Nature’s Heart",
        description: "Vibrant hues converge into an organic rhythm. The piece hums with life, fresh as morning air.",
        images: [
            "/resources/artworks/paintings/home0.jpg",
            "/resources/artworks/paintings/image3_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "24x30x18",
        price: 1580,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 9,
        artType: ArtType.Paintings,
        title: "Rustic Path",
        description: "Earthy brushwork maps a road through memory. The scene feels worn-in, tender, and familiar.",
        images: [
            "/resources/artworks/paintings/home7.jpeg",
            "/resources/artworks/paintings/image1_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "20x28x16",
        price: 2410,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 10,
        artType: ArtType.Paintings,
        title: "Urban Dawn",
        description: "A cool light rises over layered forms. The day begins with quiet resolve and subtle glow.",
        images: [
            "/resources/artworks/paintings/home9.jpg",
            "/resources/artworks/paintings/image8_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "22x30x14",
        price: 1710,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 11,
        artType: ArtType.Paintings,
        title: "Serenity",
        description: "Hushed color fields settle into calm balance. Edges blur like thoughts drifting into stillness.",
        images: [
            "/resources/artworks/paintings/image1_1.jpg",
            "/resources/artworks/paintings/painting1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "25x35x19",
        price: 2120,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 12,
        artType: ArtType.Paintings,
        title: "Harvest Gold",
        description: "Warm notes of ochre and wheat sway across the canvas. The ambience recalls long fields under soft sun.",
        images: [
            "/resources/artworks/paintings/image2_1.jpg",
            "/resources/artworks/paintings/home7.jpeg",
        ],
        medium: "Acrylic on canvas",
        dimension: "21x29x15",
        price: 2630,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 13,
        artType: ArtType.Paintings,
        title: "Cosmic Dance",
        description: "Celestial arcs and speckled lights spiral in motion. A sense of wonder hovers between order and play.",
        images: [
            "/resources/artworks/paintings/image3_1.jpg",
            "/resources/artworks/paintings/image6_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "26x34x18",
        price: 2980,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 14,
        artType: ArtType.Paintings,
        title: "Whispering Woods",
        description: "Shadows and greens fold into a quiet grove. The brushwork suggests leaves murmuring in breeze.",
        images: [
            "/resources/artworks/paintings/image4_1.jpg",
            "/resources/artworks/paintings/home0.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "24x32x18",
        price: 1540,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 15,
        artType: ArtType.Paintings,
        title: "River Hymn",
        description: "A ribbon of blue threads through gentle light. The cadence is calm, like a song remembered.",
        images: [
            "/resources/artworks/paintings/image5_1.jpg",
            "/resources/artworks/paintings/image2_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "22x30x14",
        price: 1870,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 16,
        artType: ArtType.Paintings,
        title: "Luminous Sky",
        description: "Streaks of brightness lift the horizon upward. A subtle radiance spreads warmth across the scene.",
        images: [
            "/resources/artworks/paintings/image6_1.jpg",
            "/resources/artworks/paintings/home9.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "30x40x20",
        price: 3410,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 17,
        artType: ArtType.Paintings,
        title: "Quiet Harmony",
        description: "Balanced shapes settle into a steady rhythm. Nothing shouts, yet everything feels present.",
        images: [
            "/resources/artworks/paintings/image7_1.jpg",
            "/resources/artworks/paintings/image1_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "18x24x15",
        price: 1510,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 18,
        artType: ArtType.Paintings,
        title: "Mystic Forest",
        description: "Veils of green and soft light suggest hidden paths. The atmosphere is hushed, alive, and inviting.",
        images: [
            "/resources/artworks/paintings/image8_1.jpg",
            "/resources/artworks/paintings/2bad5287b8041bd7895f861bef40ee25.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "24x32x18",
        price: 2790,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 19,
        artType: ArtType.Paintings,
        title: "Radiant Field",
        description: "Sunlit textures ripple across open ground. The painting glows with a gentle, patient warmth.",
        images: [
            "/resources/artworks/paintings/painting1.jpg",
            "/resources/artworks/paintings/image4_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "23x31x17",
        price: 2140,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 20,
        artType: ArtType.Paintings,
        title: "Echoes",
        description: "Minimal marks pulse like distant sound waves. Negative space lets the quiet speak clearly.",
        images: [
            "/resources/artworks/paintings/painting2.jpg",
            "/resources/artworks/paintings/home0.jpg",
        ],
        medium: "Acrylic on canvas",
        dimension: "22x30x16",
        price: 1690,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },

    {
        id: 21,
        artType: ArtType.Decors,
        title: 'Rustic Glow',
        description: 'A handcrafted decor piece that radiates rustic warmth. Perfect for adding character to living spaces and cozy corners.',
        images: [
            '/resources/artworks/decors/493ce760bc067f2530d73365ace0d66c.jpg',
            '/resources/artworks/decors/decor2.jpg',
        ],
        medium: "Handcrafted Wood",
        dimension: "18x24x15",
        price: 2600,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 22,
        artType: ArtType.Decors,
        title: 'Ceramic Charm',
        description: 'An elegant ceramic decor designed with intricate detailing. Brings sophistication and timeless beauty to your interiors.',
        images: [
            '/resources/artworks/decors/978a2ff8e7ece439569f7eca7c2f776f.jpg',
            '/resources/artworks/decors/fd5910b7fc75659465cd58d4313529fc.jpg',
        ],
        medium: "Ceramic",
        dimension: "22x30x18",
        price: 1800,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 23,
        artType: ArtType.Decors,
        title: 'Metallic Whisper',
        description: 'A sleek metal decor piece with a modern edge. Its reflective surface and abstract design make it a conversation starter.',
        images: [
            '/resources/artworks/decors/9ebf523a9c4a584f7f3ab19052bd263a.jpg',
            '/resources/artworks/decors/decor1.jpg',
        ],
        medium: "Metal Art",
        dimension: "24x28x20",
        price: 3100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 24,
        artType: ArtType.Decors,
        title: 'Stone Serenity',
        description: 'Carved with precision, this stone-inspired decor adds calmness to any room. Ideal for minimalistic and earthy interiors.',
        images: [
            '/resources/artworks/decors/9fbdd8ca3a9fd93cdfce8d76b2a5575a.jpg',
            '/resources/artworks/decors/ea13c2c2c0100262ae4b27772ac88192.jpg',
        ],
        medium: "Stone Craft",
        dimension: "20x26x19",
        price: 2700,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 25,
        artType: ArtType.Decors,
        title: 'Golden Curve',
        description: 'A decor piece with smooth golden curves that shine in natural light. Perfect for hallways and entrance spaces.',
        images: [
            '/resources/artworks/decors/a3227935a791f97d2c576a14105b2148.jpg',
            '/resources/artworks/decors/decor2.jpg',
        ],
        medium: "Mixed material",
        dimension: "25x30x22",
        price: 3500,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 26,
        artType: ArtType.Decors,
        title: 'Woodland Echo',
        description: 'A handcrafted wooden decor reflecting nature’s charm. Its rustic design is perfect for earthy and traditional homes.',
        images: [
            '/resources/artworks/decors/decor1.jpg',
            '/resources/artworks/decors/978a2ff8e7ece439569f7eca7c2f776f.jpg',
        ],
        medium: "Handcrafted Wood",
        dimension: "28x32x20",
        price: 2100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 27,
        artType: ArtType.Decors,
        title: 'Glass Mirage',
        description: 'A delicate glasswork decor that reflects light beautifully. Adds elegance and sparkle to modern interiors.',
        images: [
            '/resources/artworks/decors/decor2.jpg',
            '/resources/artworks/decors/fd5910b7fc75659465cd58d4313529fc.jpg',
        ],
        medium: "Glasswork",
        dimension: "26x30x17",
        price: 2900,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 28,
        artType: ArtType.Decors,
        title: 'Ceramic Bliss',
        description: 'An artistic ceramic piece crafted with care. Its smooth surface and unique form make it an elegant decor statement.',
        images: [
            '/resources/artworks/decors/ea13c2c2c0100262ae4b27772ac88192.jpg',
            '/resources/artworks/decors/decor1.jpg',
        ],
        medium: "Ceramic",
        dimension: "19x25x16",
        price: 2300,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 29,
        artType: ArtType.Decors,
        title: 'Eternal Bond',
        description: 'Symbolic decor piece that represents unity and connection. Perfect for couples and family-centered spaces.',
        images: [
            '/resources/artworks/decors/fd5910b7fc75659465cd58d4313529fc.jpg',
            '/resources/artworks/decors/493ce760bc067f2530d73365ace0d66c.jpg',
        ],
        medium: "Mixed material",
        dimension: "21x28x19",
        price: 2000,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 30,
        artType: ArtType.Decors,
        title: 'Mystic Flow',
        description: 'A modern decor piece with abstract flowy lines. Creates a feeling of movement and energy within your interiors.',
        images: [
            '/resources/artworks/decors/photo4_1.jpg',
            '/resources/artworks/decors/decor2.jpg',
        ],
        medium: "Metal Art",
        dimension: "24x26x18",
        price: 4000,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        id: 31,
        artType: ArtType.Decors,
        title: 'Silent Grace',
        description: 'Minimal yet captivating decor made with fine material. Designed to add grace to shelves, mantels, and side tables.',
        images: [
            '/resources/artworks/decors/photo5_1.jpg',
            '/resources/artworks/decors/9ebf523a9c4a584f7f3ab19052bd263a.jpg',
        ],
        medium: "Stone Craft",
        dimension: "23x29x20",
        price: 3200,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        id: 32,
        artType: ArtType.Photography,
        title: "Silent Shadows",
        description: "A play of light and shadow that captures the essence of calm in stillness. Subtle contrasts reveal unseen beauty.",
        images: [
            "/resources/artworks/photography/0c861a857bfe476e01d76b83f45dda71.jpg",
            "/resources/artworks/photography/photo7_1.jpg"
        ],
        medium: "DSLR",
        dimension: "18x24x15",
        price: 2500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 33,
        artType: ArtType.Photography,
        title: "Golden Fields",
        description: "Rolling fields glowing under a soft golden sun. A timeless capture of nature’s abundance and serenity.",
        images: [
            "/resources/artworks/photography/29d4475322d3f6141c14518d8da97af9.jpg",
            "/resources/artworks/photography/fc3109b44b92196e110bfd8157506877.jpg"
        ],
        medium: "Phone Camera",
        dimension: "20x28x16",
        price: 3200,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 34,
        artType: ArtType.Photography,
        title: "Ocean Mist",
        description: "Waves crash with energy as the ocean mist rises, painting the scene in ethereal beauty and strength.",
        images: [
            "/resources/artworks/photography/2a5d600bbd22829a8ac38931fb503b1a.jpg",
            "/resources/artworks/photography/home8.jpeg"
        ],
        medium: "DSLR",
        dimension: "22x30x15",
        price: 2800,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 35,
        artType: ArtType.Photography,
        title: "Quiet Reflections",
        description: "A tranquil water surface mirrors the still world around it, blending silence and depth in one frame.",
        images: [
            "/resources/artworks/photography/5146239ece0a144f15859c3758311f44.jpg",
            "/resources/artworks/photography/photo1_1.jpg"
        ],
        medium: "Phone Camera",
        dimension: "24x32x18",
        price: 1500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 36,
        artType: ArtType.Photography,
        title: "Urban Flow",
        description: "A dynamic cityscape alive with motion and rhythm. Lights, buildings, and people blend into urban poetry.",
        images: [
            "/resources/artworks/photography/662504745b02e68989c1be8166f04e93.jpg",
            "/resources/artworks/photography/photo9_1.jpg"
        ],
        medium: "DSLR",
        dimension: "26x34x15",
        price: 4100,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 37,
        artType: ArtType.Photography,
        title: "Rustic Path",
        description: "A forgotten path lined with nature’s embrace, evoking nostalgia and stories untold.",
        images: [
            "/resources/artworks/photography/70058b2ae0758ebbcc002e338000d13b.jpg",
            "/resources/artworks/photography/photo2_1.jpg"
        ],
        medium: "Phone Camera",
        dimension: "19x26x14",
        price: 2100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 38,
        artType: ArtType.Photography,
        title: "Still Waters",
        description: "The beauty of a lake at dawn, untouched by movement, reflects a sense of inner calm.",
        images: [
            "/resources/artworks/photography/791d3307f91c271760a0fb88c5593653.jpg",
            "/resources/artworks/photography/photo8_1.jpg"
        ],
        medium: "DSLR",
        dimension: "25x33x17",
        price: 3500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 39,
        artType: ArtType.Photography,
        title: "Desert Glow",
        description: "Golden sands bathed in evening light create an otherworldly glow that feels timeless and infinite.",
        images: [
            "/resources/artworks/photography/a5aa898d40fa44bb3a96e078cdeee891.jpg",
            "/resources/artworks/photography/photo10_1.jpg"
        ],
        medium: "Phone Camera",
        dimension: "21x29x15",
        price: 2700,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 40,
        artType: ArtType.Photography,
        title: "Broken Silence",
        description: "An abandoned place where silence speaks louder than words. Cracks and textures tell forgotten tales.",
        images: [
            "/resources/artworks/photography/bbb53c38a2aa12f78bddd4ebbfb39566.jpg",
            "/resources/artworks/photography/home5.jpeg"
        ],
        medium: "DSLR",
        dimension: "23x31x15",
        price: 1900,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 41,
        artType: ArtType.Photography,
        title: "Mountain Veil",
        description: "Mist rolls gently over peaks, softening their strength with a delicate veil of nature’s artistry.",
        images: [
            "/resources/artworks/photography/cd4777adbaca66df02b0c6f740f5f827.jpg",
            "/resources/artworks/photography/Photography-1753965111942-pexel.jpg"
        ],
        medium: "DSLR",
        dimension: "24x36x18",
        price: 4500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 42,
        artType: ArtType.Photography,
        title: "Golden Hour",
        description: "The warmth of sunset spreads across the frame, bathing the world in glowing amber light.",
        images: [
            "/resources/artworks/photography/f2af0d1d714e26dde022cb793f260625.jpg",
            "/resources/artworks/photography/photo1.jpg"
        ],
        medium: "Phone Camera",
        dimension: "22x28x14",
        price: 3000,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 43,
        artType: ArtType.Photography,
        title: "Old Streets",
        description: "A timeless alleyway frozen in memory. Every stone whispers stories of the people who passed through.",
        images: [
            "/resources/artworks/photography/f9ae2b3fe38e9dcc75563eb4c189cbd9.jpg",
            "/resources/artworks/photography/Photography-1753965111946-pexel.jpg"
        ],
        medium: "Phone Camera",
        dimension: "18x26x13",
        price: 2600,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 44,
        artType: ArtType.Photography,
        title: "Light Trails",
        description: "A dance of lights across the night sky as motion and stillness collide in vivid color.",
        images: [
            "/resources/artworks/photography/fc3109b44b92196e110bfd8157506877.jpg",
            "/resources/artworks/photography/photo2.jpg"
        ],
        medium: "DSLR",
        dimension: "26x38x17",
        price: 4800,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 45,
        artType: ArtType.Photography,
        title: "Rustic Home",
        description: "A cozy frame of an old home, capturing warmth and nostalgia in familiar textures and colors.",
        images: [
            "/resources/artworks/photography/home5.jpeg",
            "/resources/artworks/photography/photo7_1.jpg"
        ],
        medium: "Phone Camera",
        dimension: "21x30x14",
        price: 2000,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 46,
        artType: ArtType.Photography,
        title: "Evening Glow",
        description: "Soft twilight colors wash over rooftops, creating a dreamy calmness at the end of the day.",
        images: [
            "/resources/artworks/photography/home8.jpeg",
            "/resources/artworks/photography/29d4475322d3f6141c14518d8da97af9.jpg"
        ],
        medium: "DSLR",
        dimension: "20x27x16",
        price: 2900,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 47,
        artType: ArtType.Photography,
        title: "Street Rhythm",
        description: "Everyday moments framed in perfect rhythm. A story of people, time, and place intertwined.",
        images: [
            "/resources/artworks/photography/photo1.jpg",
            "/resources/artworks/photography/a5aa898d40fa44bb3a96e078cdeee891.jpg"
        ],
        medium: "Phone Camera",
        dimension: "19x25x13",
        price: 1400,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 48,
        artType: ArtType.Photography,
        title: "Morning Steps",
        description: "Sunlight peeks through buildings as footsteps echo in narrow streets, welcoming a new day.",
        images: [
            "/resources/artworks/photography/photo10_1.jpg",
            "/resources/artworks/photography/791d3307f91c271760a0fb88c5593653.jpg"
        ],
        medium: "DSLR",
        dimension: "23x28x15",
        price: 2200,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 49,
        artType: ArtType.Photography,
        title: "Hidden Corners",
        description: "A quiet frame tucked away from the world, where forgotten corners breathe new stories.",
        images: [
            "/resources/artworks/photography/photo1_1.jpg",
            "/resources/artworks/photography/cd4777adbaca66df02b0c6f740f5f827.jpg"
        ],
        medium: "Phone Camera",
        dimension: "24x32x15",
        price: 1700,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 50,
        artType: ArtType.Photography,
        title: "Crossroads",
        description: "A symbolic frame where paths meet, reflecting choices and journeys yet to unfold.",
        images: [
            "/resources/artworks/photography/photo2.jpg",
            "/resources/artworks/photography/f9ae2b3fe38e9dcc75563eb4c189cbd9.jpg"
        ],
        medium: "DSLR",
        dimension: "20x28x14",
        price: 2600,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 51,
        artType: ArtType.Photography,
        title: "City Lights",
        description: "The city glows at night, alive with energy and stories in every corner of light and shadow.",
        images: [
            "/resources/artworks/photography/photo2_1.jpg",
            "/resources/artworks/photography/f2af0d1d714e26dde022cb793f260625.jpg"
        ],
        medium: "Phone Camera",
        dimension: "22x30x15",
        price: 3300,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 52,
        artType: ArtType.Photography,
        title: "Evening Walk",
        description: "Streets light up as footsteps blend with twilight, weaving together a gentle urban rhythm.",
        images: [
            "/resources/artworks/photography/photo7_1.jpg",
            "/resources/artworks/photography/5146239ece0a144f15859c3758311f44.jpg"
        ],
        medium: "DSLR",
        dimension: "21x29x16",
        price: 1800,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 53,
        artType: ArtType.Photography,
        title: "Sky Hues",
        description: "Shifting colors of dusk paint the sky in hues that inspire both calm and wonder.",
        images: [
            "/resources/artworks/photography/photo8_1.jpg",
            "/resources/artworks/photography/home8.jpeg"
        ],
        medium: "Phone Camera",
        dimension: "23x34x18",
        price: 2700,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 54,
        artType: ArtType.Photography,
        title: "Quiet Alley",
        description: "An alleyway caught in silence, where light meets shadow in simple harmony.",
        images: [
            "/resources/artworks/photography/photo9_1.jpg",
            "/resources/artworks/photography/662504745b02e68989c1be8166f04e93.jpg"
        ],
        medium: "DSLR",
        dimension: "25x32x15",
        price: 1500,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 55,
        artType: ArtType.Photography,
        title: "Nature’s Frame",
        description: "Greenery wraps around the scene like a frame, highlighting the untouched core of nature.",
        images: [
            "/resources/artworks/photography/Photography-1753965111939-pexel.jpg",
            "/resources/artworks/photography/home5.jpeg"
        ],
        medium: "Phone Camera",
        dimension: "19x28x14",
        price: 2100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        id: 56,
        artType: ArtType.Photography,
        title: "Stone Steps",
        description: "Ancient stone steps leading upward, layered with time, patience, and untold stories.",
        images: [
            "/resources/artworks/photography/Photography-1753965111942-pexel.jpg",
            "/resources/artworks/photography/fc3109b44b92196e110bfd8157506877.jpg"
        ],
        medium: "DSLR",
        dimension: "24x30x17",
        price: 3500,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        id: 57,
        artType: ArtType.Photography,
        title: "Morning Calm",
        description: "The world awakes slowly as light pours into a landscape of stillness and peace.",
        images: [
            "/resources/artworks/photography/Photography-1753965111946-pexel.jpg",
            "/resources/artworks/photography/photo10_1.jpg"
        ],
        medium: "Phone Camera",
        dimension: "20x28x15",
        price: 2400,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    }
];


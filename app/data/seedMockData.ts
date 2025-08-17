import { AppReview, ArtType, Artwork, Order, OrderStatus, Role, User } from "@prisma/client";

export const mockArtworks = [
    // ------------------- PAINTINGS (20) -------------------
    {
        artType: "Paintings",
        title: "Golden Horizon",
        description: "A warm-toned landscape that glows with late evening light. Subtle gradients guide the eye to a calm, radiant end of day.",
        images: [
            "/resources/artworks/paintings/0db4ec40387045d7b3fb6caa2b32ac3a.jpg",
            "/resources/artworks/paintings/image2_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "18x24x15",
        price: 2300,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Paintings",
        title: "Silent Meadow",
        description: "Soft strokes and muted tones evoke a meadow at rest. The composition invites a breath and a lingering pause.",
        images: [
            "/resources/artworks/paintings/2bad5287b8041bd7895f861bef40ee25.jpg",
            "/resources/artworks/paintings/image5_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "20x28x12",
        price: 1750,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Ocean Whisper",
        description: "Fluid brushwork captures the hush of rolling tides. A gentle palette carries the calm of a distant shore.",
        images: [
            "/resources/artworks/paintings/37c065859c0950e74b33487cf89d92d7.jpg",
            "/resources/artworks/paintings/home9.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "22x30x14",
        price: 2680,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Ember Sky",
        description: "A blaze of color spreads across the canvas like evening embers. The layered glow hints at stories beneath the surface.",
        images: [
            "/resources/artworks/paintings/4b04439bafb8234833da05574dd221f6.jpg",
            "/resources/artworks/paintings/image4_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "24x32x18",
        price: 3150,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Dream Path",
        description: "An abstract trail winds through color and light. It invites the viewer to wander and find quiet meaning.",
        images: [
            "/resources/artworks/paintings/587f4bb587fc875aaefe4799b37b2bfd.jpg",
            "/resources/artworks/paintings/painting2.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "23x31x17",
        price: 1920,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Eternal Flow",
        description: "Curving forms drift across a tranquil field of color. The motion feels steady, like breath or tide.",
        images: [
            "/resources/artworks/paintings/a03582cc187c56853e4ddcfbbe6c1dff.jpg",
            "/resources/artworks/paintings/image6_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "19x27x13",
        price: 2890,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Sacred Bloom",
        description: "Petals burst from a luminous heart, unfolding with grace. Light and shadow dance in quiet reverence.",
        images: [
            "/resources/artworks/paintings/eca2e065f25a1cb7b5de4402d5875bf6.jpg",
            "/resources/artworks/paintings/image7_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "26x34x16",
        price: 3420,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Nature’s Heart",
        description: "Vibrant hues converge into an organic rhythm. The piece hums with life, fresh as morning air.",
        images: [
            "/resources/artworks/paintings/home0.jpg",
            "/resources/artworks/paintings/image3_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "24x30x18",
        price: 1580,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Rustic Path",
        description: "Earthy brushwork maps a road through memory. The scene feels worn-in, tender, and familiar.",
        images: [
            "/resources/artworks/paintings/home7.jpeg",
            "/resources/artworks/paintings/image1_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "20x28x16",
        price: 2410,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Urban Dawn",
        description: "A cool light rises over layered forms. The day begins with quiet resolve and subtle glow.",
        images: [
            "/resources/artworks/paintings/home9.jpg",
            "/resources/artworks/paintings/image8_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "22x30x14",
        price: 1710,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Serenity",
        description: "Hushed color fields settle into calm balance. Edges blur like thoughts drifting into stillness.",
        images: [
            "/resources/artworks/paintings/image1_1.jpg",
            "/resources/artworks/paintings/painting1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "25x35x19",
        price: 2120,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Harvest Gold",
        description: "Warm notes of ochre and wheat sway across the canvas. The ambience recalls long fields under soft sun.",
        images: [
            "/resources/artworks/paintings/image2_1.jpg",
            "/resources/artworks/paintings/home7.jpeg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "21x29x15",
        price: 2630,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Cosmic Dance",
        description: "Celestial arcs and speckled lights spiral in motion. A sense of wonder hovers between order and play.",
        images: [
            "/resources/artworks/paintings/image3_1.jpg",
            "/resources/artworks/paintings/image6_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "26x34x18",
        price: 2980,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Whispering Woods",
        description: "Shadows and greens fold into a quiet grove. The brushwork suggests leaves murmuring in breeze.",
        images: [
            "/resources/artworks/paintings/image4_1.jpg",
            "/resources/artworks/paintings/home0.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "24x32x18",
        price: 1540,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "River Hymn",
        description: "A ribbon of blue threads through gentle light. The cadence is calm, like a song remembered.",
        images: [
            "/resources/artworks/paintings/image5_1.jpg",
            "/resources/artworks/paintings/image2_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "22x30x14",
        price: 1870,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Luminous Sky",
        description: "Streaks of brightness lift the horizon upward. A subtle radiance spreads warmth across the scene.",
        images: [
            "/resources/artworks/paintings/image6_1.jpg",
            "/resources/artworks/paintings/home9.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "30x40x20",
        price: 3410,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Quiet Harmony",
        description: "Balanced shapes settle into a steady rhythm. Nothing shouts, yet everything feels present.",
        images: [
            "/resources/artworks/paintings/image7_1.jpg",
            "/resources/artworks/paintings/image1_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "18x24x15",
        price: 1510,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Mystic Forest",
        description: "Veils of green and soft light suggest hidden paths. The atmosphere is hushed, alive, and inviting.",
        images: [
            "/resources/artworks/paintings/image8_1.jpg",
            "/resources/artworks/paintings/2bad5287b8041bd7895f861bef40ee25.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "24x32x18",
        price: 2790,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Radiant Field",
        description: "Sunlit textures ripple across open ground. The painting glows with a gentle, patient warmth.",
        images: [
            "/resources/artworks/paintings/painting1.jpg",
            "/resources/artworks/paintings/image4_1.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "23x31x17",
        price: 2140,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Paintings",
        title: "Echoes",
        description: "Minimal marks pulse like distant sound waves. Negative space lets the quiet speak clearly.",
        images: [
            "/resources/artworks/paintings/painting2.jpg",
            "/resources/artworks/paintings/home0.jpg",
        ],
        medium: "Acrylic on canvas",
        dimensions: "22x30x16",
        price: 1690,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },

    {
        artType: "Decors",
        title: 'Rustic Glow',
        description: 'A handcrafted decor piece that radiates rustic warmth. Perfect for adding character to living spaces and cozy corners.',
        images: [
            '/resources/artworks/decors/493ce760bc067f2530d73365ace0d66c.jpg',
            '/resources/artworks/decors/decor2.jpg',
        ],
        medium: "Handcrafted Wood",
        dimensions: "18x24x15",
        price: 2600,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Ceramic Charm',
        description: 'An elegant ceramic decor designed with intricate detailing. Brings sophistication and timeless beauty to your interiors.',
        images: [
            '/resources/artworks/decors/978a2ff8e7ece439569f7eca7c2f776f.jpg',
            '/resources/artworks/decors/fd5910b7fc75659465cd58d4313529fc.jpg',
        ],
        medium: "Ceramic",
        dimensions: "22x30x18",
        price: 1800,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Metallic Whisper',
        description: 'A sleek metal decor piece with a modern edge. Its reflective surface and abstract design make it a conversation starter.',
        images: [
            '/resources/artworks/decors/9ebf523a9c4a584f7f3ab19052bd263a.jpg',
            '/resources/artworks/decors/decor1.jpg',
        ],
        medium: "Metal Art",
        dimensions: "24x28x20",
        price: 3100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Stone Serenity',
        description: 'Carved with precision, this stone-inspired decor adds calmness to any room. Ideal for minimalistic and earthy interiors.',
        images: [
            '/resources/artworks/decors/9fbdd8ca3a9fd93cdfce8d76b2a5575a.jpg',
            '/resources/artworks/decors/ea13c2c2c0100262ae4b27772ac88192.jpg',
        ],
        medium: "Stone Craft",
        dimensions: "20x26x19",
        price: 2700,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Golden Curve',
        description: 'A decor piece with smooth golden curves that shine in natural light. Perfect for hallways and entrance spaces.',
        images: [
            '/resources/artworks/decors/a3227935a791f97d2c576a14105b2148.jpg',
            '/resources/artworks/decors/decor2.jpg',
        ],
        medium: "Mixed material",
        dimensions: "25x30x22",
        price: 3500,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Woodland Echo',
        description: 'A handcrafted wooden decor reflecting nature’s charm. Its rustic design is perfect for earthy and traditional homes.',
        images: [
            '/resources/artworks/decors/decor1.jpg',
            '/resources/artworks/decors/978a2ff8e7ece439569f7eca7c2f776f.jpg',
        ],
        medium: "Handcrafted Wood",
        dimensions: "28x32x20",
        price: 2100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Glass Mirage',
        description: 'A delicate glasswork decor that reflects light beautifully. Adds elegance and sparkle to modern interiors.',
        images: [
            '/resources/artworks/decors/decor2.jpg',
            '/resources/artworks/decors/fd5910b7fc75659465cd58d4313529fc.jpg',
        ],
        medium: "Glasswork",
        dimensions: "26x30x17",
        price: 2900,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Ceramic Bliss',
        description: 'An artistic ceramic piece crafted with care. Its smooth surface and unique form make it an elegant decor statement.',
        images: [
            '/resources/artworks/decors/ea13c2c2c0100262ae4b27772ac88192.jpg',
            '/resources/artworks/decors/decor1.jpg',
        ],
        medium: "Ceramic",
        dimensions: "19x25x16",
        price: 2300,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Eternal Bond',
        description: 'Symbolic decor piece that represents unity and connection. Perfect for couples and family-centered spaces.',
        images: [
            '/resources/artworks/decors/fd5910b7fc75659465cd58d4313529fc.jpg',
            '/resources/artworks/decors/493ce760bc067f2530d73365ace0d66c.jpg',
        ],
        medium: "Mixed material",
        dimensions: "21x28x19",
        price: 2000,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Mystic Flow',
        description: 'A modern decor piece with abstract flowy lines. Creates a feeling of movement and energy within your interiors.',
        images: [
            '/resources/artworks/decors/photo4_1.jpg',
            '/resources/artworks/decors/decor2.jpg',
        ],
        medium: "Metal Art",
        dimensions: "24x26x18",
        price: 4000,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Decors",
        title: 'Silent Grace',
        description: 'Minimal yet captivating decor made with fine material. Designed to add grace to shelves, mantels, and side tables.',
        images: [
            '/resources/artworks/decors/photo5_1.jpg',
            '/resources/artworks/decors/9ebf523a9c4a584f7f3ab19052bd263a.jpg',
        ],
        medium: "Stone Craft",
        dimensions: "23x29x20",
        price: 3200,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false,
    },
    {
        artType: "Photography",
        title: "Silent Shadows",
        description: "A play of light and shadow that captures the essence of calm in stillness. Subtle contrasts reveal unseen beauty.",
        images: [
            "/resources/artworks/photography/0c861a857bfe476e01d76b83f45dda71.jpg",
            "/resources/artworks/photography/photo7_1.jpg"
        ],
        medium: "DSLR",
        dimensions: "18x24x15",
        price: 2500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Golden Fields",
        description: "Rolling fields glowing under a soft golden sun. A timeless capture of nature’s abundance and serenity.",
        images: [
            "/resources/artworks/photography/29d4475322d3f6141c14518d8da97af9.jpg",
            "/resources/artworks/photography/fc3109b44b92196e110bfd8157506877.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "20x28x16",
        price: 3200,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Ocean Mist",
        description: "Waves crash with energy as the ocean mist rises, painting the scene in ethereal beauty and strength.",
        images: [
            "/resources/artworks/photography/2a5d600bbd22829a8ac38931fb503b1a.jpg",
            "/resources/artworks/photography/home8.jpeg"
        ],
        medium: "DSLR",
        dimensions: "22x30x15",
        price: 2800,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Quiet Reflections",
        description: "A tranquil water surface mirrors the still world around it, blending silence and depth in one frame.",
        images: [
            "/resources/artworks/photography/5146239ece0a144f15859c3758311f44.jpg",
            "/resources/artworks/photography/photo1_1.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "24x32x18",
        price: 1500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Urban Flow",
        description: "A dynamic cityscape alive with motion and rhythm. Lights, buildings, and people blend into urban poetry.",
        images: [
            "/resources/artworks/photography/662504745b02e68989c1be8166f04e93.jpg",
            "/resources/artworks/photography/photo9_1.jpg"
        ],
        medium: "DSLR",
        dimensions: "26x34x15",
        price: 4100,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Rustic Path",
        description: "A forgotten path lined with nature’s embrace, evoking nostalgia and stories untold.",
        images: [
            "/resources/artworks/photography/70058b2ae0758ebbcc002e338000d13b.jpg",
            "/resources/artworks/photography/photo2_1.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "19x26x14",
        price: 2100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Still Waters",
        description: "The beauty of a lake at dawn, untouched by movement, reflects a sense of inner calm.",
        images: [
            "/resources/artworks/photography/791d3307f91c271760a0fb88c5593653.jpg",
            "/resources/artworks/photography/photo8_1.jpg"
        ],
        medium: "DSLR",
        dimensions: "25x33x17",
        price: 3500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Desert Glow",
        description: "Golden sands bathed in evening light create an otherworldly glow that feels timeless and infinite.",
        images: [
            "/resources/artworks/photography/a5aa898d40fa44bb3a96e078cdeee891.jpg",
            "/resources/artworks/photography/photo10_1.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "21x29x15",
        price: 2700,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Broken Silence",
        description: "An abandoned place where silence speaks louder than words. Cracks and textures tell forgotten tales.",
        images: [
            "/resources/artworks/photography/bbb53c38a2aa12f78bddd4ebbfb39566.jpg",
            "/resources/artworks/photography/home5.jpeg"
        ],
        medium: "DSLR",
        dimensions: "23x31x15",
        price: 1900,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Mountain Veil",
        description: "Mist rolls gently over peaks, softening their strength with a delicate veil of nature’s artistry.",
        images: [
            "/resources/artworks/photography/cd4777adbaca66df02b0c6f740f5f827.jpg",
            "/resources/artworks/photography/Photography-1753965111942-pexel.jpg"
        ],
        medium: "DSLR",
        dimensions: "24x36x18",
        price: 4500,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Golden Hour",
        description: "The warmth of sunset spreads across the frame, bathing the world in glowing amber light.",
        images: [
            "/resources/artworks/photography/f2af0d1d714e26dde022cb793f260625.jpg",
            "/resources/artworks/photography/photo1.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "22x28x14",
        price: 3000,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Old Streets",
        description: "A timeless alleyway frozen in memory. Every stone whispers stories of the people who passed through.",
        images: [
            "/resources/artworks/photography/f9ae2b3fe38e9dcc75563eb4c189cbd9.jpg",
            "/resources/artworks/photography/Photography-1753965111946-pexel.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "18x26x13",
        price: 2600,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Light Trails",
        description: "A dance of lights across the night sky as motion and stillness collide in vivid color.",
        images: [
            "/resources/artworks/photography/fc3109b44b92196e110bfd8157506877.jpg",
            "/resources/artworks/photography/photo2.jpg"
        ],
        medium: "DSLR",
        dimensions: "26x38x17",
        price: 4800,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Rustic Home",
        description: "A cozy frame of an old home, capturing warmth and nostalgia in familiar textures and colors.",
        images: [
            "/resources/artworks/photography/home5.jpeg",
            "/resources/artworks/photography/photo7_1.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "21x30x14",
        price: 2000,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Evening Glow",
        description: "Soft twilight colors wash over rooftops, creating a dreamy calmness at the end of the day.",
        images: [
            "/resources/artworks/photography/home8.jpeg",
            "/resources/artworks/photography/29d4475322d3f6141c14518d8da97af9.jpg"
        ],
        medium: "DSLR",
        dimensions: "20x27x16",
        price: 2900,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Street Rhythm",
        description: "Everyday moments framed in perfect rhythm. A story of people, time, and place intertwined.",
        images: [
            "/resources/artworks/photography/photo1.jpg",
            "/resources/artworks/photography/a5aa898d40fa44bb3a96e078cdeee891.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "19x25x13",
        price: 1400,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Morning Steps",
        description: "Sunlight peeks through buildings as footsteps echo in narrow streets, welcoming a new day.",
        images: [
            "/resources/artworks/photography/photo10_1.jpg",
            "/resources/artworks/photography/791d3307f91c271760a0fb88c5593653.jpg"
        ],
        medium: "DSLR",
        dimensions: "23x28x15",
        price: 2200,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Hidden Corners",
        description: "A quiet frame tucked away from the world, where forgotten corners breathe new stories.",
        images: [
            "/resources/artworks/photography/photo1_1.jpg",
            "/resources/artworks/photography/cd4777adbaca66df02b0c6f740f5f827.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "24x32x15",
        price: 1700,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Crossroads",
        description: "A symbolic frame where paths meet, reflecting choices and journeys yet to unfold.",
        images: [
            "/resources/artworks/photography/photo2.jpg",
            "/resources/artworks/photography/f9ae2b3fe38e9dcc75563eb4c189cbd9.jpg"
        ],
        medium: "DSLR",
        dimensions: "20x28x14",
        price: 2600,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "City Lights",
        description: "The city glows at night, alive with energy and stories in every corner of light and shadow.",
        images: [
            "/resources/artworks/photography/photo2_1.jpg",
            "/resources/artworks/photography/f2af0d1d714e26dde022cb793f260625.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "22x30x15",
        price: 3300,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Evening Walk",
        description: "Streets light up as footsteps blend with twilight, weaving together a gentle urban rhythm.",
        images: [
            "/resources/artworks/photography/photo7_1.jpg",
            "/resources/artworks/photography/5146239ece0a144f15859c3758311f44.jpg"
        ],
        medium: "DSLR",
        dimensions: "21x29x16",
        price: 1800,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Sky Hues",
        description: "Shifting colors of dusk paint the sky in hues that inspire both calm and wonder.",
        images: [
            "/resources/artworks/photography/photo8_1.jpg",
            "/resources/artworks/photography/home8.jpeg"
        ],
        medium: "Phone Camera",
        dimensions: "23x34x18",
        price: 2700,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Quiet Alley",
        description: "An alleyway caught in silence, where light meets shadow in simple harmony.",
        images: [
            "/resources/artworks/photography/photo9_1.jpg",
            "/resources/artworks/photography/662504745b02e68989c1be8166f04e93.jpg"
        ],
        medium: "DSLR",
        dimensions: "25x32x15",
        price: 1500,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Nature’s Frame",
        description: "Greenery wraps around the scene like a frame, highlighting the untouched core of nature.",
        images: [
            "/resources/artworks/photography/Photography-1753965111939-pexel.jpg",
            "/resources/artworks/photography/home5.jpeg"
        ],
        medium: "Phone Camera",
        dimensions: "19x28x14",
        price: 2100,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Stone Steps",
        description: "Ancient stone steps leading upward, layered with time, patience, and untold stories.",
        images: [
            "/resources/artworks/photography/Photography-1753965111942-pexel.jpg",
            "/resources/artworks/photography/fc3109b44b92196e110bfd8157506877.jpg"
        ],
        medium: "DSLR",
        dimensions: "24x30x17",
        price: 3500,
        artistName: "Ramachandra", likes: 25,
        isHidden: false,
        isSold: false
    },
    {
        artType: "Photography",
        title: "Morning Calm",
        description: "The world awakes slowly as light pours into a landscape of stillness and peace.",
        images: [
            "/resources/artworks/photography/Photography-1753965111946-pexel.jpg",
            "/resources/artworks/photography/photo10_1.jpg"
        ],
        medium: "Phone Camera",
        dimensions: "20x28x15",
        price: 2400,
        artistName: "Jinraj", likes: 15,
        isHidden: false,
        isSold: false
    }
];

// Mock User Data based on the provided schema
export const mockUsers: User[] = [
    {
        id: 'user_1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        role: Role.Customer,
        isApproved: false,
        approvedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'artist_1',
        name: 'Leo da Vinci',
        email: 'leo.davinci@example.com',
        password: 'password',
        city: 'London',
        state: 'England',
        country: 'UK',
        role: Role.Artist,
        isApproved: false,
        approvedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'admin_1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        role: Role.Admin,
        isApproved: false,
        approvedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

// Mock Order Data based on the provided schema
export const mockOrders: Order[] = [
    {
        id: "order_001",
        userId: "user_123",
        totalAmount: 240.5,
        status: OrderStatus.Pending,
        orderedAt: new Date("2025-01-10"),
        updatedAt: new Date("2025-01-12"),
        items: [
            { id: "oi_001", orderId: "order_001", artworkId: "art_101", quantity: 2, priceAtPurchase: 50 },
            { id: "oi_002", orderId: "order_001", artworkId: "art_102", quantity: 1, priceAtPurchase: 140.5 },
        ],
    },
    {
        id: "order_002",
        userId: "user_456",
        totalAmount: 320,
        status: OrderStatus.Completed,
        orderedAt: new Date("2025-01-05"),
        updatedAt: new Date("2025-01-07"),
        items: [
            { id: "oi_003", orderId: "order_002", artworkId: "art_201", quantity: 4, priceAtPurchase: 80 },
        ],
    },
    {
        id: "order_003",
        userId: "user_789",
        totalAmount: 99.99,
        status: OrderStatus.Cancelled,
        orderedAt: new Date("2025-01-02"),
        updatedAt: new Date("2025-01-03"),
        items: [
            { id: "oi_004", orderId: "order_003", artworkId: "art_301", quantity: 1, priceAtPurchase: 99.99 },
        ],
    },
];
// Mock AppReview Data based on the provided schema
export const mockReviews: AppReview[] = [
    {
        id: 'review_1',
        userId: 'user_1',
        rating: 5,
        comment: 'Absolutely stunning! The new features are great.',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'review_2',
        userId: 'artist_1',
        rating: 4,
        comment: 'Great app, easy to use.',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
        updatedAt: new Date(),
    },
];
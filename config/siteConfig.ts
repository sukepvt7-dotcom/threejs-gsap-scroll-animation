export type StoryScene = {
  word: string;
  caption: string;
  supporting: string;
  image: string;
  accent: string;
};

export type Product = {
  name: string;
  price: string;
  frontImage: string;
  backImage: string;
  tag: string;
};

export const siteConfig = {
  brand: {
    name: "SOKKA",
    tagline: "Tamil identity in motion",
    description:
      "SOKKA is a premium streetwear label blending Tamil identity, emotional storytelling, and modern silhouettes."
  },
  theme: {
    primary: "#ff4c2e",
    secondary: "#f5f0e8",
    surface: "#050505",
    muted: "#9c948a"
  },
  hero: {
    eyebrow: "Tamil streetwear / engineered emotion",
    headingTop: "Not Just Clothing.",
    headingBottom: "Identity.",
    body:
      "Minimal silhouettes, charged graphics, and a cinematic Tamil core built to move through the city with presence.",
    primaryCta: "Shop Now",
    secondaryCta: "Explore The Drop",
    backgroundImage: "/assets/sokka/hero-bg.jpg",
    spotlightImage: "/assets/sokka/lookbook-3.png"
  },
  lookbook: [
    "/assets/sokka/lookbook-1.png",
    "/assets/sokka/lookbook-2.png",
    "/assets/sokka/lookbook-3.png"
  ],
  storyScenes: [
    {
      word: "NIMMADHI",
      caption: "Calm is power held with intent.",
      supporting:
        "The silhouette slows down, the fabric moves closer, and every fold feels deliberate before the next impact lands.",
      image: "/assets/sokka/drop-10.jpg",
      accent: "#d7a2ff"
    },
    {
      word: "AATTAM",
      caption: "Motion becomes ritual.",
      supporting:
        "Rotation, rhythm, and tension build like a crowd before the drop. Streetwear becomes body language.",
      image: "/assets/sokka/lookbook-2.png",
      accent: "#4cc9ff"
    },
    {
      word: "VEERAM",
      caption: "Courage is worn on the outside.",
      supporting:
        "The final chapter hits with sharper contrast, heavier glow, and a stance that feels unapologetically SOKKA.",
      image: "/assets/sokka/lookbook-1.png",
      accent: "#ff4c2e"
    }
  ] satisfies StoryScene[],
  products: [
    {
      name: "Maanithan",
      price: "Rs. 1,899",
      frontImage: "/assets/sokka/drop-1.jpg",
      backImage: "/assets/sokka/lookbook-1.png",
      tag: "Ritual / Fire"
    },
    {
      name: "Nimmadhi",
      price: "Rs. 1,699",
      frontImage: "/assets/sokka/drop-10.jpg",
      backImage: "/assets/sokka/drop-11.jpg",
      tag: "Calm / Pressure"
    },
    {
      name: "Self Kaadhal",
      price: "Rs. 1,999",
      frontImage: "/assets/sokka/drop-6.jpg",
      backImage: "/assets/sokka/lookbook-3.png",
      tag: "Reflection / Steel"
    },
    {
      name: "Megam & Anbil",
      price: "Rs. 2,099",
      frontImage: "/assets/sokka/drop-14.jpg",
      backImage: "/assets/sokka/lookbook-2.png",
      tag: "Duality / Sky"
    }
  ] satisfies Product[],
  socialProof: {
    title: "Built for movement. Worn by athletes.",
    description:
      "From early training sessions to late-night city runs, SOKKA pieces stay clean, graphic, and unapologetically visible.",
    logos: ["Track", "Streetball", "Calisthenics", "Studio", "Crew"],
    quotes: [
      "The graphics feel cultural, not costume.",
      "Strong enough for movement, clean enough for every day.",
      "You notice the silhouette before you read the print."
    ]
  },
  cta: {
    eyebrow: "Drop 01",
    lineOne: "You Don't Wear SOKKA.",
    lineTwo: "You Represent It.",
    action: "Shop Now"
  }
} as const;

export const weddingConfig = {
  couple: {
    groomFirstName: "Renz",
    groomFullName: "Renz",
    brideFirstName: "Jen",
    brideFullName: "Jen",
    initials: "R & J",
    compactInitials: "RJ",
    hashtag: "#RenzAndJen2026",
  },

  event: {
    dateTime: "2026-12-10T15:00:00+08:00",
    dateLabel: "December 10, 2026",
    shortDateLabel: "12.10.26",
    timeLabel: "3:00 PM",
    timezone: "Asia/Manila",
    timezoneLabel: "Philippine Standard Time",
    rsvpDeadline: "2026-11-10T23:59:59+08:00",
    rsvpDeadlineLabel: "November 10, 2026",
  },

  ceremony: {
    venue: "El Roi Events Place and Resort at Casa Concepcion",
    address: "",
    timeLabel: "3:00 PM",
    mapUrl: "",
  },

  reception: {
    venue: "El Roi Events Place and Resort at Casa Concepcion",
    address: "",
    timeLabel: "5:00 PM",
    mapUrl: "",
  },

  story: {
    title: "Our Story",
    subtitle: "A journey that led us here",
    paragraphs: [
      "Our story began with a simple meeting that slowly became something much more meaningful.",
      "Through every season, our friendship, trust, and commitment continued to grow.",
      "Now, we are grateful to begin our next chapter together and celebrate this moment with the people we love.",
    ],
    milestones: [
      {
        year: "The Beginning",
        title: "Where It All Started",
        description:
          "A simple meeting became the beginning of a meaningful and lasting connection.",
      },
      {
        year: "The Journey",
        title: "Growing Together",
        description:
          "Through shared experiences and important milestones, our relationship continued to deepen.",
      },
      {
        year: "Forever",
        title: "The Next Chapter",
        description:
          "We now look forward to building a life together and celebrating our wedding with family and friends.",
      },
    ],
  },

  dressCode: {
    title: "Attire Guide",
    description:
      "We would love to see you in your best",
    attire: "Garden Cocktail Attire",
    men:
      "Suit, long-sleeved formal shirt, trousers, and formal shoes are recommended.",
    women:
      "Long dress, midi dress, or elegant formal coordinates are recommended.",
    reminder:
      "We kindly ask our guests to avoid white, ivory, cream, and bridal shades.",
      
    image: "/images/dress-code/guest-attire.png",
    colors: [
      {
        name: "Light Yellow",
        value: "#FFF4B8",
      },
      {
        name: "Beige",
        value: "#D8C9AE",
      },
      {
        name: "Olive Green",
        value: "#636B2F",
      },
      {
        name: "Brown",
        value: "#765742",
      },
      {
        name: "Black",
        value: "#242424",
      },
    ],
  },

  schedule: [
    {
      time: "2:30 PM",
      title: "Guest Arrival",
      description: "Guests may begin arriving at the ceremony venue.",
    },
    {
      time: "3:00 PM",
      title: "Wedding Ceremony",
      description: "The wedding ceremony begins.",
    },
    {
      time: "4:30 PM",
      title: "Travel to Reception",
      description: "Guests proceed to the reception venue.",
    },
    {
      time: "5:00 PM",
      title: "Cocktail Hour",
      description: "Refreshments and photographs.",
    },
    {
      time: "6:00 PM",
      title: "Reception Program",
      description: "Dinner and the formal reception program.",
    },
    {
      time: "8:00 PM",
      title: "Celebration",
      description: "Music, dancing, and celebration.",
    },
  ],

  contact: {
    name: "Wedding Contact",
    phone: "",
    email: "",
  },

  gifts: {
  title: "With Love and Gratitude",

  message:
    "Your presence at our wedding is the greatest gift we could ask for. For those who wish to give, any thoughtful gesture will be sincerely appreciated.",

  secondaryMessage:
    "Additional gift or registry information may be provided here when available.",

  registryUrl: "",

  bankName: "",
  accountName: "",
  accountNumber: "",

  qrCodeImage: "",
},

  music: {
    enabled: true,
    source: "/music/wedding-song.mp3",
    title: "Wedding Background Music",
  },

  theme: {
    darkOliveGreen: "#636B2F",
    deepGreen: "#636B2F",
    antiqueGold: "#B89A57",
    softGold: "#D4BF88",
    warmWhite: "#FAF8F3",
    white: "#FFFFFF",
    charcoal: "#2D302C",
  },
} as const;

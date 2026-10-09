export const weddingConfig = {
  couple: {
    groomFirstName: "Renz",
    groomFullName: "Paul Clarenz",
    brideFirstName: "Jen",
    brideFullName: "Jenny Lou",
    initials: "R & J",
    compactInitials: "RJ",
    hashtag: "#RenzAndJen2026",
  },

  event: {
    dateTime: "2026-12-10T16:00:00+08:00",
    dateLabel: "December 10, 2026",
    numericDateLabel: "12.10.2026",
    shortDateLabel: "12.10.26",
    timeLabel: "4:00 PM",
    timezone: "Asia/Manila",
    timezoneLabel: "Philippine Standard Time",
    rsvpDeadline: "2026-11-15T23:59:59+08:00",
    rsvpDeadlineLabel: "November 15, 2026",
  },

  ceremony: {
    venue: "El Roi Events Place at Casa Concepcion",
    address: "9103 Pooc 1, Silang, Cavite, Philippines, 4118",
    timeLabel: "4:00 PM",
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
    title: "ATTIRE",
    description:
      "We would be delighted to see you in",
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
        name: "Brown",
        value: "#765742",
      },
      {
        name: "Olive",
        value: "#525200",
      },
      {
        name: "Black",
        value: "#242424",
      },
    ],
  },

  schedule: [
    {
      time: "3:30 PM",
      title: "Guest Arrival",
      description: "Guests may begin arriving at the ceremony venue.",
    },
    {
      time: "4:00 PM",
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
    "Your love, prayers, and presence are the greatest gift to us.",

  secondaryMessage:
    "Should you wish to bless us further, a monetary gift would be warmly appreciated.",

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
    darkOliveGreen: "#525200",
    deepGreen: "#525200",
    antiqueGold: "#B89A57",
    softGold: "#D4BF88",
    warmWhite: "#FAF8F3",
    white: "#FFFFFF",
    charcoal: "#2D302C",
  },
} as const;

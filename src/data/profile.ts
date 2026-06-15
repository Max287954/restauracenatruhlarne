export const siteConfig = {
  name: "Restaurace Na Truhlárně",
  tagline: "Klasická restaurace s kvalitním jídlem v srdci Habartova",
  description:
    "Restaurace Na Truhlárně v Habartově — poctivá česká kuchyně, denní menu a příjemné posezení. Přijďte ochutnat naše speciality.",
  url: "https://restauracenatruhlarne.cz",
  locale: "cs-CZ",

  owner: {
    name: "Jaroslav Šindelář",
    ico: "12345678",
    dic: "[doplňte DIČ]",
    registeredAddress: "1. Máje 178, 35709 Habartov, CZ",
    phone: "+420 775 040 760",
    email: "sindelarjaroslav@seznam.cz",
  },

  openingHours: {
    monday: { open: "11:00", close: "22:00", label: "Pondělí" },
    tuesday: { open: "11:00", close: "22:00", label: "Úterý" },
    wednesday: { open: "11:00", close: "22:00", label: "Středa" },
    thursday: { open: "11:00", close: "22:00", label: "Čtvrtek" },
    friday: { open: "11:00", close: "23:00", label: "Pátek" },
    saturday: { open: "11:00", close: "23:00", label: "Sobota" },
    sunday: { open: "11:00", close: "21:00", label: "Neděle" },
  },

  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.123456789!2d12.5567!3d50.1813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDEwJzUyLjciTiAxMsKwMzMnMjQuMSJF!5e0!3m2!1scs!2scz!4v1234567890",

  address: {
    street: "1. Máje 178",
    city: "Habartov",
    postalCode: "35709",
    country: "CZ",
  },
} as const;

export type OpeningHoursKey = keyof typeof siteConfig.openingHours;
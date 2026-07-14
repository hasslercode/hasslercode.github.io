export const siteConfig = {
  name: "Hassler Isaac",
  fullName: "Hassler Enrique Isaac Acosta",
  url: "https://portafolio-hass.vercel.app",
  email: "hisaaca10@gmail.com",
  phone: "+573003365369",
  location: {
    city: "Medellín",
    secondaryCity: "Barranquilla",
    country: "CO",
    countryName: "Colombia",
  },
  social: {
    github: "https://github.com/hasslercode",
    linkedin: "https://www.linkedin.com/in/hassler-isaac-acosta-897b3015b/",
    youtube: "https://www.youtube.com/@jamiadev",
  },
  ogImage: "/images/profile/hassler-principal.jpg",
  cv: "/cv/CVHassler2026.pdf",
  employer: "PRAGMA",
} as const;

export const tools = [
  { name: "React", slug: "react", color: "61DAFB", featured: true },
  { name: "Next.js", slug: "nextdotjs", color: "000000", featured: true },
  { name: "Angular", slug: "angular", color: "DD0031", featured: true },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "RxJS", slug: "reactivex", color: "B7178C" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Git", slug: "git", color: "F05032" },
] as const;

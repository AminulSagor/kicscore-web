export type AdminNewsItem = {
  id: string;
  title: string;
  description: string;
  snippet: string;
  keywords: string;
  image: string;
  imageId: string;
  publishedAt: string;
};

export const adminNewsPosts: AdminNewsItem[] = [
  {
    id: "1",
    title: "Kicscore Exclusive: Real Madrid Announce New Stadium Upgrades",
    description:
      "In a surprise press conference today, the club revealed a massive new infrastructure plan aiming to expand seating capacity.",
    snippet: "Real Madrid reveals massive new infrastructure plan.",
    keywords: "Real Madrid, La Liga, Stadium, Football",
    image: "/images/news/news-1.jpg",
    imageId: "file-1",
    publishedAt: "23 May, 2026",
  },
  {
    id: "2",
    title: "Key Players to Watch Tonight",
    description:
      "Tonight's match will feature several important players who can change the result.",
    snippet: "Important players can decide tonight's match.",
    keywords: "Football, Match Preview, Players",
    image: "/images/news/news-2.jpg",
    imageId: "file-2",
    publishedAt: "23 May, 2026",
  },
];

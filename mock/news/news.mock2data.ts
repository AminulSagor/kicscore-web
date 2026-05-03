import { IMAGE } from "@/constants/image.path";
import type { NewsItemMock } from "./news.mock.types";

export const newsMockData: NewsItemMock[] = [
  {
    id: "1",
    title:
      "Arsenal vs Man City: Why Mikel Arteta must win at Etihad to finally prove he can deliver",
    description:
      "The Gunners have no Manchester knowing that anything less than three points will raise familiar questions about their title credentials under the Spaniard.",
    time: "12 hours ago",
    source: "Sky Sports",
    image: IMAGE.celebration1,
    detailImage: IMAGE.celebration1,
    isFeatured: true,
    category: "EPL",
    publishedDate: "April 7, 2026",
    author: "By Sports Editorial",
    detailSections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          {
            id: "p1",
            text: "The narrative surrounding Arsenal under Mikel Arteta has shifted dramatically over the past three seasons. From a team lacking identity to genuine title contenders, the progress is undeniable.",
          },
          {
            id: "p2",
            text: "City away from home is the acid test for any European club. For Arsenal, dropping points here would reopen old questions about their ability to control decisive moments.",
          },
        ],
      },
      {
        id: "tactical",
        title: "Tactical Nuances vs Mental Fortitude",
        paragraphs: [
          {
            id: "p1",
            text: "Looking at the expected goals metric from previous encounters, Arsenal has often created high-quality chances against City but failed to convert key moments.",
          },
          {
            id: "p2",
            text: "Bukayo Saka’s duel with the opposition full-back could decide the rhythm of the match. If Saka can isolate his marker, Arsenal will have a clear route into the final third.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "The Premier League’s Worst Time Wasters Ranked",
    description:
      "A closer look at the clubs and players who slow the game down the most during key moments.",
    time: "3 hr ago",
    source: "Fotfoot.fr",
    image: IMAGE.celebration2,
    detailImage: IMAGE.celebration2,
    category: "Premier League",
    publishedDate: "April 7, 2026",
    author: "By Fotfoot Editorial",
    detailSections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          {
            id: "p1",
            text: "Game management has become a major part of modern football. Some teams use pauses, restarts, and tactical delays to control momentum.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Mercato: L'OL fonce sur un défenseur à 15 millions d'euros ?",
    description:
      "Lyon are reportedly monitoring a defensive target as the summer window approaches.",
    time: "4 hr ago",
    source: "Fotfoot.fr",
    image: IMAGE.celebration3,
    detailImage: IMAGE.celebration3,
    category: "Transfer",
    publishedDate: "April 7, 2026",
    author: "By Transfer Desk",
    detailSections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          {
            id: "p1",
            text: "Lyon’s recruitment team is exploring defensive reinforcements, with a potential move worth around 15 million euros being discussed.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Argentina stars celebrate historic final night",
    description:
      "A memorable night for Argentina as senior players delivered another iconic performance.",
    time: "5 hr ago",
    source: "Fotfoot.fr",
    image: IMAGE.celebration1,
    detailImage: IMAGE.celebration1,
    category: "International",
    publishedDate: "April 7, 2026",
    author: "By Match Desk",
    detailSections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          {
            id: "p1",
            text: "Argentina’s senior players produced another emotional performance, combining experience and control in decisive phases.",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Mercato: L'OL fonce sur un défenseur à 15 millions d'euros ?",
    description:
      "Lyon are reportedly monitoring a defensive target as the summer window approaches.",
    time: "4 hr ago",
    source: "Fotfoot.fr",
    image: IMAGE.celebration3,
    detailImage: IMAGE.celebration3,
    category: "Transfer",
    publishedDate: "April 7, 2026",
    author: "By Transfer Desk",
    detailSections: [
      {
        id: "intro",
        title: "",
        paragraphs: [
          {
            id: "p1",
            text: "Lyon’s recruitment team is exploring defensive reinforcements, with a potential move worth around 15 million euros being discussed.",
          },
        ],
      },
    ],
  },
];

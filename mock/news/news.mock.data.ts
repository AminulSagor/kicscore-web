import { IMAGE } from "@/constants/image.path";
import { NewsItemMock } from "./news.mock.types";

export const newsMockData: NewsItemMock[] = [
  {
    id: "1",
    title: "Alex Scott is key to Bournemouth's push for Europe",
    time: "3 hr ago",
    image: IMAGE.celebration1,
    relatedTitle: "The Premier League’s Worst Time Wasters Ranked",
    relatedTime: "9 hr ago",
    relatedImage: IMAGE.celebration2,
  },
  {
    id: "2",
    title: "Alex Scott is key to Bournemouth's push for Europe",
    time: "3 hr ago",
    image: IMAGE.celebration3,
    relatedTitle: "The Premier League’s Worst Time Wasters Ranked",
    relatedTime: "9 hr ago",
    relatedImage: IMAGE.celebration1,
  },
  {
    id: "3",
    title: "Alex Scott is key to Bournemouth's push for Europe",
    time: "3 hr ago",
    image: IMAGE.celebration2,
    relatedTitle: "The Premier League’s Worst Time Wasters Ranked",
    relatedTime: "9 hr ago",
    relatedImage: IMAGE.celebration3,
  },
];

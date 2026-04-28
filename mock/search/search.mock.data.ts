import { IMAGE } from "@/constants/image.path";
import { SearchItemMock } from "./search.mock.types";

export const searchMockData: SearchItemMock[] = [
  {
    id: "1",
    name: "Portugal",
    subtitle: "National Team",
    category: "teams",
    image: IMAGE.portugal,
  },
  {
    id: "2",
    name: "FC Porto",
    subtitle: "Liga Portugal",
    category: "teams",
    image: IMAGE.fc_porto,
  },
  {
    id: "3",
    name: "Liga Portugal",
    subtitle: "Portugal",
    category: "leagues",
    image: IMAGE.celebration1,
  },
  {
    id: "4",
    name: "Ryan Porteous",
    subtitle: "Los Angeles FC",
    category: "players",
    image: IMAGE.fc_porto,
  },
];

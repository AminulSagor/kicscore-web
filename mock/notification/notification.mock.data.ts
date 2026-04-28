import { NotificationGroupMock } from "./notification.mock.types";

export const notificationMockData: NotificationGroupMock[] = [
  {
    label: "Today",
    items: [
      {
        id: "1",
        title: "GOAL! Arsenal",
        message:
          "Arsenal 1 - 0 Man City. Bukayo Saka scores in the 45th minute!",
        time: "2m ago",
        active: true,
        iconType: "team",
      },
      {
        id: "2",
        title: "Starting XI: Cristiano Ronaldo",
        message:
          "Ronaldo is in the starting lineup for Al Nassr vs Al Hilal. Match kicks off in 15 mins.",
        time: "15m ago",
        iconType: "player",
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "3",
        title: "Matchweek 10 Roundup",
        message:
          "Check out the latest standings and highlights from an action-packed Premier League weekend.",
        time: "1d ago",
        iconType: "system",
      },
      {
        id: "4",
        title: "Transfer Update",
        message:
          "Real Madrid has officially announced the signing of a new midfielder.",
        time: "1d ago",
        iconType: "team",
      },
    ],
  },
];

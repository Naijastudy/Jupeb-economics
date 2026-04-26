import * as economics from "./economics";
import * as government from "./government";

export const subjects = [
  {
    id: "economics",
    name: "Economics",
    emoji: "📊",
    color: "#16a34a",
    available: true,
    data: economics,
  },
  {
    id: "government",
    name: "Government",
    emoji: "🏛️",
    color: "#2563eb",
    available: false,
    data: government,
  },
];
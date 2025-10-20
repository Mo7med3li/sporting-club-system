export const sportsData = [
  {
    id: 1,
    name: "Football",
    coach: "Ahmed Hassan",
    playersCount: 22,
    description:
      "A team sport played between two teams of 11 players using a spherical ball.",
  },
  {
    id: 2,
    name: "Basketball",
    coach: "Omar Khaled",
    playersCount: 10,
    description:
      "A fast-paced team sport where two teams try to score by shooting a ball through the opponent’s hoop.",
  },
];

// get sports from localStorage
export function getSports() {
  if (typeof window === "undefined") return sportsData;

  const storedSports = localStorage.getItem("sports");
  if (storedSports) return JSON.parse(storedSports);

  localStorage.setItem("sports", JSON.stringify(sportsData));
  return sportsData;
}

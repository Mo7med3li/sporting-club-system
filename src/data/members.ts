export const membersData = [
  {
    id: 1,
    name: "Mohamed Ali",
    age: 25,
    subscriptions: [{ id: 1 }, { id: 2 }, { id: 3 }],
  },
  {
    id: 2,
    name: "Menna",
    age: 22,
    subscriptions: [{ id: 2 }],
  },
  {
    id: 3,
    name: "Tariq",
    age: 26,
    subscriptions: [{ id: 3 }],
  },
];

// get sports from localStorage
export function getMembers() {
  if (typeof window === "undefined") return membersData;

  const storedMembers = localStorage.getItem("members");
  if (storedMembers) return JSON.parse(storedMembers);

  localStorage.setItem("members", JSON.stringify(membersData));
  return membersData;
}

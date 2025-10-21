"use client";

import { useEffect, useState } from "react";
import { getMembers } from "@/data/members";
import { getSports } from "@/data/sports";
import { Sport } from "@/lib/types/sports/sport";

type Member = {
  id: number;
  name: string;
  age: number;
  subscriptions: { id: number }[];
};

const MembersSection = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  useEffect(() => {
    const members = getMembers() as Member[];
    const sports = JSON.parse(localStorage.getItem("sports") || getSports());
    setMembers(members);
    setSports(sports);
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Members</h2>
        <div className="text-sm text-muted-foreground">
          {members.length} total
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border shadow-md bg-white p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500">Age {member.age}</p>
              </div>
              <span className="flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-1">
                ID {member.id}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Subscriptions:</span>
              {member.subscriptions?.length ? (
                member.subscriptions.map((sub) => {
                  return (
                    <span
                      key={sub.id}
                      className="flex items-center rounded-md border px-2 py-1 text-xs font-medium"
                    >
                      {sports.find((sport) => sport.id === sub.id)?.name}
                    </span>
                  );
                })
              ) : (
                <span className="text-sm text-gray-500">No subscriptions</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;

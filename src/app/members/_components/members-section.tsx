"use client";

import { useEffect, useState } from "react";
import { getMembers } from "@/data/members";
import { getSports } from "@/data/sports";
import { Sport } from "@/lib/types/sports/sport";
import { Member } from "@/lib/types/members/members";
import MembersCard from "./members-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MembersForm from "./members-form";

const MembersSection = () => {
  // states
  const [members, setMembers] = useState<Member[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [open, setOpen] = useState(false);

  // effects
  useEffect(() => {
    // members
    const members = getMembers() as Member[];

    // sports
    let sportsData: Sport[] = [];
    if (typeof window !== "undefined") {
      const storedSports = localStorage.getItem("sports");
      if (storedSports) {
        sportsData = JSON.parse(storedSports);
      } else {
        sportsData = getSports();
        localStorage.setItem("sports", JSON.stringify(sportsData));
      }
    }
    setMembers(members);
    setSports(sportsData);
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Members</h2>
        <div className="text-sm text-gray-500">{members.length} total</div>

        {/* add member dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition"
            >
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <MembersForm setOpen={setOpen} setMembers={setMembers} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <MembersCard
            key={member.id}
            member={member}
            sports={sports}
            setMembers={setMembers}
          />
        ))}
      </div>
    </section>
  );
};

export default MembersSection;

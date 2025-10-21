import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Member } from "@/lib/types/members/members";
import { Sport } from "@/lib/types/sports/sport";
import SubscribeForm from "./subscribe-form";
import { useState } from "react";

const MembersCard = ({
  member,
  sports,
  setMembers,
}: {
  member: Member;
  sports: Sport[];
  setMembers: (members: Member[]) => void;
}) => {
  // states
  const [open, setOpen] = useState(false);

  return (
    <div
      key={member.id}
      className="rounded-lg border shadow-md bg-white p-4 flex flex-col gap-3 justify-between"
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
          <span className="text-sm text-gray-500">No subscriptions Yet</span>
        )}
      </div>

      {/* subscribe dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Subscribe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SubscribeForm
            sports={sports}
            member={member}
            setMembers={setMembers}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersCard;

"use client";

import { Sport } from "@/lib/types/sports/sport";
import { useState } from "react";
import { useEffect } from "react";
import { getSports } from "@/data/sports";
import SportsCard from "./sports-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SportsForm from "./sports-form";

const SportsSection = () => {
  // states
  const [sports, setSports] = useState<Sport[]>([]);
  const [open, setOpen] = useState(false);

  // effects
  useEffect(() => {
    const data = getSports();
    setSports(data);
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Sports</h1>
          <p className="text-muted-foreground">
            Browse and manage sports in your club.
          </p>
        </div>

        {/* sports form */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition"
            >
              Add Sport
            </Button>
          </DialogTrigger>
          <DialogContent>
            <SportsForm setOpen={setOpen} setSports={setSports} />
          </DialogContent>
        </Dialog>
      </div>

      {/* sports cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sports.map((sport: Sport) => (
          <SportsCard key={sport.id} sport={sport} />
        ))}
      </div>
    </section>
  );
};

export default SportsSection;

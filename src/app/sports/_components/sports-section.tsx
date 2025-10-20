"use client";

import { Sport } from "@/lib/sports/sport";

import { useState } from "react";
import { useEffect } from "react";
import { getSports } from "@/data/sports";
import SportsCard from "./sports-card";
const SportsSection = () => {
  // states
  const [sports, setSports] = useState<Sport[]>([]);

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

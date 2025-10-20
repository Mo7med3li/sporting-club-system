import { Sport } from "@/lib/types/sports/sport";

const SportsCard = ({ sport }: { sport: Sport }) => {
  return (
    <div className="group rounded-lg border bg-white p-5 shadow-md transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        {/* name */}
        <h3 className="text-lg font-semibold group-hover:underline">
          {sport.name}
        </h3>
      </div>
      {/* coach */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-400">
          Coach:{" "}
          <span className="font-medium text-gray-900">{sport.coach}</span>
        </div>
      </div>
    </div>
  );
};

export default SportsCard;

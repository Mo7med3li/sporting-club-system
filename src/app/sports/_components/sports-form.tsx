"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSports } from "@/data/sports";
import { AddSportSchema, addSportSchema } from "@/lib/schema/add-sport.schema";
import { Sport } from "@/lib/types/sports/sport";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SportsForm = ({
  setOpen,
  setSports,
}: {
  setOpen: (open: boolean) => void;
  setSports: (sports: Sport[]) => void;
}) => {
  // form
  const form = useForm({
    defaultValues: {
      name: "",
      coach: "",
    },
    resolver: zodResolver(addSportSchema),
  });

  // submit
  const onSubmit = (data: AddSportSchema) => {
    const sports = getSports();
    const newSport = {
      id: sports.length + 1,
      ...data,
    };
    const addedSport = [...sports, newSport];
    localStorage.setItem("sports", JSON.stringify(addedSport));
    form.reset();
    setSports(addedSport);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">Add Sport</h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="items-center gap-3 grid lg:grid-cols-2">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  {/* Label */}
                  <FormLabel>Name</FormLabel>
                  {/* field */}
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        form.formState.errors.name &&
                          "focus-visible:border-red-300"
                      )}
                      placeholder="Name"
                    />
                  </FormControl>
                  {/* feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* coach */}
            <FormField
              control={form.control}
              name="coach"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  {/* Label */}
                  <FormLabel>Coach</FormLabel>
                  {/* Field*/}
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        form.formState.errors.coach &&
                          "focus-visible:border-red-300"
                      )}
                      placeholder="Coach"
                    />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* submit */}
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
          >
            Add Sport
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SportsForm;

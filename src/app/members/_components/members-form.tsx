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
import { getMembers } from "@/data/members";
import {
  addMemberSchema,
  AddMemberSchema,
} from "@/lib/schema/add-member.schema";
import { Member } from "@/lib/types/members/members";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MembersForm = ({
  setOpen,
  setMembers,
}: {
  setOpen: (open: boolean) => void;
  setMembers: (members: Member[]) => void;
}) => {
  // form
  const form = useForm({
    defaultValues: {
      name: "",
      age: undefined,
      subscriptions: [],
    },
    resolver: zodResolver(addMemberSchema),
  });

  // submit
  const onSubmit = (data: AddMemberSchema) => {
    const members = getMembers();
    const newMember = {
      id: members.length + 1,
      ...data,
      subscriptions: data.subscriptions,
    };
    const addedMember = [...members, newMember];
    localStorage.setItem("members", JSON.stringify(addedMember));
    form.reset();
    setMembers(addedMember);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">Add Member</h2>
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

            {/* age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  {/* Label */}
                  <FormLabel>Age</FormLabel>
                  {/* Field*/}
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className={cn(
                        form.formState.errors.age &&
                          "focus-visible:border-red-300"
                      )}
                      placeholder="Age"
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
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Add Member
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MembersForm;

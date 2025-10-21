import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getMembers } from "@/data/members";
import {
  AddMemberSchema,
  addMemberSchema,
} from "@/lib/schema/add-member.schema";
import { Member } from "@/lib/types/members/members";
import { Sport } from "@/lib/types/sports/sport";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SubscribeForm = ({
  sports,
  member,
  setMembers,
  setOpen,
}: {
  sports: Sport[];
  member: Member;
  setMembers: (members: Member[]) => void;
  setOpen: (open: boolean) => void;
}) => {
  // states
  const [error, setError] = useState<string | null>(null);

  // form
  const form = useForm({
    defaultValues: {
      name: member.name,
      age: member.age,
      subscriptions: member.subscriptions || [],
    },
    resolver: zodResolver(addMemberSchema),
  });

  // submit
  const onSubmit = (data: AddMemberSchema) => {
    // check for duplicate subscriptions
    const hasDuplicate = data.subscriptions?.some((sub2) =>
      member.subscriptions.some((sub) => sub.id === sub2.id)
    );

    if (hasDuplicate) {
      setError("You can't subscribe to the same sport twice");
      return;
    }
    setError(null);
    // update member
    const members = JSON.parse(localStorage.getItem("members") || getMembers());

    // find member index
    const index = members.findIndex((m: Member) => m.id === member.id);

    // update member subscriptions
    const newSubscriptions = [
      ...member.subscriptions,
      ...(data.subscriptions || []),
    ].filter(
      (sub, index, self) => index === self.findIndex((s) => s.id === sub.id)
    );

    members[index] = {
      ...member,
      subscriptions: newSubscriptions,
    };

    localStorage.setItem("members", JSON.stringify(members));
    setMembers(members);
    setOpen(false);
  };

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="subscriptions"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel htmlFor="subs">Subscriptions</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    {sports.map((sport) => (
                      <div
                        key={sport.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`subs-${sport.id}`}
                          value={sport.id}
                          checked={
                            field.value?.some(
                              (s: { id: number }) => s.id === sport.id
                            ) || false
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          //   change checked state
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), { id: sport.id }]
                              : (field.value || []).filter(
                                  (s: { id: number }) => s.id !== sport.id
                                );
                            field.onChange(newValue);
                          }}
                        />
                        <label htmlFor={`subs-${sport.id}`}>{sport.name}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                {error && <p className="text-red-500">{error}</p>}

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Subscribe</Button>
        </form>
      </Form>
    </div>
  );
};

export default SubscribeForm;

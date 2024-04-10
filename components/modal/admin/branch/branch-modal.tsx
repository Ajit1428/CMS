"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { CheckIcon } from "lucide-react";

import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { branches } from "@/config/static/branch/kumari-bank-branches";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useZustand } from "@/hooks/zustand/useZustand";

const formSchema = z.object({
  branchName: z.string({
    required_error: "Please select the branch in order to continue",
  }),
});

const BranchModal = () => {
  const open = useZustand((state) => state.open);
  const isOpen = useZustand((state) => state.isOpen);
  const onClose = useZustand((state) => state.onClose);

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/admin/branch", values);
      toast.success("The Branch has been Created");
      window.location.assign(`/admin/dashboard/${response.data._id}`);
    } catch (error) {
      toast.error("The branch you are trying to create already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <FormItem>
              <Popover
                open={open}
                onOpenChange={(open) => {
                  open ? isOpen((open = true)) : isOpen((open = false));
                }}
              >
                <PopoverTrigger asChild>
                  <FormControl className="flex justify-start">
                    <Button variant="outline" className="w-full">
                      {field.value
                        ? branches?.map(
                            (a) =>
                              a?.branches?.find((b) => field.value === b.branch)
                                ?.branch,
                          )
                        : "Select the branch"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[32rem]">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList className="w-full">
                      <CommandEmpty>No such branch available</CommandEmpty>
                      <CommandGroup>
                        {branches.map((a) =>
                          a.branches.map((b) => (
                            <CommandItem
                              key={b.branch}
                              value={b.branch}
                              className="aria-selected:bg-blue-300"
                              onSelect={() => {
                                form.setValue("branchName", b.branch);
                                onClose(false);
                              }}
                            >
                              {b.branch}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  b.branch === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          )),
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
                <DialogClose asChild>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      disabled={loading}
                      type="reset"
                      variant="destructive"
                    >
                      Cancel
                    </Button>
                    <Button disabled={loading} type="submit">
                      Continue
                    </Button>
                  </div>
                </DialogClose>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BranchModal;

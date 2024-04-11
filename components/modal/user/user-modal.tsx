"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

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
import { branches } from "@/config/static/branch/kumari-bank-branches";
import { useZustand } from "@/hooks/zustand/useZustand";
import { DialogClose } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be of aleat 3 characters" }),
  role: z.enum(["kbsl", "kbl"], {
    required_error: "You need to select one of the two options",
  }),
  email: z.string().email({ message: "Please enter your email address" }),
  branchName: z.string({
    required_error: "PLease select your particular branch",
  }),
  contact: z
    .string()
    .min(10, { message: "You must enter 10 digit number" })
    .max(10),
});

export const UserModal = () => {
  const open = useZustand((state) => state.open);
  const isOpen = useZustand((state) => state.isOpen);
  const onClose = useZustand((state) => state.onClose);
  const [loading, setLoading] = useState(false);
  const [isStaff, setIsStaff] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: undefined,
      email: "",
      branchName: "",
      contact: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.role === "kbsl") {
        values.branchName = "Head Office";
      }
      setLoading(true);
      const response = await axios.post("/api/user", values);
      toast.success("Thanks your for filing in the details");
      router.push(`/user/dashboard/${response.data._id}`);
    } catch (error) {
      toast.error(
        "You  already have an account and may belong to a certain branch",
      );
      console.log(`[DETAILS ERROR]`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel> Are you?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="space-x-2">
                    <FormControl>
                      <RadioGroupItem
                        value="kbsl"
                        onClick={() => setIsStaff("kbsl")}
                      />
                    </FormControl>
                    <FormLabel>K.B.L. Securities Limited Staff</FormLabel>
                  </FormItem>
                  <FormItem className="space-x-2">
                    <FormControl>
                      <RadioGroupItem
                        value="kbl"
                        onClick={() => setIsStaff("kbl")}
                      />
                    </FormControl>
                    <FormLabel>Kumari Bank Limited Staff</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <FormItem className="mt-2 transition">
              <FormLabel>Branch</FormLabel>
              <Popover
                open={open}
                onOpenChange={(open) => {
                  open ? isOpen((open = true)) : isOpen((open = false));
                }}
              >
                <PopoverTrigger asChild>
                  <FormControl className="flex justify-start">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isStaff === "kbsl"}
                    >
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
                <PopoverContent className="w-[32rem] fixed right-[-16rem]">
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
                              className="aria-selected:bg-blue-400"
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
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit" className="mt-4" disabled={loading}>
            Confirm
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

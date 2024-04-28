"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Form,
  FormItem,
  FormLabel,
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useZustand } from "@/hooks/zustand/useZustand";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { branches } from "@/config/static/branch/kumari-bank-branches";
import { useRouter } from "next/navigation";

type ManageModal = {
  userDetails: {
    _id: string;
    name: string;
    role: string;
    email: string;
    branchName: string;
    contact: string;
  };
};

const formSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(3, { message: "The name must be of aleat 3 characters" }),
  role: z.string({
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

export const ManageUserModal = ({ userDetails }: ManageModal) => {
  const router = useRouter();
  const open = useZustand((state) => state.open);
  const isOpen = useZustand((state) => state.isOpen);
  const onClose = useZustand((state) => state.onClose);
  const [isStaff, setIsStaff] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: userDetails?._id,
      name: userDetails?.name,
      role: userDetails?.role,
      email: userDetails?.email,
      branchName: userDetails?.branchName,
      contact: userDetails?.contact,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.patch("/api/admin/manage-user", values);
      toast.success("The user has been updated successfully");
      router.push("/admin/manage-user");
    } catch (error) {
      toast.error("Unable to updated the user");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.push("/admin/manage-user");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
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
          {userDetails?.role !== "admin" && (
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
          )}
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
                                a?.branches?.find(
                                  (b) => field.value === b.branch,
                                )?.branch,
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
        </div>
        <div className="flex justify-end items-center mt-4 gap-2">
          <Button type="submit" disabled={loading}>
            Update
          </Button>
          <Button
            type="reset"
            disabled={loading}
            variant="destructive"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { branches } from "@/config/static/branch/kumari-bank-branches";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

type ManageTMSUserModal = {
  userDetails: {
    _id: string;
    clientName: string;
    clientCode: string;
    status: string;
    sentBy: string;
    branchName: string;
    courier: string;
    remarks: string;
  };
};

const formSchema = z.object({
  _id: z.string(),
  clientName: z
    .string()
    .min(3, { message: "The name must be of aleat 3 characters" }),
  clientCode: z
    .string()
    .min(11, { message: "The client code must be at least of 11 digits" })
    .max(11),
  status: z.string({
    required_error: "You need to select one of the three options",
  }),
  sentBy: z
    .string({
      required_error: "Please enter the sender's name",
    })
    .min(3),
  branchName: z.string({
    required_error: "Please select the branch in order to continue",
  }),
  courier: z.string(),
  remarks: z.string(),
});

export const ManageTMSUserModal = ({ userDetails }: ManageTMSUserModal) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const open = useZustand((state) => state.open);
  const isOpen = useZustand((state) => state.isOpen);
  const onClose = useZustand((state) => state.onClose);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: userDetails?._id,
      clientName: userDetails?.clientName,
      clientCode: userDetails?.clientCode,
      status: userDetails?.status,
      sentBy: userDetails?.sentBy,
      branchName: userDetails?.branchName,
      courier: userDetails?.courier,
      remarks: userDetails?.remarks,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.patch("/api/admin/tms-user", values);
      toast.success("The client details has been updated successfully");
      router.push("/admin/tms");
    } catch (error: any) {
      toast.error(`${error?.response?.data}`);
      console.log(`[TMSUSER DETAILS UPDATE ERROR]`, error);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.push("/admin/tms");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client&apos;s Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientCode"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Client Code</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>TMS Status</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Unapproved">Unapproved</SelectItem>
                    <SelectItem value="In-progress">In-progress</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sentBy"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Sender&apos;s Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                    open ? isOpen(true) : isOpen(false);
                  }}
                >
                  <PopoverTrigger asChild>
                    <FormControl className="flex justify-start">
                      <Button variant="outline" className="w-full">
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
            name="courier"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Courier</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Received">Received</SelectItem>
                    <SelectItem value="Not Received">Not Received</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Remarks if any</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your remarks here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button type="submit" disabled={loading}>
            Update
          </Button>
          <Button
            type="reset"
            variant="destructive"
            disabled={loading}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

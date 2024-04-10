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
import { useZustand } from "@/hooks/zustand/useZustand";
import { DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "@/components/ui/select";

const formSchema = z.object({
  clientName: z
    .string()
    .min(3, { message: "The name must be of aleat 3 characters" }),
  clientCode: z
    .string()
    .min(11, { message: "The client code must be at least of 11 digits" })
    .max(11),
  status: z.enum(["Approved", "Unapproved", "In-progress"], {
    required_error: "You need to select one of the three options",
  }),
  sentBy: z.string({
    required_error: "Please enter the sender's name",
  }).min(3),
  courier: z.enum(["Received", "Unreceived"]),
});

export const TMSUserModal = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientCode: "",
      status: undefined,
      sentBy: "",
      courier: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    console.log(values);
    setLoading(true);
    await axios.post("/api/admin/tms-user", values);
    toast.success("The client has been added successfully");
    router.push("/user/dashboard");
    } catch (error) {
      toast.error(
        "Something went wrong",
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
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client's Name</FormLabel>
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
                    <SelectValue placeholder="Select the status" />
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
              <FormLabel>Sender's Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
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
                    <SelectValue placeholder="Select the courier status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="Unreceived">Unreceived</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button
              type="reset"
              variant="destructive"
              className="mt-4"
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="mt-4" disabled={loading}>
              Confirm
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

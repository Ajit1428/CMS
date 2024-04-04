"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branches } from "@/config/static/branch/kumari-bank-branches";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useZustand } from "@/hooks/zustand/useZustand";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be of aleat 3 characters" }),
  branchName: z.string({
    required_error: "PLease select your particular branch",
  }),
  contactNumber: z
    .string()
    .min(10, { message: "You must enter 10 digit number" })
    .max(10),
  role: z.enum(["kbsl", "kbl"], {
    required_error: "You need to select one of the two options",
  }),
});

export const UserModal = () => {
  const onClose = useZustand((state) => state.onClose);
  const [loading, setLoading] = useState(false);
  const [isStaff, setIsStaff] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      branchName: "",
      contactNumber: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.role === "kbsl") {
      values.branchName = "";
    }
    console.log(values);
    onClose();
    router.push("/admin/dashboard");
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
          name="branchName"
          render={({ field }) => (
            <FormItem className="mt-2 transition">
              <FormLabel>Branch</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={isStaff === "kbl" ? field.value : ""}
              >
                <FormControl>
                  <SelectTrigger disabled={isStaff === "kbsl" && true}>
                    <SelectValue placeholder="Select the branch..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  side="bottom"
                  position="item-aligned"
                  className="dark:bg-[#1e1e2e]"
                >
                  <SelectGroup>
                    {branches.map((p) => (
                      <SelectLabel key={p.province}>
                        <div className="text-md font-extrabold border-2 bg-yellow-300 dark:text-black shadow-md p-2 rounded-md">
                          {p.province}
                        </div>
                        <div className="text-md border-2 shadow-md p-2 rounded-md">
                          {p.branches?.map((b, index) => (
                            <SelectItem
                              key={b.branch}
                              value={b.branch}
                              className="hover:focus:bg-blue-400 focus:bg-blue-400 font-normal"
                            >
                              {b.branch}
                            </SelectItem>
                          ))}
                        </div>
                      </SelectLabel>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
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
        <Button type="submit" className="mt-4">
          Confirm
        </Button>
      </form>
    </Form>
  );
};

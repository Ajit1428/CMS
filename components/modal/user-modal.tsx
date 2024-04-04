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
import { UserStaff } from "@/config/static/user/user-staff";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must be of aleat 3 characters" }),
  branchName: z.string({
    required_error: "PLease select your particular branch",
  }),
  contactNumber: z
    .string()
    .min(10, { message: "You must enter 10 digit number" }),
  role: z.array(z.string()),
});

export const UserModal = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      role: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const onClick = () => {
    router.push("/user/dashboard");
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
          name="branchName"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Branch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
                          {p.branches?.map((b) => (
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
        <div className="flex items-center w-full gap-4 mt-2">
          {UserStaff.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem key={item.id} className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
        <Button className="mt-4">Confirm</Button>
      </form>
    </Form>
  );
};

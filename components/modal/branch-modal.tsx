import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { branches } from "@/config/static/branch/kumari-bank-branches";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  branchName: z.string({
    required_error: "Please select the branch in order to continue",
  }),
});

const BranchModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      const response = await axios.post("/api/branch", values);
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
                <div className="flex gap-2 justify-end items-center">
                  <DialogClose asChild>
                    <Button variant="destructive">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create</Button>
                </div>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BranchModal;

import { branches } from "@/utils/kumari-bank-branches";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BranchDropDownMenu = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select the branch..." />
      </SelectTrigger>
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
        <Button>Create</Button>
      </div>
    </Select>
  );
};

export default BranchDropDownMenu;

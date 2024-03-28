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

const BranchDropDownMenu = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select the branch..." />
      </SelectTrigger>
      <SelectContent side="bottom" position="item-aligned">
        <SelectGroup>
          {branches.map((p) => (
            <SelectLabel key={p.province}>
              <div className="text-md font-semibold border-2 bg-yellow-300 shadow-md p-2 rounded-md">
                {p.province}
              </div>

              <div className="text-md border-2 shadow-md p-2 rounded-md">
                {p.branches?.map((b) => (
                  <SelectItem key={b.branch} value={b.branch}>
                    {b.branch}
                  </SelectItem>
                ))}
              </div>
            </SelectLabel>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BranchDropDownMenu;

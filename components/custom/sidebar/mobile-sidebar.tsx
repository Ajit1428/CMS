import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden transition-all">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-[20rem]">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

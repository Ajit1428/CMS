import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import SideBar from "./sidebar";

const MobileSidebar = () => {
  return ( 
    <Sheet>
      <SheetTrigger className="md:hidden transition-all pr-4">
        <Menu size={35} />
      </SheetTrigger>
      <SheetContent side="left">
        <SideBar />
      </SheetContent>
     </Sheet> 
   );
}
 
export default MobileSidebar;
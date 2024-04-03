"use client"

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
      <SheetTrigger className="md:hidden transition-all">
        <Menu className="fixed top-4 left-4" size={35} />
      </SheetTrigger>
      <SheetContent side="left">
        <SideBar />
      </SheetContent>
     </Sheet> 
   );
}
 
export default MobileSidebar;
"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface sideBarItemsProps {
  label: string
  icon : LucideIcon
  href: string
}

const SideBarItems = ({
  label,
  icon: Icon,
  href
}: sideBarItemsProps) => {
  const pathname = usePathname()
  const router = useRouter() 

  console.log(pathname)

const isActive = (pathname === "/" && href === "/") || pathname === href || pathname.startsWith(`${href}/`) 

  const onClick = () => {
    router.push(href)
  }

  return ( 
      <button 
      onClick={onClick}
      type="button" 
      className={cn("flex items-center w-full text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-sky-200/20", isActive &&
      "text-sky-700 bg-sky-600/20 border-r-4 border-yellow-400 hover:bg-sky-200/20 hover:text-sky-700")}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon 
         size={22} 
         className={cn("text-slate-500", isActive && "text-sky-700")}
          />
          {label}
        </div>
      </button>
   );
}
 
export default SideBarItems;
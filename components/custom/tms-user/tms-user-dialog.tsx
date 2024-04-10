"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";

interface TMSUserProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const TMSUserDialog = ({
  title,
  description,
  children,
}: TMSUserProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <CirclePlus size={15} />
          Add TMS User
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#1e1e2e]">
        <DialogHeader>
          <DialogTitle className="text-blue-500 font-extrabold flex items-center gap-2">
            <Image
              alt="kumari_logo"
              src="/kumari_logo.png"
              width={40}
              height={40}
            />
            {title}
          </DialogTitle>
          <DialogDescription className="flex justify-start">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

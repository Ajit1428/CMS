"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import BranchDropDownMenu from "./branch-dropdown";

interface ModalProps {
  title: string;
  description: string;
}

export const BranchModal = ({ title, description }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="flex items-center gap-1">
            <CirclePlus size={15} />
            Create a Branch
          </div>
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
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <BranchDropDownMenu />
        <div className="flex justify-end items-center gap-2">
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

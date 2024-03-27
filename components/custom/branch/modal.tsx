"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
}

export const BranchModal = ({ title, description }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new branch</Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#1e1e2e]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

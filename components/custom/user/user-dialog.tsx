"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useZustand } from "@/hooks/zustand/useZustand";

import Image from "next/image";

interface ModalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const UserDetailDialog = ({ title, description, children }: ModalProps) => {
  const open = useZustand((state) => state.open)
  const onClose = useZustand((state) => state.onClose)

  const onChange = (open: boolean) => {
    if(open){
      onClose();
    }
  }
  return (
        <Dialog open={open}>
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
              <DialogDescription className="flex justify-start">{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
  );
};
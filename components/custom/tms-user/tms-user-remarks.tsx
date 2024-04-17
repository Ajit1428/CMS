"use client";

import { cn } from "@/lib/utils";
import { TMSUserDialog } from "./tms-user-dialog";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

const TMSRemarksView = ({ remarks }: { remarks: string }) => {
  return (
    <div>
      <TMSUserDialog
        title="Remarks"
        description="Please read the below mentioned remarks"
        buttonTitle="View"
        icon={Eye}
      >
        <div className=" border-t-2 border-blue-400 pt-4">
          <div
            className={cn(
              "bg-white",
              remarks &&
                "rounded-md w-fit p-2 bg-red-600  text-white shadow-sm",
            )}
          >
            {remarks ? remarks : "No remarks to show"}
          </div>
        </div>
        <DialogClose asChild>
          <Button className="ml-auto" variant="destructive">
            Close
          </Button>
        </DialogClose>
      </TMSUserDialog>
    </div>
  );
};

export default TMSRemarksView;

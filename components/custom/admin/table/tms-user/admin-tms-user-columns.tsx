"use client";

import TMSRemarksView from "@/components/custom/tms-user/tms-user-remarks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import {
  ArrowUpDown,
  CopyIcon,
  EditIcon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react";
import toast from "react-hot-toast";

export type branchProps = {
  id: string;
  clientName: string;
  clientCode: string;
  status: string;
  sentBy: string;
  branchName: string;
  remarks: string;
  courier: string;
  isAdmin: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<branchProps>[] = [
  {
    accessorKey: "clientCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusF = new String(row.getValue("status"));
      const statusM = statusF.toString();
      return (
        <div
          className={cn(
            "bg-pink-100 p-2 rounded-md w-fit",
            statusM === "Approved"
              ? "bg-green-300 dark:text-black"
              : statusM === "Unapproved" && "bg-red-400 text-white",
          )}
        >
          {statusM}
        </div>
      );
    },
  },
  {
    accessorKey: "sentBy",
    header: "Sender's Name",
  },
  {
    accessorKey: "courier",
    header: "Courier",
    cell: ({ row }) => {
      const courierF = new String(row.getValue("courier"));
      const courierM = courierF.toString();
      return (
        <div
          className={cn(
            "p-2 rounded-md w-fit",
            courierM === "Received"
              ? "bg-green-300 dark:text-black"
              : courierM === "Not Received" && "bg-red-400 text-white",
          )}
        >
          {courierM}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Received Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString();
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Modified Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formattedDate = date.toLocaleDateString();
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    header: "Remarks",
    cell: ({ row }) => {
      const tmsUser = row.original;

      return <TMSRemarksView remarks={tmsUser.remarks} />;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const userData = row.original;
      const values = {
        _id: userData.id,
      };
      const onClickEdit = () => {
        window.location.assign(`/admin/tms/${values._id}`);
      };
      const onClickDelete = async () => {
        await axios.delete("/api/admin/tms-user", { data: values });
        toast.success("The tms user has been deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      };
      return (
        <>
          <Button onClick={onClickEdit} className="mr-2">
            <EditIcon className="w-5 h-5" />
          </Button>
          <Button
            onClick={onClickDelete}
            variant="destructive"
            disabled={userData.isAdmin !== "admin" && true}
          >
            <Trash2Icon className="w-5 h-5" />
          </Button>
        </>
      );
    },
  },
  {
    header: "More options",
    id: "actions",
    cell: ({ row }) => {
      const tmsUser = row.original;

      return (
        <div className="ml-[2rem]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(tmsUser.clientCode)
                }
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy Client Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

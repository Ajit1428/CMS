"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

export type branchProps = {
  id: string;
  branchName: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<branchProps>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Branch Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
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
    header: "Actions",
    cell: ({ row }) => {
      const branchData = row.original;
      const values = {
        _id: branchData.id,
      };
      const onClickDelete = async () => {
        await axios.delete("/api/admin/branch", { data: values });
        toast.success("The branch has been deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      };
      return (
        <Button onClick={onClickDelete} variant="destructive">
          <Trash2Icon className="w-5 h-5" />
        </Button>
      );
    },
  },
];

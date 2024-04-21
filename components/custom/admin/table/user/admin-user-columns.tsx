"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, EditIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

export type branchProps = {
  id: string;
  name: string;
  role: string;
  email: string;
  branchName: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<branchProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 py-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User&apos;s Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "branchName",
    header: "Branch Name",
  },
  {
    accessorKey: "contact",
    header: "Contact",
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
      const userData = row.original;
      const values = {
        _id: userData.id,
      };
      const onClickEdit = () => {
        window.location.assign(`/admin/manage-user/${values._id}`);
      };
      const onClickDelete = async () => {
        await axios.delete("/api/user", { data: values });
        toast.success("The user has been deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      };
      return (
        <>
          <Button onClick={onClickEdit} className="mr-2">
            <EditIcon className="w-5 h-5" />
          </Button>
          <Button onClick={onClickDelete} variant="destructive">
            <Trash2Icon className="w-5 h-5" />
          </Button>
        </>
      );
    },
  },
];

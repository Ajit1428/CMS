import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const TMSUserTable = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const { branchName } = await UserModel.findOne({ userId });
  if (!branchName) {
    redirect("/");
  }

  const branch = await TMSUserModel.find({ branchName });

  return (
    <div className="overflow-x-hidden border-2 m-4">
      <Table>
        <TableCaption className="font-bold border-2 text-lg bg-blue-200">Total sent KYC : <span className="text-xl">[{branch.length}]</span></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Client Code</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sender&apos;s Name </TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>UpdatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branch &&
            branch.map((a: any) => (
              <TableRow key={a._id}>
                <TableCell>{a.clientCode}</TableCell>
                <TableCell>{a.clientName}</TableCell>
                <TableCell><span className="bg-green-300 p-2 border-2 rounded-md">{a.status}</span></TableCell>
                <TableCell>{a.sentBy}</TableCell>
                <TableCell>
                  {a.createdAt.toLocaleDateString().toString()}
                </TableCell>
                <TableCell>
                  {a.updatedAt.toLocaleDateString().toString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

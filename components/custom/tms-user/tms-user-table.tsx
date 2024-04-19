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
import TMSRemarksView from "./tms-user-remarks";

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
        <TableCaption className="font-bold w-full text-lg">
          <div className="flex justify-between items-center p-1 border-t-2 m-2 text-black/70 dark:text-black">
            <div className="w-fit m-2 bg-gradient-to-br  from-sky-300 to-yellow-300  py-2 px-[0.60rem] rounded-full">
              Total received KYC
              <span className="p-2 ml-2">({branch.length})</span>
            </div>
            <div className="w-fit m-2 bg-gradient-to-br from-sky-300 to-yellow-300 py-2 px-[0.60rem] rounded-full">
              Total approved KYC
              <span className="p-2 ml-2">
                ({branch.filter((a) => a?.status === "Approved").length})
              </span>
            </div>
            <div className="w-fit m-2 bg-gradient-to-br from-sky-300 to-yellow-300 py-2 px-[0.60rem] rounded-full">
              Total unapproved/pending KYC
              <span className="p-2 ml-2">
                ({branch.filter((a) => a?.status === "Unapproved").length})
              </span>
            </div>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Client Code</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sender&apos;s Name </TableHead>
            <TableHead>Received Date</TableHead>
            <TableHead>Modified Date</TableHead>
            <TableHead>Courier</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branch &&
            branch.map((a: any) => (
              <TableRow key={a._id}>
                <TableCell>{a.clientCode}</TableCell>
                <TableCell>{a.clientName}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "bg-pink-100 p-2 rounded-md",
                      a.status === "Approved"
                        ? "bg-green-300 dark:text-black"
                        : a.status === "Unapproved" && "bg-red-400 text-white",
                    )}
                  >
                    {a.status}
                  </span>
                </TableCell>
                <TableCell>{a.sentBy}</TableCell>
                <TableCell>
                  {a.createdAt.toLocaleDateString().toString()}
                </TableCell>
                <TableCell>
                  {a.updatedAt.toLocaleDateString().toString()}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "p-2 rounded-md",
                      a.courier === "Received"
                        ? "bg-green-300 dark:text-black"
                        : a.courier === "Not Received" &&
                            "bg-red-400 text-white",
                    )}
                  >
                    {a.courier}
                  </span>
                </TableCell>
                <TableCell>
                  <TMSRemarksView remarks={a.remarks} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

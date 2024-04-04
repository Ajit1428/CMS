import branchModel from "@/model/branch/branch-model";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function AdminDashboard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { branchId: string };
}) {
  const userId = auth();

  if (!userId) {
    redirect("/");
  }

  const response = await branchModel.findOne({ _id: params.branchId });

  return (
      <div>{children}</div>
  );
}

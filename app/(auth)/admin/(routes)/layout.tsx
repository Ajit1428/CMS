import { SiderbarProvider } from "@/provider/sidebar/sidebar-provider";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full overflow-hidden">
        <SiderbarProvider />
        <div className="ml-60 mt-2">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;

import { mongoDB } from "@/config/db/mongodb";
import { SiderbarProvider } from "@/provider/sidebar/sidebar-provider";
import { ToastProvider } from "@/provider/toast/toast-provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  mongoDB()
  return (
    <>
      <ToastProvider />
      <div className="h-full overflow-hidden">
        <SiderbarProvider />
        <div className="ml-60 mt-2">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;

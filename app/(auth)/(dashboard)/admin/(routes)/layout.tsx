import RightNavbar from "@/components/custom/navbar/right-navbar";
import MobileSidebar from "@/components/custom/sidebar/mobile-sidebar";
import SideBar from "@/components/custom/sidebar/sidebar";
import { mongoDB } from "@/config/db/mongodb";
import { ToastProvider } from "@/provider/toast/toast-provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  mongoDB();
  return (
    <>
      <ToastProvider />
      <div className="h-full overflow-hidden">
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <SideBar />
        </div>
        <div className="flex flex-col fixed  z-50 m-4">
          <MobileSidebar />
        </div>
        <div className="mb-3">
          <RightNavbar />
        </div>
        <div className="ml-60">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;

import LeftNavbar from "@/components/custom/navbar/left-navbar";
import RightNavbar from "@/components/custom/navbar/right-navbar";
import MobileSidebar from "@/components/custom/sidebar/mobile-sidebar";
import SideBar from "@/components/custom/sidebar/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-hidden">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="flex flex-col fixed  z-50 m-4">
        <MobileSidebar />
      </div>
      <div className="flex items-center justify-between ml-60 my-2 border-b-2 shadow-sm rounded-sm mr-2 pb-2">
        <LeftNavbar />
        <RightNavbar />
      </div>
      <div className="ml-60">{children}</div>
    </div>
  );
};

export default AdminLayout;

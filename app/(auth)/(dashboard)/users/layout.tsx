import NavBar from "@/components/custom/navbar/right-navbar";
import MobileSidebar from "@/components/custom/sidebar/mobile-sidebar";
import SideBar from "@/components/custom/sidebar/sidebar";

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-hidden">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="flex flex-col fixed  z-50 m-4">
        <MobileSidebar />
      </div>
      <div className="flex justify-end m-2">
        <NavBar />
      </div>
      <div className="ml-60">{children}</div>
    </div>
  );
};

export default StaffLayout;

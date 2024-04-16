import KumariLogo from "../logo/kumariLogo";
import SideBarRoutes from "./sidebar-routes";
import SidebarTMSUserCreate from "./sidebar-tms-user-create";
import SidebarBranchCreate from "./siderbar-branch-create";

function SideBar() {
  return (
    <div className="flex md:flex flex-col fixed w-[20rem] md:w-56 items-center h-full  border-r shadow-md bg-white dark:bg-[#1e1e2e] dark:shadow-blue-400">
      <KumariLogo />
      <SideBarRoutes />
      <div className="flex flex-col space-y-4 mb-4 items-center">
      <SidebarTMSUserCreate />
      <SidebarBranchCreate />
      </div>
    </div>
  );
}

export default SideBar;

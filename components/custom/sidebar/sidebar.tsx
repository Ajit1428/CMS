import KumariLogo from "../logo/kumariLogo"
import SideBarRoutes from "./sidebar-routes"

function SideBar() {
  return (
    <div className="flex flex-col items-center h-full border-r w-full shadow-md bg-white dark:bg-[#1e1e2e] dark:shadow-blue-400">
      <KumariLogo />
      <SideBarRoutes />
    </div>
  )
}

export default SideBar
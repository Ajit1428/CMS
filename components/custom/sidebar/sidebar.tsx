import KumariLogo from "../kumariLogo"
import SideBarRoutes from "./sidebar-routes"

function SideBar() {
  return (
    <div className="flex flex-col items-center h-full border-r w-full bg-white">
      <KumariLogo />
      <SideBarRoutes />
    </div>
  )
}

export default SideBar
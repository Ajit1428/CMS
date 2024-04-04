import { SiderbarProvider } from "@/provider/sidebar/sidebar-provider";

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-hidden">
      <SiderbarProvider />
      <div className="ml-60">{children}</div>
    </div>
  );
};

export default StaffLayout;

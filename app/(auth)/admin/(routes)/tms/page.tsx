import { TMSUserDialog } from "@/components/custom/tms-user/tms-user-dialog";
import { TMSUserModal } from "@/components/modal/admin/tms-user/tms-user-modal";

const TmsPage = () => {
  return (
    <div>
      <TMSUserDialog
        title="Create TMS User"
        description="Enter the details of the TMS client"
      >
        <TMSUserModal />
      </TMSUserDialog>
    </div>
  );
};

export default TmsPage;

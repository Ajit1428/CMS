interface LeftNavbarProps {
  branchName: string;
}

const LeftNavbar: React.FC<LeftNavbarProps> = ({ branchName }) => {
  return (
    <>
      {branchName && (
        <div className="fixed w-full ml-56">
          <div className="w-fit bg-yellow-400 rounded-md p-2 m-2">
            <div className="w-full">{branchName}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftNavbar;

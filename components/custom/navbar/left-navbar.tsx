interface LeftNavbarProps {
  branchName: string;
}

const LeftNavbar: React.FC<LeftNavbarProps> = ({ branchName }) => {
  return (
    <>
      {branchName && (
        <div className="w-full md:ml-56">
          <div className="w-fit bg-yellow-400 rounded-md p-2">
            <span className="text-sm md:text-lg">{branchName}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftNavbar;

import { IoMdMenu } from "react-icons/io";
import AnimateBtn from "../Buttons/AnimateBtn";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit h-10 p-1 flex items-center justify-end gap-2 bg-[#f4efe7] rounded-4xl z-[9999] cursor-pointer group transition-all duration-500">
      <div>
        {/* <p className="text-[12px] pl-4 hover:font-bold">Menu</p> */}
        <div className="pl-4 text-[#2a2725] flex items-center gap-4">
          <Link to="/dashboard" className='inline-block'>
            <AnimateBtn btnName="Dashboard" />
          </Link>
          <div className='inline-block'>
            <AnimateBtn btnName="Menu" />
          </div>
        </div>
      </div>
      <div className="bg-[#2a2725] rounded-full p-2">
        <IoMdMenu className="text-[#b1a696] transition-transform duration-500 group-hover:rotate-[360deg]" />
      </div>
    </div>
  );
};

export default Navbar;

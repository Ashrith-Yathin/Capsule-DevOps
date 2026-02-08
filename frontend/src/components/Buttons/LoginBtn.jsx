import { MdArrowOutward } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

const LoginBtn = () => {
    const { user, loginWithGoogle, logout } = useAuth();

    const handleClick = async () => {
        if (user) {
            await logout();
        } else {
            await loginWithGoogle();
        }
    };

    return (
        <div className="relative z-49">
            <div className="absolute right-6 top-[2vw] bg-[#f4efe7] px-1 py-1 flex justify-end items-center rounded-4xl gap-2 cursor-pointer" onClick={handleClick}>
                {user ? (
                    <>
                        <div className="flex items-center gap-2 pl-3">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-[12px] text-[#2a2725] font-medium pr-1">
                                {user.displayName?.split(' ')[0]}
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <span className="text-[12px] text-[#2a2725] pl-3 font-medium">Login</span>
                        <MdArrowOutward className="bg-[#2a2725] text-[#b3a694] w-7 h-7 rounded-full p-1" />
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginBtn;

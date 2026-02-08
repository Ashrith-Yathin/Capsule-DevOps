import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { MdArrowOutward } from "react-icons/md";

const AuthButton = () => {
    return (
        <div className="relative z-49">
            <SignedOut>
                <div className="absolute right-6 top-[2vw] bg-[#f4efe7] px-1 py-1 flex justify-end items-center rounded-4xl gap-2 cursor-pointer">
                    <SignInButton mode="modal">
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] text-[#2a2725] pl-3 font-medium">Sign In</span>
                            <MdArrowOutward className="bg-[#2a2725] text-[#b3a694] w-7 h-7 rounded-full p-1" />
                        </div>
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <div className="absolute right-6 top-[2vw] bg-[#f4efe7] px-3 py-2 flex justify-end items-center rounded-4xl">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-7 h-7"
                            }
                        }}
                    />
                </div>
            </SignedIn>
        </div>
    );
};

export default AuthButton;

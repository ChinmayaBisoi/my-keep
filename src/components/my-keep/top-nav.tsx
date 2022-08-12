import React from "react";
import MainLogo from "../../../public/my-keep/main-logo-48.svg";
import Image from "next/image";
import Sun from "../../../public/my-keep/sun-new.svg";
import Moon from "../../../public/my-keep/moon-solid.svg";

const TopNav = () => {
  return (
    <div className="text-[#ffffff] p-8 grid grid-cols-12 border-b border-[#525355]">
      <div className="flex space-x-8 items-center col-span-2">
        <Image
          src={"/my-keep/main-logo-48.svg"}
          width={48}
          height={48}
          alt="main-logo"
        />
        {/* <MainLogo className="w-48 h-48" /> */}
        <div className="text-[#ffffff] text-22">Keep</div>
      </div>
      <div className="col-span-8"></div>
      <div className="col-span-2 flex space-x-10 items-center justify-end">
        {/* <div className="bg-[#525355]"><Image /></div> */}
        <div>
          {/* <Image src={"/my-keep/sunny.png"} width={48} height={48} />
           */}
          <Sun className="w-48 min-w-48 h-48" />
          {/* <Moon className="w-48 h-48 min-w-48 text-[#FFC10A]" /> */}
        </div>
      </div>
    </div>
  );
};

export default TopNav;

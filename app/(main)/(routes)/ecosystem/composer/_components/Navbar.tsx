"use client";

import Image from "next/image";
import { memo } from "react";
import { NavbarProps } from "../types/type";
import ActiveUsers from "./users/ActiveUsers";
import { Origami } from "lucide-react";

const Navbar = ({ activeElement }: NavbarProps) => {

  return (
    <nav className="flex flex-row select-none items-center
    justify-between gap-4  bg-[#F5F5F5] dark:bg-[#262626] px-5 text-white">
    < span className="flex items-center gap-2">
      <Origami 
    width={35} height={35} className="ml-[20px] stroke-[#262626] dark:stroke-[#F5F5F5]" />
    <div className="dark:text-[#F5F5F5] text-[#262626]">Composer</div>
    </span>
    <div >
      <ActiveUsers />
    </div>
    </nav>  
  );
};

export default memo(Navbar, (prevProps, nextProps) =>
prevProps.activeElement === nextProps.activeElement);
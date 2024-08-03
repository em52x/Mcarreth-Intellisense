"use client";

import Image from "next/image";
import { memo } from "react";
import { ActiveElement, NavbarProps } from "../types/type";
import ActiveUsers from "./users/ActiveUsers";
import { Origami } from "lucide-react";
import { navElements } from "../constants";
import ShapesMenu from "./ShapesMenu";
import { NewThread } from "./comments/NewThread";
import { Button } from "@/components/ui/button";

const Navbar = ({ activeElement, imageInputRef,
  handleImageUpload, handleActiveElement }: NavbarProps) => {
  
    const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className="flex  flex-row select-none items-center 
    justify-between gap-4  bg-[#F5F5F5] dark:bg-[#262626] px-5 text-white">
    < span className="flex items-center gap-2">
      <Origami 
    width={35} height={35} className="ml-[20px] stroke-[#262626] dark:stroke-[#F5F5F5]" />
    <div className="dark:text-[#F5F5F5] text-[#262626]">Composer</div>
    </span>

    <ul className="flex flex-row z-[99999]">
      {navElements.map((item: ActiveElement | any) => (
        <li
          key={item.name}
          onClick={() => {
            if (Array.isArray(item.value)) return;
             handleActiveElement(item);  // Corrección: Se agregó un punto y coma al final de la línea
          }}
          className={`group px-2.5 py-5 flex justify-center items-center
            ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}`}
        >
          {Array.isArray(item.value) ? (
            <ShapesMenu 
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
                />
          ): item?.value === 'comments' ? (
            <NewThread>
              <Button className="relative w-7 h-7 object-contain bg-transparent">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert" : ""}
                  />
                </Button>
            </NewThread>
          ): (
            <Button className="relative w-7 h-7 object-contain bg-transparent   ">
              <Image
                  src={item.icon}
                  alt={item.name}
                  fill                  
                  className={isActive(item.value) ? "invert" : ""}
                />
            </Button>
          )}          
        </li>
      ))}

    </ul>


    <div >
      <ActiveUsers />
    </div>
    </nav>  
  );
};

export default memo(Navbar, (prevProps, nextProps) =>
prevProps.activeElement === nextProps.activeElement);
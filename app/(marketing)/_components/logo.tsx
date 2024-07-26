import Image from "next/image";
import { Poppins } from "next/font/google";


import { cn } from "@/lib/utils";

export const Logo = () => {
    return (
        <div className="flex items-center">
            <Image 
                src="/logo.png"
                height="15"
                width="15"
                alt="Logo"
                className="dark:hidden"
            />
            <Image 
                src="/logo-dark.png"
                height="15"
                width="15"
                alt="Logo"
                className="hidden dark:block"
            />
            <p className={cn("font-bold text-[0.6rem] ml-1 u")}>
                Mcarreth Intellisense                
            </p>
        </div>
    )
}
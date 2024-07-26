"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from 'next/link'; // Importar Link

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth(); 
    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-backgroung fixed top-0 flex items-center w-full p-3",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className=" md:justify-end justify-between w-full flex items-center gap-x-2 text-[0.6rem]">
                {isLoading && (
                    <p>Loading...</p>
                )}
                {!isLoading && (
                    <>
                        {!isAuthenticated ? (
                            <SignInButton mode="modal" >
                                <Button className="text-[0.5rem] py-0.5 flex">
                                    Login
                                </Button>
                            </SignInButton>
                        ) : (
                            <>
                                <Link href="/documents">
                                    <Button className="text-[0.5rem] py-0.5 flex">
                                        Access Ecosystem
                                    </Button>
                                </Link>
                                <UserButton afterSwitchSessionUrl="/"/>
                            </>
                        )}
                    </>
                )}
                
                <ModeToggle />
                
            </div>
        </div>
    )
}
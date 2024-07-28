"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight,  } from "lucide-react";
import { useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
import Lottie from 'lottie-react';
import darkanimationData from '@/public/dark-nobackgoud-lottie.json';
import ligthanimationData from '@/public/light-nobackgoud.json';
import Image from 'next/image';

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);
    }, []);

    return (
        <div className="max-w-3xl space-y-4 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-1xl sm:text-2xl md:text-2xl flex flex-col items-center text-center justify-center font-semibold">
            Unify, Optimize, and Empower Your Marketing Initiatives  
            </h1>
            

            <div className="hidden dark:block w-full  items-center justify-center">
                <Lottie animationData={darkanimationData} style={{ width: '100%', height: '200px' }} />
            </div>
            <div className="dark:hidden  w-full  items-center justify-center">
                <Lottie animationData={ligthanimationData} style={{ width: '100%', height: '200px' }} />
            </div>
            <div className="flex items-center justify-center">
            <Image 
                    src="/logo.png" 
                    height="30" 
                    width="30" 
                    alt="Logo" 
                    className="ml-1 dark:hidden"
                />
                <Image 
                    src="/logo-dark.png" 
                    height="30" 
                    width="30" 
                    alt="Logo" 
                    className="ml-1 hidden dark:block"
                />
                <h1 className="ml-1  font-bold text-1xl sm:text-2xl md:text-2xl">Mcarreth Intellisense</h1>
                
            </div>
           

            <h3 className="text-base flex flex-col items-center text-center justify-center font-medium">
            The Ultimate Digital Marketing Ecosystem for Agencies and Professionals


            </h3>
            <div className="flex justify-center text-[0.5rem]">
                {isLoading && <p>Loading...</p>}
                {!isLoading && (
                    <>
                        {!isAuthenticated ? (
                            <SignInButton mode="modal">
                                <Button className="text-[0.5rem] py-0.5 flex">
                                    Login Ecosystem
                                </Button>
                            </SignInButton>
                        ) : (
                            <>
                                <Link href="/ecosystem">
                                    <Button className="text-[0.5rem] py-0.5 flex">
                                        Access Ecosystem
                                        <ArrowRight />
                                    </Button>
                                </Link>
                                
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
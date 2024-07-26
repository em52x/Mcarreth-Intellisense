"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight,  } from "lucide-react";
import { useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

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
                Your Ideas, Document, Plans. unified. Welcome to <span className="underline font-bold"> Mcarreth Intellisense</span>
            </h1>

            <div className="w-full flex items-center justify-center">
                <iframe
                    src="https://lottie.host/embed/211fd42f-70f0-468d-9816-8dbba2d3a76b/mW7fRnhiCP.json"
                    style={{ width: '60%', height: '100px' }}
                    title="Lottie Animation"
                ></iframe>
            </div>

            <h3 className="text-base flex flex-col items-center text-center justify-center font-medium">
                Conected workspace where better, faster work happens
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
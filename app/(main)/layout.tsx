"use client"

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { Room } from "./(routes)/ecosystem/composer/Room";



const MainLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    if (!isAuthenticated) {
        return redirect("/");
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                
                <SearchCommand />
                <Room>
                {children}
                </Room>
            </main>
            

        </div>
    );
}

export default MainLayout;
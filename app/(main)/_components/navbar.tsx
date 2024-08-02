"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
// import { MenuIcon } from "lucide-react"; // Eliminar la importación de MenuIcon
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { memo } from "react";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
};

export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {
    const params = useParams();
    const documentId = params.documentId;

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    });
    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2
          w-full flex items-center">
            <Title.Skeleton / >
            
            </nav>
        )
    }

    if (document === null) {
        return null;
    }


    return (
        <>
          <nav className="flex flex-row select-none items-center
    justify-between gap-4  bg-[#F5F5F5] dark:bg-[#262626] px-5 text-white">
            {/* < span className="flex items-center gap-2"> // Eliminar el span
              <MenuIcon 
                width={35} height={35} className="ml-[20px] stroke-[#262626] dark:stroke-[#F5F5F5]" />
              <div className="dark:text-[#F5F5F5] text-[#262626]">
                <Title initialData={document} />
              </div>
            </span> */}
            <div className="dark:text-[#F5F5F5] text-[#262626]">
                <Title initialData={document} />
            </div>
            <div >
              <Menu documentId={document._id} />
            </div>
          </nav>


          {/*este es el banner rojo para cuando esta borrado el doc*/}
          {document.isArchived && (
            <Banner documentId={document._id} />
          )}
        </>
    )
};

export default memo(Navbar, (prevProps, nextProps) => {
    return prevProps.isCollapsed === nextProps.isCollapsed;
});
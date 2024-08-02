"use client"

import { cn } from "@/lib/utils";
import { ChevronsLeft, LayoutDashboard, MenuIcon, Origami, Plus, PlusCircle, Search, Settings, Settings2Icon, Trash } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import { Button } from "@/components/ui/button";
import { create } from "@/convex/documents";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { toast } from 'sonner';
import { useSearch } from "@/hooks/use-search";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent } from "@/components/ui/popover";


import { Item } from "./item";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";
import { useSettings } from "@/hooks/use-settings";
// import { Navbar } from "./navbar"; // Eliminar la importación de Navbar

import { useRouter } from "next/navigation";

export const Navigation = () => {
    const params = useParams();
    const Settings = useSettings();
    const search = useSearch();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const router = useRouter();

    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsRessetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    

    

    useEffect(() => {
      if (isMobile) {
        collapse();
      } else {
        resetWidth();
      }
    }, [isMobile]);

    useEffect(() => {
      if (isMobile || pathname === '/ecosystem/composer') {
        collapse();
      }
    }, [pathname, isMobile]);

    const handleMouseDown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.preventDefault();
      event.stopPropagation();

      isResizingRef.current = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = event.clientX;

      if (newWidth < 240) newWidth = 240;
      if (newWidth > 480) newWidth = 480;

      if (sidebarRef.current && navbarRef.current) { // Cambiar 'IF' a 'if'
        sidebarRef.current.style.width = `${newWidth}px`;
        navbarRef.current.style.setProperty("left", `${newWidth}px`); // Corregir 'setProperety' a 'setProperty'
      }
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
      if (sidebarRef.current && navbarRef.current) {
        setIsCollapsed(false);
        setIsRessetting(true);

        sidebarRef.current.style.width = isMobile ? "100%" : "240px";
        navbarRef.current.style.setProperty(
          "width",
          isMobile ? "100%" : "240px"
        );
        setTimeout(() => setIsRessetting(false), 300);
      }

    };

    const collapse = () => {
      if (sidebarRef.current && navbarRef.current) {
        setIsCollapsed(true);
        setIsRessetting(true);

        sidebarRef.current.style.width = "0";
        navbarRef.current.style.setProperty("width", "100%");
        navbarRef.current.style.setProperty("left", "0");
        setTimeout(() => setIsRessetting(false), 300);
      }

    };

     
    const handleCreate =  () => {
      const promise = create({ title: "Untitled" });

      toast.promise(promise, {
        loading: "Creating a new document...",
        success: "New document created!",
        error: "Failed to create a new document.",
        
      });
    };
    


    return (
        <>
        <aside
          ref={sidebarRef}
          className={cn(
            "group/sidebar h-full bg-secondary overflow-x-auto relative flex w-60 flex-col z-[99999]",
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "w-0"
                  
          )}
        >
          <div
          onClick={collapse}
            role="button"
            className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            
            )}
          >
            <ChevronsLeft />
          </div>
          <div>
            {/* <p>Action items</p> */}
            <UserItem />
            <Item
              label="Search"
              icon={Search}
              isSearch
              onClick={search.onOpen}
              />
              <Item
              label="Settings"
              icon={Settings2Icon} // Cambiar 'Settings' a 'SettingsIcon'
              onClick={Settings.onOpen}
              />
          </div>
          <div>
              <Item 
                onClick={handleCreate }
                label="New Document"
                icon={PlusCircle}
                />
          </div>
          <div >
              <Item 
                onClick={() => router.push('/ecosystem/dashboard')}
                label="Dashboard"
                icon={LayoutDashboard}
                
                />
          </div>
          <div >
              <Item 
                onClick={() => router.push('/ecosystem/composer')}
                label="Composer"
                icon={Origami}
                
                />
          </div>
          
                
          {/* <div className="mt-4 flex items-center justify-between">  
            <p className="mr-1 mb-1">Documents</p>  
            <Button onClick={onCreate} variant="ghost" className="text-[0.5rem] mx-4 h-5 mt-">
              <PlusCircle className="h-4 w-4 mr-1" />
              Create a Document
            </Button>
          </div> */}
          
          <div className="mt-4">
            <DocumentList />
             <Item 
             onClick={handleCreate}
             icon={Plus}
             label="add a document"
             />

          </div>

          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
            className="p-0 w-72"
            side={isMobile ? "right" : "right"}
            >
              <TrashBox/>

            </PopoverContent>
          </Popover>


          <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="opacity-0 group-hover/sidebar:opacity-100
            transition cursor-ew-resize absolute h-full w-1 bg-primary/10
            right-0 top-0"
          
          />
          
          </aside>
        <div
            ref={navbarRef}
            className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
              isResetting && "transition-all ease-in-out duration-300",
              isMobile && "left-0 w-full"
            )}
        >
          {/* {!!params.documentId ? (
             <Navbar
             isCollapsed={isCollapsed}
             onResetWidth={resetWidth} />
          ) : (
            <nav className="bg-transparent px-3 py-4 w-full">
             {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
            </nav>
          )} */}
          <nav className="bg-transparent px-3 py-4 w-full">
             {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>

        </div>
        </>
    )
}
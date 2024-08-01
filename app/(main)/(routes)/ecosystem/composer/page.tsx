"use client";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";
import LeftSidebar from "./_components/LeftSidebar";
import Navbar from "./_components/Navbar";
import RightSidebar from "./_components/RightSidebar";
import Live from "./_components/live";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";
import { ActiveElement } from "./types/type";

 


export const ComposerPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const isDrawing = useRef(false);
    const shapeRef = useRef<fabric.Object |null>(null);
    const selectedShapeRef = useRef<string | null>(`rectangle`);

    const [activeElement, setActiveElement] =
    useState<ActiveElement>({
        name: ``,
        value: ``,
        icon:``,
    })

    const handleActiveElement = (elem: ActiveElement) => {
        setActiveElement(elem);
        selectedShapeRef.current = elem?.value as string;
    }
    
    useEffect(() =>{
        const canvas = initializeFabric({canvasRef, fabricRef})

        canvas.on("mouse:down", (options) => {
            handleCanvasMouseDown({
                options,
                canvas,
                isDrawing,
                shapeRef,
                selectedShapeRef
            })

            window.addEventListener("resize", () => {
                handleResize({fabricRef})
            })
                    
        }, [])
    }); 


    return (
        <Room>         
            <div className="h-screen overflow-hidden" >  
                   <Navbar
                   activeElement={activeElement}
                   handleActiveElement={handleActiveElement}
                    />


                <section className="flex h-full flex-row">
                   <LeftSidebar />
                   <Live canvasRef={canvasRef}/>
                   <RightSidebar />  
                </section >             
            </div >          
        </Room >
    );
              
};

export default ComposerPage;
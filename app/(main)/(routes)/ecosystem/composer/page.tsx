"use client";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";

import Navbar from "./_components/Navbar";

import Live from "./_components/live";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";
import { ActiveElement } from "./types/type";
import Tooltipnavegation from "./_components/Tooltipnavegation";

 


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
            <Navbar
                   activeElement={activeElement}
                   handleActiveElement={handleActiveElement}
                   
                    />
            <div className="h-screen overflow-hidden" >  
                <section className="flex h-full flex-row">
                   
                   <Live canvasRef={canvasRef}/>
                  
                   
                </section >             
            </div >
                    
        </Room >
    );
              
};

export default ComposerPage;
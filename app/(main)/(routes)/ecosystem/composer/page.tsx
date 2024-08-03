"use client";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import Navbar from "./_components/Navbar";
import Live from "./_components/live";
import { handleCanvasMouseMove, handleCanvasMouseDown, handleResize, initializeFabric, handleCanvasMouseUp, renderCanvas } from "@/lib/canvas";
import { ActiveElement } from "./types/type";
import Tooltipnavegation from "./_components/Tooltipnavegation";
import LeftSidebar from "./_components/LeftSidebar";
import RightSidebar from "./_components/RightSidebar";
import { useMutation, useStorage, LiveMap } from "@/liveblocks.config";

export const ComposerPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const isDrawing = useRef(false);
    const shapeRef = useRef<fabric.Object |null>(null);
    const selectedShapeRef = useRef<string | null>(null);
    const activeObjectRef = useRef<fabric.Object | null>(null);
    const canvasObjects = useStorage((root) => root.canvasObjects);

    const syncShapeInStorage = useMutation(({ storage }, object) => { 
        if(!object) return;
        const { objectId } = object;
        const shapeData = object.toJSON();
        shapeData.objectId = objectId;
        
        let canvasObjects = storage.get('canvasObjects');
        if (!canvasObjects) {
            // If canvasObjects doesn't exist, create it as a LiveMap
            canvasObjects = new LiveMap();
            storage.set('canvasObjects', canvasObjects);
        }
        
        // Ensure canvasObjects is a LiveMap
        if (canvasObjects.set) {
            canvasObjects.set(objectId, shapeData);
        } else {
            console.error("canvasObjects is not a map-like structure.");
        }
    }, []);

    const [activeElement, setActiveElement] = useState<ActiveElement>({ 
        name: ``,
        value: ``,
        icon:``,
    });

    const handleActiveElement = (elem: ActiveElement) => {
        setActiveElement(elem);
        selectedShapeRef.current = elem?.value as string;
    }

    useEffect(() => {
        const canvas = initializeFabric({canvasRef, fabricRef});

        canvas.on("mouse:down", (options) => {
            handleCanvasMouseDown({
                options,
                canvas,
                isDrawing,
                shapeRef,
                selectedShapeRef
            });
        });  

        canvas.on("mouse:move", (options) => {
            handleCanvasMouseMove({
                options,
                canvas,
                isDrawing,
                shapeRef,
                selectedShapeRef,
                syncShapeInStorage,
            });
        });

        canvas.on("mouse:up", (options) => {
            handleCanvasMouseUp({
                options,                    
                canvas,
                isDrawing,
                shapeRef,
                selectedShapeRef,
                syncShapeInStorage,
                setActiveElement,
                activeObjectRef,
            });
        });

        window.addEventListener("resize", () => {
            handleResize({canvas});
        });
    }, []);

    useEffect(() => {
        renderCanvas({
            fabricRef,
            canvasObjects,
            activeObjectRef
        });
    }, [canvasObjects]);

    return (
        <main className="h-screen overflow-hidden">
            <Navbar
                activeElement={activeElement}
                handleActiveElement={handleActiveElement}
            />
            <section className="flex h-full flex-row">
                <LeftSidebar />
                <Live canvasRef={canvasRef}/>
                <RightSidebar />               
            </section>             
        </main>
    );
};

export default ComposerPage;

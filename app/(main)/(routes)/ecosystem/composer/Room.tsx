"use client";

import { ReactNode } from "react";
import {   ClientSideSuspense } from "@liveblocks/react/suspense";
import { RoomProvider } from "@/liveblocks.config";
import { LiveMap } from "@liveblocks/client";
import Loader from "./_components/Loader";


export function Room({ children }: { children: ReactNode }) {
  return (
    
    
      <RoomProvider id="my-room" initialPresence={{
        cursor: null, cursorColor: null, editingText: null, 
      }}
      initialStorage={{canvasObjects: new LiveMap()

      }}      
      >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    
  );
}
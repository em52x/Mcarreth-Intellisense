"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item"; 
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">;
    expanded?: Record<string, boolean>;
}

export const DocumentList = ({
    parentDocumentId,
    level = 0,
    expanded = {}, // Asegúrate de que tenga un valor predeterminado
}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const [localExpanded, setLocalExpanded] = useState<Record<string, boolean>>(expanded); // Usar el estado local

    const onExpand = (documentId: string) => {
        setLocalExpanded(prev => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
    };

    const documents = useQuery(api.documents.getsSidebar, {
        parentDocument: parentDocumentId,
    });

    const onRedirect = (documentId: string) => {
        router.push(`/ecosystem/${documentId}`);
    };

    if (documents === undefined) {
        return (
            <>
                <Item.skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.skeleton level={level} />
                        <Item.skeleton level={level} />
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <p
                style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    Object.keys(localExpanded).length > 0 && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No documents inside
            </p>
            {documents.map((document) => (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        onClick={() => onRedirect(document._id)}
                        label={document.title}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={!!localExpanded[document._id]} // Convertir a booleano
                    />
                    {localExpanded[document._id] && (
                        <DocumentList
                            parentDocumentId={document._id}
                            level={level + 1}
                            expanded={localExpanded} // Pasar el objeto localExpanded
                        />
                    )}
                </div>
            ))}
        </>
    );
};
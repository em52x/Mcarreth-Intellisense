"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">;
};

export const Banner = ({
    documentId
}: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId})
        
        

        toast.promise(promise, {
            loading: "Deleting a document...",
            success: "Document Deleted!",
            error: "Failed to delete document.",
    });

    router.push("/ecosystem");
};

    const onRestore = () => {
    const promise = restore({ id: documentId});

    toast.promise(promise, {
        loading: "Restoring a document...",
        success: "Document restored!",
        error: "Failed to restore document.",
});
};
    return (
        <div className=" bg-rose-500 text-center text-sm p-2
        text-white w-full flex items-center flex-grow gap-x-2 justify-center">
            <p>This document is in the Trash.</p>
            <Button
            size="sm"
            onClick={onRestore}
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white"
            >
                Restore
            </Button>
            <ConfirmModal>
                <Button
                    size="sm"
                    onClick={onRestore}
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white"
            >
                    Delete forever
                </Button>
            </ConfirmModal>
            
        </div>
    )
}


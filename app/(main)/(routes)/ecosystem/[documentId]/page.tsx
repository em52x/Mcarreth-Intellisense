"use client";


import Editor from "@/components/editor/advanced-editor";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import Tiptap from "@/components/Tiptap";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/app/default-value";
import { Editor2 } from "@/components/editor";
import Navbar from "@/app/(main)/_components/navbar";




interface DocumentIdPageProps {
  params: { documentId: Id<"documents">};
};

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  });

  const update = useMutation(api.documents.update);
  const [value, setValue] = useState<JSONContent>(defaultValue);
 

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    });
  }


  if (document === undefined) {
    return(
      <div>
      Loading...
    </div>
    );
  };

  if (document === null) {
    return <div>Not Found</div>
  }

  return (
    <div className="pb-40">
      <Navbar/>
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-full mx-auto">
         <Toolbar initialData={document} />
         
         <Editor2 initialValue={value} onChange={onChange}/>
         
      </div>

     </div>
  
);
}

export default DocumentIdPage;
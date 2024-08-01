import {
    BlockNoteEditor,
    filterSuggestionItems,
    PartialBlock,
  } from "@blocknote/core";
  import "@blocknote/core/fonts/inter.css";
  import {
    DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
    useCreateBlockNote,
    
  } from "@blocknote/react";
  import { BlockNoteView } from "@blocknote/mantine";
  import "@blocknote/mantine/style.css";
  import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useTheme } from "next-themes";
import * as Button from "@/components/ui/button"
import * as Select from "@/components/ui/select"
   
  // Custom Slash Menu item to insert a block after the current one.
  const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
    title: "Insert Hello World",
    onItemClick: () => {
      // Block that the text cursor is currently in.
      const currentBlock = editor.getTextCursorPosition().block;
   
      // New block we want to insert.
      const helloWorldBlock: PartialBlock = {
        type: "paragraph",
        content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
      };
   
      // Inserting the new block after the current one.
      editor.insertBlocks([helloWorldBlock], currentBlock, "after");
    },
    aliases: ["helloworld", "hw"],
    group: "Other",
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: "Used to insert a block with 'Hello World' below.",
  });
   
 
  // List containing all default Slash Menu Items, as well as our custom one.
  const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor),
    insertHelloWorldItem(editor),
  ];
   
  export const Editor2 = () => {
    const { resolvedTheme } = useTheme();
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
      initialContent: [
        {
          type: "paragraph",
          content: "Welcome to this demo!",
        },
       
      ],
    });
   
    // Renders the editor instance.
    return (
      <BlockNoteView 
      editor={editor} 
      slashMenu={false} 
      theme={resolvedTheme === "dark" ? "dark" : "light"} 
      className="border p-4 rounded-xl editor-empty items-center justify-center ml-5 ">
        <SuggestionMenuController
          triggerCharacter={"/"}
          // Replaces the default Slash Menu items with our custom ones.
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    );
  }
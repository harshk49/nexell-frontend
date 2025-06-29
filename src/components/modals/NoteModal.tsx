import { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiImage,
  FiPaperclip,
  FiSave,
  FiX,
  FiCode,
} from "react-icons/fi";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: {
    id: string;
    title: string;
    content: string;
    attachments?: string[];
  };
}

const NoteModal = ({ isOpen, onClose, note }: NoteModalProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
    ],
    content: note?.content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  const handleSave = () => {
    const content = editor?.getHTML() || "";
    console.log("Saving note:", { title, content, attachments });
    // Add your save logic here
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!editor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-3 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            {note ? "Edit Note" : "Create New Note"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4 overflow-y-auto">
          {/* Title Input */}
          <div className="space-y-2">
            <Input
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-0 py-2 text-lg font-medium bg-transparent border-0 border-b border-gray-200 rounded-none focus:border-blue-500 focus:ring-0"
            />
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 border rounded-lg bg-gray-50/80 border-gray-200/50">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="sm"
                variant={editor.isActive("bold") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="p-0 w-7 h-7"
              >
                <FiBold size={12} />
              </Button>
              <Button
                type="button"
                size="sm"
                variant={editor.isActive("italic") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="p-0 w-7 h-7"
              >
                <FiItalic size={12} />
              </Button>
              <Button
                type="button"
                size="sm"
                variant={editor.isActive("code") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleCode().run()}
                className="p-0 w-7 h-7"
              >
                <FiCode size={12} />
              </Button>
            </div>

            <div className="w-px h-5 mx-1 bg-gray-300"></div>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="sm"
                variant={
                  editor.isActive("heading", { level: 1 }) ? "default" : "ghost"
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="px-2 text-xs font-medium h-7"
              >
                H1
              </Button>
              <Button
                type="button"
                size="sm"
                variant={
                  editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className="px-2 text-xs font-medium h-7"
              >
                H2
              </Button>
              <Button
                type="button"
                size="sm"
                variant={editor.isActive("bulletList") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="p-0 w-7 h-7"
              >
                <FiList size={12} />
              </Button>
            </div>

            <div className="w-px h-5 mx-1 bg-gray-300"></div>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  const url = window.prompt("Enter image URL:");
                  if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                  }
                }}
                className="p-0 w-7 h-7"
              >
                <FiImage size={12} />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  const url = window.prompt("Enter link URL:");
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className="p-0 w-7 h-7"
              >
                <FiLink size={12} />
              </Button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="min-h-[250px] max-h-[350px] overflow-y-auto">
            <EditorContent
              editor={editor}
              className="prose prose-gray max-w-none focus-within:outline-none"
            />
          </div>

          {/* File Attachments */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 gap-2 text-gray-600 border-dashed hover:text-gray-800"
              >
                <FiPaperclip size={14} />
                Attach Files
              </Button>
              <span className="text-xs text-gray-500">
                {attachments.length > 0 &&
                  `${attachments.length} file${
                    attachments.length > 1 ? "s" : ""
                  } attached`}
              </span>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-1 overflow-y-auto max-h-24">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded">
                        <FiPaperclip size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800 truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="w-6 h-6 p-0 text-gray-400 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx,.txt"
            />
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="gap-2"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="gap-2 text-white border-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <FiSave size={14} />
            {note ? "Update Note" : "Save Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;

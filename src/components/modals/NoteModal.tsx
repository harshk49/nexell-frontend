import { useState, useRef, useEffect } from "react";
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
    id?: string | number;
    title: string;
    content?: string;
    description?: string;
    attachments?: string[];
  } | null;
}

const NoteModal = ({ isOpen, onClose, note }: NoteModalProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update title when note prop changes
  useEffect(() => {
    setTitle(note?.title || "");
  }, [note]);

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
    content: note?.content || note?.description || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // Update editor content when note changes
  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content || note.description || "");
    } else if (editor && !note) {
      editor.commands.setContent("");
    }
  }, [editor, note]);

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
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-2xl border border-gray-200/60 shadow-2xl shadow-gray-900/10 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 rounded-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl"></div>

        <DialogHeader className="relative z-10 pb-6 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-ping opacity-30"></div>
            </div>
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
              {note ? "Edit Note" : "Create New Note"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative z-10 flex flex-col gap-6 py-6 overflow-y-auto">
          {/* Title Input */}
          <div className="space-y-3">
            <div className="relative group">
              <Input
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-5 py-4 text-xl font-semibold text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 bg-gray-50/80 backdrop-blur-sm border-gray-200/60 rounded-2xl focus:border-blue-400/80 focus:ring-4 focus:ring-blue-400/10 focus:ring-offset-0 group-hover:border-indigo-300/70"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 group-hover:opacity-100"></div>
            </div>
          </div>

          {/* Editor Toolbar */}
          <div className="relative group">
            <div className="flex flex-wrap items-center gap-2 p-4 transition-all duration-300 border-2 border-gray-200/60 rounded-2xl bg-gray-50/60 backdrop-blur-sm group-hover:border-indigo-300/70">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={editor.isActive("bold") ? "default" : "ghost"}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-0 w-9 h-9 rounded-xl transition-all duration-200 ${
                    editor.isActive("bold")
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  <FiBold size={14} />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editor.isActive("italic") ? "default" : "ghost"}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-0 w-9 h-9 rounded-xl transition-all duration-200 ${
                    editor.isActive("italic")
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  <FiItalic size={14} />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editor.isActive("code") ? "default" : "ghost"}
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-0 w-9 h-9 rounded-xl transition-all duration-200 ${
                    editor.isActive("code")
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  <FiCode size={14} />
                </Button>
              </div>

              <div className="w-px h-6 mx-2 bg-gradient-to-b from-blue-300/60 to-indigo-300/60"></div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={
                    editor.isActive("heading", { level: 1 })
                      ? "default"
                      : "ghost"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`px-3 text-sm font-bold h-9 rounded-xl transition-all duration-200 ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  H1
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={
                    editor.isActive("heading", { level: 2 })
                      ? "default"
                      : "ghost"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`px-3 text-sm font-bold h-9 rounded-xl transition-all duration-200 ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  H2
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={editor.isActive("bulletList") ? "default" : "ghost"}
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`p-0 w-9 h-9 rounded-xl transition-all duration-200 ${
                    editor.isActive("bulletList")
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  <FiList size={14} />
                </Button>
              </div>

              <div className="w-px h-6 mx-2 bg-gradient-to-b from-indigo-300/60 to-purple-300/60"></div>

              <div className="flex items-center gap-2">
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
                  className="p-0 text-gray-600 transition-all duration-200 border w-9 h-9 rounded-xl hover:text-gray-900 hover:bg-white/80 border-gray-200/80"
                >
                  <FiImage size={14} />
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
                  className="p-0 text-gray-600 transition-all duration-200 border w-9 h-9 rounded-xl hover:text-gray-900 hover:bg-white/80 border-gray-200/80"
                >
                  <FiLink size={14} />
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 group-hover:opacity-100"></div>
          </div>

          {/* Editor Content */}
          <div className="relative group">
            <div className="min-h-[300px] max-h-[400px] overflow-y-auto border-2 border-gray-200/60 rounded-2xl bg-gray-50/40 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-300/70 group-focus-within:border-blue-400/80 group-focus-within:ring-4 group-focus-within:ring-blue-400/10">
              <EditorContent
                editor={editor}
                className="p-6 prose prose-gray max-w-none focus-within:outline-none"
                style={
                  {
                    color: "rgb(31 41 55)",
                    "--tw-prose-body": "rgb(31 41 55)",
                    "--tw-prose-headings": "rgb(17 24 39)",
                    "--tw-prose-links": "rgb(59 130 246)",
                    "--tw-prose-bold": "rgb(17 24 39)",
                    "--tw-prose-code": "rgb(16 185 129)",
                    "--tw-prose-quotes": "rgb(107 114 128)",
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-br from-blue-500/3 via-indigo-500/3 to-purple-500/3 group-hover:opacity-100"></div>
          </div>

          {/* File Attachments */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-10 gap-2 text-blue-600 transition-all duration-300 border-2 border-blue-200/80 hover:border-blue-400 hover:bg-blue-50/80 bg-gray-50/60 backdrop-blur-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/10"
              >
                <FiPaperclip size={16} />
                <span className="font-medium">Attach Files</span>
              </Button>
              <span className="text-sm text-gray-500">
                {attachments.length > 0 &&
                  `${attachments.length} file${
                    attachments.length > 1 ? "s" : ""
                  } attached`}
              </span>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-3 overflow-y-auto max-h-32">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 transition-all duration-300 border-2 border-gray-200/60 rounded-2xl bg-gray-50/60 backdrop-blur-sm hover:border-indigo-300/70 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-blue-500/20">
                        <FiPaperclip size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[250px]">
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
                      className="w-8 h-8 p-0 text-gray-500 transition-all duration-200 hover:text-red-500 hover:bg-red-50/80 rounded-xl"
                    >
                      <FiX size={16} />
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

        <DialogFooter className="relative z-10 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="gap-2 px-6 py-3 font-medium text-gray-600 transition-all duration-300 border-2 border-gray-200/80 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50/80 bg-white/60 backdrop-blur-sm rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="gap-2 px-8 py-3 font-bold text-white transition-all duration-300 transform border-0 shadow-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-400 hover:via-indigo-400 hover:to-purple-400 rounded-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105"
            >
              <FiSave size={16} />
              {note ? "Update Note" : "Save Note"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;

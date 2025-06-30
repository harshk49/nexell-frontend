// Note Model Types
export interface Note {
  _id: string;
  title: string;
  content: string;
  folderId?: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  folderId?: string;
  tags?: string[];
  isPinned?: boolean;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  folderId?: string;
  tags?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
}

export interface NoteFilter {
  folderId?: string;
  tags?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
  searchQuery?: string;
}

export interface NoteSummary {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  isPinned: boolean;
  updatedAt: string;
}

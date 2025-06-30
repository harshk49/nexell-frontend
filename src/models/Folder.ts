// Folder Model Types
export interface Folder {
  _id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  path: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateFolderData {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
}

export interface UpdateFolderData {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
}

export interface FolderTree extends Folder {
  children: FolderTree[];
  notesCount: number;
  tasksCount: number;
}

export interface FolderStats {
  _id: string;
  name: string;
  notesCount: number;
  tasksCount: number;
  childrenCount: number;
}

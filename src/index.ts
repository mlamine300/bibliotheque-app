export interface book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies?: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  unavaliable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: string | Date;
  borrowedDate?: string;
  returnDate?: string;
  dueDate?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}

export interface signUpParams {
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
  userAvatar: string;
}
export interface userInfo {
  id?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "DELETED";
  fullName: string;
  email: string;
  universityId: string;
  userAvatar?: string;
  universityCard: string;
  role?: "USER" | "ADMIN" | "SUPERADMIN";
  createdAt?: Date | string;
}
export interface borrowedBook {
  book: book;
  user: userInfo;
  id: string;
  borrowedDate: string;
  returnDate?: string | null;
  dueDate: string;
  status: "BORROWED" | "RETURNED" | "LATE_RETOURN";
  createdAt: string | Date;
}

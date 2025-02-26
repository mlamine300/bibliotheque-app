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
  createdAt?: string;
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
  createdAt?: Date;
}

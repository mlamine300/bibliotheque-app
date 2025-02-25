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
}

export interface signUpParams {
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
}
export interface userInfo {
  status: "PENDING" | "APPROVED" | "REJECTED";
  name: string;
  email: string;
  studentId: string;
  userAvatar: string;
  universityCard: string;
}

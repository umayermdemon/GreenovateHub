export type TUserProfile = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "member";
    image: string;
    address: string | null;
    isDeleted: boolean;
    needsPasswordChange: boolean;
    createdAt: string;
    updatedAt: string; 
  };
  
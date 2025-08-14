import { userRole } from "../../../../generated/prisma";

export interface IUser {
    name: string;
    role: userRole;
    email: string;
    password: string;
    needsPasswordChange?: boolean;
    image: string;
    address: string;
}

export interface IAuthUser{
    email:string,
    role:string
    userId:string
}
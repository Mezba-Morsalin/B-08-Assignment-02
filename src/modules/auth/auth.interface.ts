import type { TypeMyRole } from "../../types";

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: TypeMyRole
}
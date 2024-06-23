export enum ROLES {
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}
export interface User {
    firstname: string
    lastname: string
    userId?: string
    role: string
    email: string
    password?: string
}

export type authUser = {
    firstname: string
    lastname: string
    userId?: string
    role: string
    email: string
}


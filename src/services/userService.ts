import { User } from "../types/user";
import axios from "./apiservice";

export const signin = (email: string, password: string) => axios.post("auth/signin", {email:email, password:password})

export const register = (user: User) => axios.post("auth/register", user)
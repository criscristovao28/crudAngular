import User from "./User"

export default interface LoginResponse{
    user: User;
    token: string;
}
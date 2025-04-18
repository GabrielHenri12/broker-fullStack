export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    password?: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

import { Role } from "./enums/role";

export class Author {
    id: number;
    name: string;
    role: Role;

    constructor(id: number, name: string, role: Role){
        this.id = id;
        this.name = name;
        this.role = role;
    }
}
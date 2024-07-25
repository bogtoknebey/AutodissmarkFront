export class CreateAuthorRequest {
    Name: string;
    Email: string;
    Password: string;
    Role: string;

    constructor(Name: string, Email: string, Password: string, Role: string){
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.Role = Role;
    }
}

export class LoginRequest {
    Email: string;
    Password: string;

    constructor(Email: string, Password: string) {
        this.Email = Email;
        this.Password = Password;
    }
}

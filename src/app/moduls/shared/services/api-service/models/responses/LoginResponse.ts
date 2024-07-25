export class LoginResponse {
    jwtToken: string;

    constructor(JwtToken: string) {
        this.jwtToken = JwtToken;
    }
}


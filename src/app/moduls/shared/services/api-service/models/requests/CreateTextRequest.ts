export class CreateTextRequest {
    AuthorId: number;
    Text: string;
    Title: string;

    constructor(AuthorId: number, Text: string, Title: string) {
        this.AuthorId = AuthorId;
        this.Text = Text;
        this.Title = Title;
    }
}

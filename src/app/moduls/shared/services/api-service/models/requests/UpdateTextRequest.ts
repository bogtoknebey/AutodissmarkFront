export class UpdateTextRequest {
    Id: number;
    AuthorId: number;
    Text: string;
    Title: string;

    constructor(Id: number, AuthorId: number, Text: string, Title: string) {
        this.Id = Id;
        this.AuthorId = AuthorId;
        this.Text = Text;
        this.Title = Title;
    }
}

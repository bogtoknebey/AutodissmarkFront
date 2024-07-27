export class GetTextResponse {
    id: number;
    authorEntityId: number;
    text: string;
    title: string;
    addedDate: Date;

    constructor(id: number, authorEntityId: number, text: string, title: string, addedDate: Date) {
        this.id = id;
        this.text = text;
        this.title = title;
        this.addedDate = addedDate;
        this.authorEntityId = authorEntityId;
    }
}

export class GetRandomTextResponse {
    id: number;
    text: string;
    title: string;
    addedDate: Date;

    constructor(id: number, text: string, title: string, addedDate: Date) {
        this.id = id;
        this.text = text;
        this.title = title;
        this.addedDate = addedDate;
    }
}

export enum Language {
    Russian,
    English,
    Chinese
}

export class SwitchTranslateTextRequest {
    Text: string;
    SwitchLanguage: Language;
    SwitchTimes: number;

    constructor(Text: string, SwitchLanguage: Language, SwitchTimes: number) {
        this.Text = Text;
        this.SwitchLanguage = SwitchLanguage;
        this.SwitchTimes = SwitchTimes;
    }
}

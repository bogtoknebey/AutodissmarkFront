export class CreateAutoVoiceoverRequest {
    TextId: number;
    VoiceId: number;

    constructor(TextId: number, VoiceId: number) {
        this.TextId = TextId;
        this.VoiceId = VoiceId;
    }
}

export class CreateManualVoiceoverRequest {
    TextId: number;
    AudioData: Blob;

    constructor(TextId: number, AudioData: Blob) {
        this.TextId = TextId;
        this.AudioData = AudioData;
    }
}


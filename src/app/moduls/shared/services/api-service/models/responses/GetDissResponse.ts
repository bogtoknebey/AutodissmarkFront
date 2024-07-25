export class GetDissResponse {
    id: number;
    audioData: string;

    constructor(id: number, audioData: string) {
        this.id = id;
        this.audioData = audioData;
    }
}


export class CreateDissRequest {
    AcapellaId: number;
    BeatId: number;
    StartPointMilliseconds: number;
    Target: string;

    constructor(AcapellaId: number, BeatId: number, StartPointMilliseconds: number, Target: string) {
        this.AcapellaId = AcapellaId;
        this.BeatId = BeatId;
        this.StartPointMilliseconds = StartPointMilliseconds;
        this.Target = Target;
    }
}

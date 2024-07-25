export class AddTargetToTextRequest {
    Text: string;
    Target: string;

    constructor(Text: string, Target: string){
        this.Text = Text;
        this.Target = Target;
    }
}

import { FluxOptirenta } from "./flux-optirenta";
import { User } from "./user";

export class MonitoringOptirenta {
    public id: number = Number(0);
    public titre: string = String();
    public dateAjout:Date | null=null;
    public createurMonitoring =new User();
    public fluxOptirentaList = new Array<FluxOptirenta>();
}

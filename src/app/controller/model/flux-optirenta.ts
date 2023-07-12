import { MonitoringOptirenta } from "./monitoring-optirenta";

export class FluxOptirenta {
    public id: number = Number(0);
    public nomFlux: string = String();
    public etat: string = String();
    public commentaire: string = String();
    public optirenta =new MonitoringOptirenta();
}

import { HealthCheckFlamingo } from "./health-check-flamingo";

export class FluxSapHarmonie {
    public id: number = Number(0);
    public systeme: string = String();
    public etat: string = String();
    public commentaire: string = String();
    public healthCheckFlamingo =new HealthCheckFlamingo();
}

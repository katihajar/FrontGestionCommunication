import { HealthCheckBwPerimetre } from "./health-check-bw-perimetre";
import { Perimetre } from "./perimetre";

export class HealthCheckBwPerimetreDetail {
    public id: number = Number(0);
    public statusNightTreatment: string = String();
    public statusDataIntegrity: string = String();
    public comment: string = String();
    public feedBack: string = String();
    public incidentInProgress: number = Number(0);
    public incidentCompleted: number = Number(0);
    public healthCheckBwPerimetre =new HealthCheckBwPerimetre();
    public perimetre =new Perimetre();
}

import { HealthCheckBwPerimetreDetail } from "./health-check-bw-perimetre-detail";
import { User } from "./user";

export class HealthCheckBwPerimetre {
    public id: number = Number(0);
    public titre: string = String();
    public dateAjout: Date = new Date();
    public healthCheckBwPerimetreDetailList = new Array<HealthCheckBwPerimetreDetail>();
    public createurHealthCheckBwPerimetre = new User();

}

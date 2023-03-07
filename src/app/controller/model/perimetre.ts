import { HealthCheckBwPerimetreDetail } from "./health-check-bw-perimetre-detail";

export class Perimetre {
    public id: number = Number(0);
    public titre: string = String();
    public healthCheckBwPerimetreDetailList = new Array<HealthCheckBwPerimetreDetail>();
}

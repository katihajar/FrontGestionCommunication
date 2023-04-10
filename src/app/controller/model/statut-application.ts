import { Application } from "./application";
import { HealthChekPreprodProd } from "./health-chek-preprod-prod";

export class StatutApplication {
    public id: number = Number(0);
    public statut: string = String();
    public application =new Application();
    public healthChekPreprodProd =new HealthChekPreprodProd();
}

import { HealthChekPreprodProd } from "./health-chek-preprod-prod";
import { ProcessusMetier } from "./processus-metier";

export class EtatProcessusMetier{
    public id: number = Number(0);
    public statut: string = String();
    public processusMetier =new ProcessusMetier();
    public healthChekPreprodProd =new HealthChekPreprodProd();
}

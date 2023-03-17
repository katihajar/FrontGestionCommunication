import { Application } from "./application";
import { HealthChekPreprodProd } from "./health-chek-preprod-prod";

export class HealthChekPreprodProdDetail {
    public id: number = Number(0);
    public statut: string = String();
    public feu: string = String();
    public impactClient: string = String();
    public processus: string = String();
    public impactMetier: string = String();
    public cause: string = String();
    public planAction: string = String();
    public information: string = String();
    public problemeTechnique: string = String();
    public dateDebut: Date = new Date();
    public dateFin: Date = new Date();
    public healthChekPreprodProd =new HealthChekPreprodProd();
    public application =new Application();
}

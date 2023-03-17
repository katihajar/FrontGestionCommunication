import { EtatProcessusMetier } from "./etat-processus-metier";
import { HealthChekPreprodProdDetail } from "./health-chek-preprod-prod-detail";
import { User } from "./user";

export class HealthChekPreprodProd {
    public id: number = Number(0);
    public titre: string = String();
    public type: string = String();
    public dateAjout: Date = new Date();
    public etatProcessusMetierList = new Array<EtatProcessusMetier>();
    public healthChekPreprodProdDetailList = new Array<HealthChekPreprodProdDetail>();
    public createurHealthChekPreprodProd = new User();
}

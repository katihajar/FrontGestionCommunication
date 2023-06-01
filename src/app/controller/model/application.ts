import { ChangementPlanifier } from "./changement-planifier";
import { DestinataireCommunication } from "./destinataire-communication";
import { HealthChekPreprodProdDetail } from "./health-chek-preprod-prod-detail";
import { Incident } from "./incident";
import { Operation } from "./operation";
import { PiloteApplication } from "./pilote-application";
import { PointVersion } from "./point-version";
import { User } from "./user";

export class Application {
    public id: number = Number(0);
    public nomApplication: string = String();
    public responsable = new User();
    public lot: string = String();
    public charteIncident: string = String();
    public charteChangement: string = String();
    public disponibilite: string = String();
    public  piloteApplicationList = new Array<PiloteApplication>();
    public  incidentList = new Array<Incident>();
    public  operationList = new Array<Operation>();
    public  destinataireCommunicationList = new Array<DestinataireCommunication>();
    public  pointVersionList = new Array<PointVersion>();
    public  healthChekPreprodProdDetailList = new Array<HealthChekPreprodProdDetail>();
    public  changementPlanifierList = new Array<ChangementPlanifier>();
    

}

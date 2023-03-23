import { Application } from "./application";
import { LivraisonCARM } from "./livraison-carm";
import { PlanningPointVersion } from "./planning-point-version";
import { Ticket } from "./ticket";
import { User } from "./user";

export class PointVersion {
    public id: number = Number(0);
    public titre: string = String();
    public version: string = String();
    public lienComment: string = String();
    public goNoGoTNR: string = String();
    public goNoGoMEP: string = String();
    public remarque: string = String();
    public ticketConfirmer: string = String();
    public dateAjout: Date = new Date();
    public application=new Application();
    public createurPointVersion=new User();
    public livraisonCARMList=new Array<LivraisonCARM>();
    public planningPointVersionList=new Array<PlanningPointVersion>();
    public ticketList=new Array<Ticket>();
}

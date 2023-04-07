import { Application } from "./application";
import { User } from "./user";

export class Operation {
    public id: number = Number(0);
    public titre: string = String();
    public statut: string = String();
    public numero: string = String();
    public description: string = String();
    public dateDebut: Date = new Date();
    public dateFin: Date = new Date();
    public dateAjout: Date = new Date();
    public createurOperation =new User();
    public application =new Application();
}

import { Application } from "./application";
import { AvancementActionProbleme } from "./avancement-action-probleme";
import { User } from "./user";

export class Probleme {
    public id: number = Number(0);
    public topic: string = String();
    public statut: string = String();
    public dateAjout: Date = new Date();
    public description: string = String();
    public ananlyse: string = String();
    public application = new Application();
    public avancementActionProbleme = new Array<AvancementActionProbleme>();
    public createurProbleme = new User();

}

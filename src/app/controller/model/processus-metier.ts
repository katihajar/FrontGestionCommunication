import { EtatProcessusMetier} from "./etat-processus-metier";

export class ProcessusMetier {
    public id: number = Number(0);
    public titre: string = String();
    public etatProcessusMetierList = new Array<EtatProcessusMetier>();

}

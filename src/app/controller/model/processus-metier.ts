import { EtatProcessusMetierDetail } from "./etat-processus-metier-detail";

export class ProcessusMetier {
    public id: number = Number(0);
    public titre: string = String();
    public etatProcessusMetierDetailList = new Array<EtatProcessusMetierDetail>();

}

import { NbOccurence } from "./nb-occurence";
import { SuiviVolumetrie } from "./suivi-volumetrie";
import { User } from "./user";

export class NuitApplicative {
    public id: number = Number(0);
    public nombreOcurrence: number = Number(0);
    public titre: string = String();
    public statut: string = String();
    public typeChaînesRéférentiels: string = String();
    public descChaînesRéférentiels: string = String();
    public typeChaînesTransactions: string = String();
    public descChaînesTransactions: string = String();
    public typeChaînesPCOM: string = String();
    public descChaînesPCOM: string = String();
    public typeChaînesGRanalytics: string = String();
    public descChaînesGRanalytics: string = String();
    public typeChaînesFacturation: string = String();
    public descChaînesFacturation: string = String();
    public typeFocusEmail: string = String();
    public descFocusEmail: string = String();
    public date: Date = new Date();
    public nbOccurenceList = new Array<NbOccurence>();
    public suiviVolumetrieList = new Array<SuiviVolumetrie>();
    public createurNuitApplicative = new User();

}

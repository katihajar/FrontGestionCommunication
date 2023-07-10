import { NbOccurence } from "./nb-occurence";
import { SuiviVolumetrie } from "./suivi-volumetrie";
import { User } from "./user";

export class NuitApplicative {
    public id: number = Number(0);
    public titre: string = String();
    public statut: string = String();
    public typeChainesReferentiels: string = String();
    public descChainesReferentiels: string = String();
    public typeChainesTransactions: string = String();
    public descChainesTransactions: string = String();
    public typeChainesPCOM: string = String();
    public descChainesPCOM: string = String();
    public typeChainesGRanalytics: string = String();
    public descChainesGRanalytics: string = String();
    public typeChainesFacturation: string = String();
    public descChainesFacturation: string = String();
    public typeFocusEmail: string = String();
    public descFocusEmail: string = String();
    public date: Date = new Date();
    public nbOccurenceList = new Array<NbOccurence>();
    public suiviVolumetrieList = new Array<SuiviVolumetrie>();
    public createurNuitApplicative = new User();

}

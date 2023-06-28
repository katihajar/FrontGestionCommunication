import { NuitApplicative } from "./nuit-applicative";

export class SuiviVolumetrie {
    public id: number = Number(0);
    public typeAlerte: string = String();
    public nbMinimun: string = String();
    public nbActuel: number = Number();
    public statut: string = String();
    public nuitApplicative = new NuitApplicative();
}

import { NuitApplicative } from "./nuit-applicative";

export class NbOccurence {
    public id: number = Number(0);
    public nombreOcurrence: number = Number(0);
    public traitement: string = String();
    public statut: string = String();
    public date: Date = new Date();
    public nuitApplicative = new NuitApplicative();
}

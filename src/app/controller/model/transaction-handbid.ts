import { MonitoringMstoolbox } from "./monitoring-mstoolbox";

export class TransactionHandbid {
    public id: number = Number(0);
    public date:Date | null=null;
    public nombreRequet: number = Number(0);
    public nombreRequetNontraite: number = Number(0);
    public pourcentageDemandeReussie: number = Number(0);
    public pourcentageDemandeNontraite: number = Number(0);
    public mstoolbox =new MonitoringMstoolbox();
}

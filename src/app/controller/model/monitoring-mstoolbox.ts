import { Implants } from "./implants";
import { TransactionHandbid } from "./transaction-handbid";
import { TransactionSmile } from "./transaction-smile";
import { User } from "./user";

export class MonitoringMstoolbox {
    public id: number = Number(0);
    public titre: string = String();
    public dateAjout:Date | null=null;
    public dateImplants:Date | null=null;
    public createurMonitoring =new User();
    public implantsList = new Array<Implants>();
    public transactionHandbidList = new Array<TransactionHandbid>();
    public transactionSmileList = new Array<TransactionSmile>();

}

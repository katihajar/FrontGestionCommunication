import { FluxEAI } from "./flux-eai";
import { FluxSalesOrder } from "./flux-sales-order";
import { FluxSapEurope } from "./flux-sap-europe";
import { FluxSapHarmonie } from "./flux-sap-harmonie";
import { User } from "./user";

export class HealthCheckFlamingo {
    public id: number = Number(0);
    public remarque: string = String();
    public titre: string = String();
    public dateAjout: Date = new Date();
    public dateFlux: Date = new Date();
    public fluxEAIList = new Array<FluxEAI>();
    public fluxSalesOrderList = new Array<FluxSalesOrder>();
    public fluxSapEuropeList = new Array<FluxSapEurope>();
    public fluxSapHarmonies = new Array<FluxSapHarmonie>();
    public createurHealthCheckFlamingo = new User();
}

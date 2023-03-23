import { PointVersion } from "./point-version";

export class Ticket {
    public numero: string = String();
    public description: string = String();
    public type:string = String();
    public pointVersion= new PointVersion();
}

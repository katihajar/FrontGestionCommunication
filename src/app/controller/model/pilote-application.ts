import { Application } from "./application";
import { User } from "./user";

export class PiloteApplication {
    public id: number = Number(0);
    public  pilote = new User();
    public  application = new Application();
}

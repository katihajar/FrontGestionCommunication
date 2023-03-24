import {Role} from "./role";

export class User {
  public id: number = Number(0);
  public username: string = String();
  public password: string = String();
  public nom: string = String();
  public prenom: string = String();
  public lots: string = String();
  public accountNonExpired = true;
  public credentialsNonExpired = true;
  public accountNonLocked = true;
  public enabled = true;
  public  roles = new Array<Role>();
}

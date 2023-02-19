import {Role} from "./role";

export class User {
  public id: number = Number(0);
  public username: string = String();
  public password: string | undefined;
  public nom: string | undefined;
  public prenom: string | undefined;
  public accountNonExpired = true;
  public credentialsNonExpired = true;
  public accountNonLocked = true;
  public enabled = true;
  public authorities: [] | undefined;
  public  roles = new Array<Role>();
}

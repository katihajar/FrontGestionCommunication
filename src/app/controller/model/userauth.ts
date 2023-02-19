import {User} from './user';

export class Userauth {
  public accessToken:string | undefined;
  public refreshToken:string | undefined;
  public  user = new User();
}

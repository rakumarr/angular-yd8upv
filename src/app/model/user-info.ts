import { Entitlement } from '../model/entitlement';
import { SocialUser,  } from 'angularx-social-login';

export class UserInfo {
  private socialUser: SocialUser = null;
  private entitlement: Entitlement = null;

  
  constructor(){
    this.socialUser = null;
    this.entitlement = null;
  }

  public setSocialUser(socialUser: SocialUser):void{
    this.socialUser = socialUser;
  }

  public setEntitlement(entitlement: Entitlement):void{
    this.entitlement = entitlement;
  }

  public getSocialUser():SocialUser{
    return this.socialUser;
  }

  public getEntitlement():Entitlement{
    return this.entitlement;
  }

}
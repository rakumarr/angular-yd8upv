import { Injectable } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../model/user-info';
import { Entitlement } from '../model/entitlement';

@Injectable()
export class AuthenticateService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null);
  private entitlement: BehaviorSubject<Entitlement[]> = new BehaviorSubject<Entitlement[]>(null);
  private userEntitlement: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);

  constructor(private socialAuthService: AuthService, private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userInfo() {
    return this.user.asObservable();
  }

  get entitlements(){
    return this.entitlement.asObservable();
  }

  get userEntitlmentInfo(){
    return this.userEntitlement.asObservable();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.loggedIn.next(true);
      this.user.next(data); 
      this.getData(data);               
    });
  }

  signOut(): void {    
   this.socialAuthService.signOut().then((data) => {
     this.loggedIn.next(false);
     this.user.next(null); 
     this.entitlement.next(null); 
   });
  }

   apiUserUrl = 'https://rakumarr-project.herokuapp.com/api/user/';

  private getData(userData:SocialUser) {    
    this.http.post<any[]>(this.apiUserUrl, userData.idToken)
      .subscribe(data => { 
        console.log(data);  
        this.entitlement.next(data);  
        console.log(this.entitlement);
      });
  }

  public setUserEntitlementInfo(userInfo: UserInfo): void{    
    this.userEntitlement.next(userInfo);
  }

}
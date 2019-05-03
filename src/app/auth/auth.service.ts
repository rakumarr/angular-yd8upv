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
  private userData: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  private entitlement: BehaviorSubject<Entitlement[]> = new BehaviorSubject<Entitlement[]>(null);

  constructor(private socialAuthService: AuthService, private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userInfo() {
    return this.user.asObservable();
  }

  get userEntitlementData(){
    return this.userData.asObservable();
  }

  get userEntitlements(){
    return this.entitlement.asObservable();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.loggedIn.next(true);
      this.user.next(userData); 
      this.getData(userData);               
    });
  }

  signOut(){    
   this.socialAuthService.signOut().then((user) => {
     this.loggedIn.next(false);
     this.user.next(null); 
   });
  }

   apiUserUrl = 'https://rakumarr-project.herokuapp.com/api/user/';

  private getData(userData:SocialUser) {    
    this.http.post<any[]>(this.apiUserUrl, userData.idToken)
      .subscribe(data => {   
        this.entitlement.next(data);  
      });
  }

}
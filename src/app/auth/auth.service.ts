import { Injectable } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticateService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null);

  constructor(private socialAuthService: AuthService, private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userInfo() {
    return this.user.asObservable();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.loggedIn.next(true);
      this.user.next(userData);
      console.log(this.user);
      console.log(userData.idToken);          
    });
  }

  signOut(){    
   this.socialAuthService.signOut().then((user) => {
     this.loggedIn.next(false);
     this.user.next(null);
     console.log(user);     
   });
  }

}
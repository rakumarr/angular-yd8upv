import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Entitlement } from '../model/entitlement'
import { UserInfo } from '../model/user-info'
import { AuthenticateService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
       
  }
 
  public apartments: String[] =[];
  private entitlement: Entitlement[] = [];

  private userInfo: UserInfo = new UserInfo();
  public user: SocialUser;

  isLoggedIn$: Observable<boolean>;
  userInfo$: Observable<SocialUser>;
  entitlement$: Observable<Entitlement[]>;

  private userData: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);

  getUserInfo(){
    return this.userData.asObservable();
  }

  constructor(private authService: AuthenticateService, private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userInfo$ = this.authService.userInfo;
    this.entitlement$ = this.authService.entitlements;
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
    this.userInfo$.subscribe((value:SocialUser) => {
      
      if(value!=null){
        this.user = value;
        this.userInfo.setSocialUser(value);
      }
    });
    
    this.entitlement$.subscribe((data:Entitlement[]) => {
        if (data==null || data.length == 0){
          this.entitlement = [];
        } else {
          this.entitlement = data;
        }  
    });

  }

  signOut(){    
    this.authService.signOut();
  }

  public setUserInfo(entitlement:Entitlement){    
    this.userInfo.setEntitlement(entitlement);
    this.authService.setUserEntitlementInfo(this.userInfo);
    this.router.navigate(['/home']);
  }

}
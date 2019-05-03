import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Entitlement } from '../model/entitlement'
import { UserInfo } from '../model/user-info'
import { AuthenticateService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
    //   console.log("inside user data");
    //   this.user = userData;
    //   this.loggedIn = (this.user != null);
    //   console.log(this.user);
    //   this.signInText = "Sign out";
    // });
  }
 
  // public entitlement: Entitlement[];
  public apartments: String[] =[];
  private entitlement: Entitlement[] = [];

  private userInfo: UserInfo = new UserInfo();
  public user: SocialUser;
  // private loggedIn: boolean;
  isLoggedIn$: Observable<boolean>;
  userInfo$: Observable<SocialUser>;

  constructor(private authService: AuthenticateService, private http: HttpClient) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userInfo$ = this.authService.userInfo;
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
    this.userInfo$.subscribe((value:SocialUser) => {
      
      if(value!=null){
        this.user = value;
        this.userInfo.setSocialUser(value);
        this.getData();
      }
      });
    
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
    //   this.user = userData;
    //   this.loggedIn = (this.user != null); 
    //   console.log(this.user.idToken);
    //   this.getData();     
    // });
  }

  signOut(){    
    this.authService.signOut();
  //  this.socialAuthService.signOut().then((a) => {
  //    console.log(a);
  //    this.user = null;
  //    this.entitlement = null;
  //    this.apartments = [];
  //     this.loggedIn = (this.user != null);
  //  });
  }

  apiUrl = 'https://rakumarr-project.herokuapp.com/api/apartments/';

  apiUserUrl = 'https://rakumarr-project.herokuapp.com/api/user/';

  private getData() {    
    this.http.post<any[]>(this.apiUserUrl, this.user.idToken)
      .subscribe(data => {
        if (data.length > 0){
          this.entitlement = data;
        }        
        console.log(this.entitlement);
        data.forEach( (item:Entitlement) => {        
          this.apartments.push(item.apartmentName);        
        })    
      });
  }

  public callType(entitlement:Entitlement){
    this.userInfo.setEntitlement(entitlement);
    console.log(this.userInfo);
  }

}
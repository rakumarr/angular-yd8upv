import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Entitlement } from '../model/entitlement'


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
 
  public entitlement: Entitlement[];
  public apartments: String[] =[];

  public user: SocialUser;
  private loggedIn: boolean;

  constructor(private socialAuthService: AuthService, private http: HttpClient) {}

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.loggedIn = (this.user != null); 
      console.log(this.user.idToken);
      this.getData();     
    });
  }

  signOut(){    
   this.socialAuthService.signOut().then((a) => {
     console.log(a);
     this.user = null;
     this.entitlement = null;
     this.apartments = [];
      this.loggedIn = (this.user != null);
   });
  }

  apiUrl = 'https://rakumarr-project.herokuapp.com/api/apartments/';

  apiUserUrl = 'https://rakumarr-project.herokuapp.com/api/user/';

  private getData() {    
    this.http.post<any[]>(this.apiUserUrl, this.user.idToken)
      .subscribe(data => {
        if (data.length > 0){
          this.entitlement = data;
        }        
        data.forEach( (item:Entitlement) => {        
          this.apartments.push(item.apartmentName);        
        })    
      });
  }

  public callType(entitlement:Entitlement){
    console.log(entitlement);
  }

}
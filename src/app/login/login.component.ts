import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';


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
 
  public apartment: String[];

  public user: SocialUser;
  private loggedIn: boolean;

  constructor(private socialAuthService: AuthService, private http: HttpClient) {}

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.loggedIn = (this.user != null); 
      this.getData();     
    });
  }

  signOut(){    
   this.socialAuthService.signOut().then((a) => {
     console.log(a);
     this.user = null;
     this.apartment = null;
      this.loggedIn = (this.user != null);
   });
  }

  apiUrl = 'https://rakumarr-project.herokuapp.com/api/apartments/';

  private getData() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        console.log(data);
      });
  }

}
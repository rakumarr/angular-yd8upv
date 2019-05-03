import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { UserInfo } from './model/user-info';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Welcome to Bubeau!!';

  userInfo$: Observable<UserInfo>;

  public showNavBar: Boolean = null;

  

  constructor(private loginComponent:LoginComponent){
    this.userInfo$ = this.loginComponent.getUserInfo();

    this.userInfo$.subscribe((userInfo:UserInfo) =>{
      this.showNavBar = userInfo != null;
    });
  };
  
}

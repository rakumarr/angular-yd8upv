import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { UserInfo } from './model/user-info';
import { AuthenticateService } from './auth/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Welcome to Bubeau!!';

  userInfo$: Observable<UserInfo>;


  constructor(private authService: AuthenticateService){
    this.UserInfo.subscribe((data:UserInfo) => {
      console.log(data);
    })
  };
  
}

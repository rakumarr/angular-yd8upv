import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Welcome to Bubeau!!';

  public showNavBar: Boolean;

  constructor(private loginComponent:LoginComponent){
  };
  
}

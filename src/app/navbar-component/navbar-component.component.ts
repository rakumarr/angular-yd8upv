import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './../auth/auth.service';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  navbar: String[] = null;

  constructor(private authService: AuthenticateService) { 
    this.authService.userEntitlmentInfo().subscribe((userInfo:UserInfo) => {      
      this.navbar = userInfo.getEntitlement()['authorization']['allowedActions'];
      console.log(this.navbar);
    })
  }

  ngOnInit() {
  }

  public logout(){
    console.log("test");
    this.authService.signOut();
  }

}
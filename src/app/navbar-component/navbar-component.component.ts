import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './../auth/auth.service';
import { UserInfo } from '../model/user-info';
import { NavItem } from './nav-item';

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

  home: NavItem = {
    displayName: 'Home'
  }

  residents: NavItem = {
    displayName: 'Residents'
  }

  report: NavItem = {
    displayName: 'Report'
  }
 
  tenant: NavItem = {
    displayName: 'Tenant'
  }

  owners: NavItem = {
    displayName: 'Owners'
  }

  myprofile: NavItem = {
    displayName: 'My Profile'
  }


}
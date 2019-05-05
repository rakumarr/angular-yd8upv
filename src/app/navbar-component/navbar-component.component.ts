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

  navbar: NavItem[] = [];

  constructor(private authService: AuthenticateService) { 
    this.authService.userEntitlmentInfo().subscribe((userInfo:UserInfo) => {   
      let navItems = userInfo.getEntitlement()['authorization']['allowedActions'];
      this.navbar = [];
      if(navItems.length > 0){
       for (var navItem in this.navBarItems){
        console.log(this.navBarItems[navItem]['name']);
        if(navItems.includes(this.navBarItems[navItem]['name'])){
          this.navbar.push(this.navBarItems[navItem]);
        }        
      }
    } 
    })
  }

  ngOnInit() {
  }
  public logout(){
    console.log("test");
    this.authService.signOut();
  }

  navBarItems: NavItem[] = [
  {
    displayName: 'Home',
    name: 'home',
    route: 'home'
  },
  {
    displayName: 'Residents',
    name: 'residents',
    route: 'residents'
  },
  {
    displayName: 'Report',
    name: 'report',
    route: 'report'
  },
  {
    displayName: 'Tenant',
    name: 'tenant',
    route: 'tenant',
    // children: [
    //   {
    //     displayName: 'Detail',
    //     name: 'detail-tenant',
    //     route: 'tenant/detail'
    //   },
    //   {
    //     displayName: 'Add',
    //     name: 'add-tenant',
    //     route: 'tenant/add'
    //   },
    //   {
    //     displayName: 'Edit',
    //     name: 'edit-tenant',
    //     route: 'tenant/edit'
    //   },
    //   {
    //     displayName: 'Delete',
    //     name: 'delete-tenant',
    //     route: 'tenant/delete'
    //   }
    // ]
  },
  {
    displayName: 'Owners',
    name: 'owners',
    route: 'owners'
  },
  {
    displayName: 'My Profile',
    name: 'myprofile',
    route: 'myprofile'
  },
  {
    displayName: 'Maintainance',
    name: 'maintainance',
    route: 'maintainance',
    children: [
      {
        displayName: 'Add Expense',
        name: 'add-maintainance',
        route: 'maintainance/add'
      },
      {
        displayName: 'View Expense',
        name: 'view-maintainance',
        route: 'maintainance/e'
      }
    ]
  }
  ]

}
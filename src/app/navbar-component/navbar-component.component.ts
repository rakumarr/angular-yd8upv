import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  constructor(private authService: AuthenticateService) { }

  ngOnInit() {
  }

  public logout(){
    this.authService.signOut;
  }

}
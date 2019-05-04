import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './../auth/auth.service';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-residents-component',
  templateUrl: './residents-component.component.html',
  styleUrls: ['./residents-component.component.css']
})
export class ResidentsComponentComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private authService: AuthenticateService) {
    this.authService.userEntitlmentInfo().subscribe((userInfo:UserInfo) =>{
      this.userInfo = userInfo;
    })
   }

  ngOnInit() {
  }

}
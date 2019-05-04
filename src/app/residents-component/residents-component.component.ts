import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './../auth/auth.service';
import { UserInfo } from '../model/user-info';
import { Residents } from '../model/residents';
import { ApartmentService } from './../service/apartment.service';

@Component({
  selector: 'app-residents-component',
  templateUrl: './residents-component.component.html',
  styleUrls: ['./residents-component.component.css']
})
export class ResidentsComponentComponent implements OnInit {

  // userInfo: UserInfo;

  constructor(private authService: AuthenticateService, private aptService: ApartmentService) {
    // this.authService.userEntitlmentInfo().subscribe((userInfo:UserInfo) =>{
    //   this.userInfo = userInfo;
    // })
    this.aptService.getResidentsObservable().subscribe((residents:Residents[]) =>{
      this.residents = residents;
    });
  }

  residents: Residents[] = [
    {flat: 'F1',
  name: 'rajesh',  
  owner: 'Yes'}
  ]





  ngOnInit() {
  }

}
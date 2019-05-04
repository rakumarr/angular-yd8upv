import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from './../auth/auth.service';
import { UserInfo } from '../model/user-info';
import { Residents } from '../model/residents';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable()
export class ApartmentService {

  private residents: BehaviorSubject<Residents[]> = new BehaviorSubject<Residents[]>(null);

  userInfo: UserInfo = null;

  constructor(private authService: AuthenticateService, private http: HttpClient) {
    this.authService.userEntitlmentInfo().subscribe((userInfo:UserInfo) =>{
      this.userInfo = userInfo;
    })
  }

  get residentsObservable() {
    //call the http call
    this.getResidents();
    return this.residents.asObservable();
  }

  apiUserUrl = 'https://rakumarr-project.herokuapp.com/api/residents/';

  public getResidents() {    
    this.http.get<any[]>(this.apiUserUrl +'/'+this.userInfo.getEntitlement().apartmentId)
      .subscribe(data => { 
        console.log(data);         
        this.residents.next(data);  
      });
  }

}
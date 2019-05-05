import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from './../auth/auth.service';
import { UserInfo } from '../model/user-info';
import { Residents } from '../model/residents';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Owner } from '../model/owner';


@Injectable()
export class ApartmentService {

  private residents: BehaviorSubject<Residents[]> = new BehaviorSubject<Residents[]>(null);
  private owners: BehaviorSubject<Owner[]> = new BehaviorSubject<Owner[]>(null);

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

  residentUrl = 'https://rakumarr-project.herokuapp.com/api/residents/';

  public getResidents() { 
    let  headerDict  = {
  'X-AuthToken': this.userInfo.getSocialUser.idToken
    } ;
    let requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

    this.http.get<any[]>(this.residentUrl +this.userInfo.getEntitlement().apartmentId, requestOptions)
      .subscribe(data => { 
        this.residents.next(data);  
      });
  }

  get ownerObservable() {
    //call the http call
    this.getOwners();
    return this.owners.asObservable();
  }

  ownersUrl = 'https://rakumarr-project.herokuapp.com/api/owners/';

  public getOwners() { 
    let  headerDict  = {
  'X-AuthToken': this.userInfo.getSocialUser.idToken
    } ;
    let requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};   
    this.http.get<any[]>(this.ownersUrl +this.userInfo.getEntitlement().apartmentId, requestOptions)
      .subscribe(data => { 
        this.owners.next(data);  
      });
  }

}
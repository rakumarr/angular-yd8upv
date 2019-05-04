import { Component, OnInit } from '@angular/core';
import { Owner } from '../model/owner';
import { ApartmentService } from './../service/apartment.service';


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(private aptService: ApartmentService) {
    this.aptService.ownerObservable.subscribe((owners:Owner[]) =>{
      this.owners = owners;
    });
  }

  owners: Owner[] = [
    {flat: 'F1',
  name: 'rajesh',  
  owner: 'Yes'}
  ]

  ngOnInit() {
  }

}
import { Component, OnInit } from '@angular/core';
import { Residents } from '../model/residents';
import { ApartmentService } from './../service/apartment.service';

@Component({
  selector: 'app-residents-component',
  templateUrl: './residents-component.component.html',
  styleUrls: ['./residents-component.component.css']
})
export class ResidentsComponentComponent implements OnInit {

  constructor(private aptService: ApartmentService) {
    this.aptService.residentsObservable.subscribe((residents:Residents[]) =>{
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
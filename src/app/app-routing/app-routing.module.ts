import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ResidentsComponentComponent }   from './../residents-component/residents-component.component';
import { ReportComponentComponent }   from './../report-component/report-component.component';
import { OwnerComponent }   from './../owner/owner.component';
import { HomeComponent }   from './../home/home.component';
import { LoginComponent }   from './../login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'residents', component: ResidentsComponentComponent },
  { path: 'report', component: ReportComponentComponent },
  { path: 'owners', component: OwnerComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
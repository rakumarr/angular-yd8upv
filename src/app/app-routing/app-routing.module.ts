import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { ResidentsComponentComponent }   from './../residents-component/residents-component.component';
import { ReportComponentComponent }   from './../report-component/report-component.component';
import { OwnerComponent }   from './../owner/owner.component';
import { HomeComponent }   from './../home/home.component';
import { LoginComponent }   from './../login/login.component';
import { MaintainanceComponent }   from './../maintainance/maintainance.component';
import { TenantComponent }   from './../teanant/tenant.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'residents', component: ResidentsComponentComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponentComponent, canActivate: [AuthGuard] },
  { path: 'owners', component: OwnerComponent, canActivate: [AuthGuard] },
  { path: 'maintainance', component: MaintainanceComponent, canActivate: [AuthGuard] },
  { path: 'tenant', component: MaintainanceComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
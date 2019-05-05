import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule }     from './app-routing/app-routing.module';


import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { ResidentsComponentComponent } from './residents-component/residents-component.component';
import { ReportComponentComponent } from './report-component/report-component.component';
import { OwnerComponent } from './owner/owner.component';
import { HomeComponent } from './home/home.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticateService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ApartmentService } from './service/apartment.service';
import { MaintainanceComponent } from './maintainance/maintainance.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { TenantComponent } from './tenant/tenant.component';


const config = new AuthServiceConfig ([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('1009671136892-gp9h74b13e92bg812ugfu33m5ghmos7a.apps.googleusercontent.com')
}])
// // Production Bubeau.com
// const config = new AuthServiceConfig ([{
//   id: GoogleLoginProvider.PROVIDER_ID,
//   provider: new GoogleLoginProvider('856961756221-boomi3g5j1hr1mpv8dbvdgksdogrcpt2.apps.googleusercontent.com')
// }])

export function provideConfig(){
  return config;
} 

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, SocialLoginModule.initialize(config), HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, NavbarComponentComponent, ResidentsComponentComponent, ReportComponentComponent, OwnerComponent, HomeComponent, LoginComponent, MaintainanceComponent, MenuItemComponent, TenantComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{
    provide: AuthServiceConfig, useFactory: provideConfig
  }, AuthenticateService, AuthGuard, ApartmentService]
})
export class AppModule { }

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NotasComponent } from './notas/notas.component';
import { CognitoService } from './cognito.service';
import { RestApiService } from './rest-api.service';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CarteiraComponent } from './carteira/carteira.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
// import { FileuploadComponent } from './fileupload/fileupload.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    NotasComponent,
    CarteiraComponent,
    RelatoriosComponent,
    // FileuploadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // RouterModule.forRoot([
    //   {path: 'sign-in', component: SignInComponent},
    //   {path: 'sign-up', component: SignUpComponent},
     
    //   {path: 'home', component: HomeComponent,canActivate: [AuthorizeGuard]},
    //   {path: '', redirectTo:'sign-in',  pathMatch: 'full' },
    //   {path: '**', component: SignInComponent}
    // ])
  ],
  providers: [
    CognitoService,
    RestApiService,
    // {
    // provide: LOCALE_ID,
    // useValue: 'pt-PT'
    // }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {

}
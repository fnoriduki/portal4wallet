import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './AuthorizeGuard';
import { HomeComponent } from './home/home.component';
import { NotasComponent } from './notas/notas.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthorizeGuard]
  },  
  {
    path: 'notas',
    component: NotasComponent,
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'carteira',
    component: CarteiraComponent,
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'relatorios',
    component: RelatoriosComponent,
    canActivate: [AuthorizeGuard]
  },
  
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CognitoService } from './cognito.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
             
              '../app-assets/css/core/menu/menu-types/vertical-compact-menu.css',
              '../app-assets/vendors/css/cryptocoins/cryptocoins.css',
              '../app-assets/css/pages/timeline.css',
              '../app-assets/css/pages/dashboard-ico.css',
              '../app-assets/css/style.css',
              '../app-assets/css/app.css',
               './app.component.scss',
              
  ],
})
export class AppComponent implements OnInit {
  routerSubscription: any;

  isAuthenticated: boolean;
  user: string | undefined;
  constructor(private router: Router,
              private cognitoService: CognitoService) {
                
    this.isAuthenticated = false;
    console.log('Usuario:');
    console.log(cognitoService.getUser().then((res) => {
      console.log('Here are the current user info! =>', res);
      this.user=  res['attributes'].name;
    })
    .catch((err) => {
      console.log('Current user info failed to fetch', err);
    }));
   

  }

  public ngOnInit(): void {

    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
     
    });

    
  }

  public signOut(): void {
    this.cognitoService.onSignOut()
    .then(() => {
      this.router.navigate(['/signIn']);
    });
  }

  

}



import { Component, OnInit } from '@angular/core';
import { IUser, CognitoService } from '../cognito.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean;
  user: IUser;
  constructor(private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }


  ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }

}

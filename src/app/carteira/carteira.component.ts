import {Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';

import { RestApiService } from '../rest-api.service';
import { Carteira } from '../Shared/Carteira';


@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {
  tickerList: Carteira[] | undefined;
  loading: boolean;
  user: IUser;
  public uploads: string ="";
  public title: string = 'This is the titleeee';
  constructor(private cognitoService: CognitoService,private restApiService: RestApiService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public async ngOnInit(): Promise<void> {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  
    this.getCarteira();
  }
  async onClickCalcular (){

    this.restApiService.putCarteira().subscribe(
      (response) => {
        console.log('response received0: ');
        // console.log('response received3: ',  this.tickerList);
      },
      (error) => {
        console.error('Request failed with error');
        // this.errorMessage = error;
        this.loading = false;
      },
      () => {
        console.error('Request completed'); //This is actually not needed 
        this.loading = false;
      });
  }
  async getCarteira(){
    // await this.restApiService.GetIssues().subscribe((data: {}) => {
    //   this.tickerList = data;
    //   console.log('Resultado RestApi: ',this.tickerList);
      
    // })
     this.restApiService.getCarteira().subscribe(
      (response) => {
        console.log('response received0: ',response.body);
        // console.log('response received0: ',JSON.parse(response.body));
      

        // console.log('response received: ', JSON.parse(response.body.substring(
        //   response.body.indexOf("["),
        //   response.body.lastIndexOf("]")+1
        // )));

        // console.log('response received2: ', JSON.stringify(JSON.parse(response.body)["tickers"]).replace(/["]/g, "").replace(/'/g, '"'));

        this.tickerList = (response.body);

        // console.log('response received3: ',  this.tickerList);
      },
      (error) => {
        console.error('Request failed with error');
        // this.errorMessage = error;
        this.loading = false;
      },
      () => {
        console.error('Request completed'); //This is actually not needed 
        this.loading = false;
      });
  }
  getClassOf(valor: number, icone : string) {
    // var valor = parseFloat(val);
    // console.log('valor:',valor);
    if (valor > 0) {
      return icone =='icon'? 'cc NVC-alt mr-2 font-large-2 green': 'card-content bg-green';
    } else if (valor < 0) {
      return icone =='icon'? 'cc NVC-alt mr-2 font-large-2 red': 'card-content bg-red';
    } else {
      return icone =='icon'? 'cc NVC-alt mr-2 font-large-2': 'card-content';
    }
  }
  
  

}

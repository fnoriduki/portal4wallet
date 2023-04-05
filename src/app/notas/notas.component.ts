import { Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';
import { S3ServiceService } from '../s3-service.service';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  allfileslist:any[]=[];

  loading: boolean;
  user: IUser;
  public uploads: string ="";
  public title: string = 'This is the titleeee';
  constructor(private cognitoService: CognitoService,private s3Service: S3ServiceService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public async ngOnInit(): Promise<void> {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  
    // this.uploads = `<h1 class="red">${this.title}</h1`;
    // this.allfileslist =await this.s3Service.listFileWithPreSignedURL();
    this.onList();
  }

  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  async onFileSelect(e: any) {
    // with presigned url
     await this.s3Service.uploadFileWithPreSignedURL(e.target.files[0]);
   
     this.onList();
    // without presigned url
    // this.s3Service.uploadFile(e.target.files[0]);
  }
  async onList(){
    var resultado =await this.s3Service.listFileWithPreSignedURL();
    
    resultado.forEach((element,index)=>{
      if(String(element['Key']).slice(-1)=='/'){
        resultado.splice(index,1);
        // delete resultado[index];
      }      
      console.log('For', String(element['Key']).slice(-1));
   });

    this.allfileslist  = resultado;
   //reload
    // this.loading = true;

   
   
    // this.uploads = '<div>'+notas+'</div>';
  }
  async onClickDownload(key: string){
    var url = this.s3Service.getFileWithPreSignedURL(key) ;
    url.then((data) => {
      console.log('dsdsds',data);
      window.open(data as string);
    });

  }

  
  async onClickExcluir(key: string){

    var url = this.s3Service.postExcluir(key) ;
    await url.then((data) => {
      console.log('dsdsds',data);    

       window.location.reload();
    });

  }
  getName(settingname : string){
    return settingname.split('/').pop();
    }
  getExtension(settingname : string){
    return settingname.split('.').pop()?.toLocaleLowerCase();
    }

}

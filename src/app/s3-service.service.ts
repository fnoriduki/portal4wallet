import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as AWS from 'aws-sdk';
import { PartialClassMetadataLinkerVersion1 } from 'node_modules_outros/@angular/compiler-cli/linker/src/file_linker/partial_linkers/partial_class_metadata_linker_1';
import { environment } from '../environments/environment';
// import * as AWS from 'aws-skdk';
import {CognitoService } from './cognito.service';


@Injectable({
  providedIn: 'root',
})

export class S3ServiceService {
  //  private bucket: S3Client;
  allfileslist:any[]=[];
  listObjects=false;
  listLoading:boolean=false;

  constructor(private http: HttpClient,private cognitoService: CognitoService) {


    // const AWSService = AWS;
    // this.bucket = new S3Client(
    //   {

    //     credentials: {
    //       accessKeyId: this.cognitoService.getAccessKeyId(),
    //       secretAccessKey: this.cognitoService.getSecretAccessKey(),
    //     },
    //     region: environment.AWS_REGION
        
    //   }
 
    // );
    // console.log("Access ID:"+this.cognitoService.getAccessKeyId());
    // console.log("Access SecretID:"+this.cognitoService.getSecretAccessKey());
    // console.log("Access SecretID:"+this.cognitoService.getToken());
   }



  async uploadFile(file: File) {

   

    const contentType = file.type;
  
    const params = {
      Bucket: 'yourbucketname',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    // try {
    //   const response = await this.bucket.send(new PutObjectCommand(params));
    //   console.log("SUCCESS", response);
    // } catch(error) {
    //   console.log("FAILURE", error);
    // }
   
  }
  
  async postExcluir(objeto: string) {
     ///////
     AWS.config.credentials = await new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:e33572b1-7ec3-4ad7-a737-f9c07dc9e734',      
      Logins: {
        // 'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
         'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': this.cognitoService.getToken()
      }
    },{
      region: 'us-east-1'
    
   });
    // AWS.config.update({ accessKeyId: AWS.config.credentials!.accessKeyId, secretAccessKey: AWS.config.credentials!.secretAccessKey });
  //  AWS.config.update({region: 'us-east-1'});
  console.log("chegou1");
   
    var bucket = new AWS.S3({apiVersion: '2006-03-01'});



  
        var params = { 
          Bucket: '4wallet-users', 
            Key: objeto
          };
        console.log("chegou2:", objeto);

const url =
await bucket.deleteObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
  /*
  data = {
  }
  */
}).promise();
console.log("chegou3",url);

return url;
  }
  async getFileWithPreSignedURL(objeto: string) {
  
    this.allfileslist=[];
      ///////
      AWS.config.credentials = await new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:e33572b1-7ec3-4ad7-a737-f9c07dc9e734',      
        Logins: {
          // 'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
           'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': this.cognitoService.getToken()
        }
      },{
        region: 'us-east-1'
      
     });
      // AWS.config.update({ accessKeyId: AWS.config.credentials!.accessKeyId, secretAccessKey: AWS.config.credentials!.secretAccessKey });
    //  AWS.config.update({region: 'us-east-1'});
    console.log("chegou1");
     
      var bucket = new AWS.S3({apiVersion: '2006-03-01'});
  


    
          var params = { 
            Bucket: '4wallet-users', 
              Key: objeto
            };
            console.log("chegou2:", objeto);

// await bucket.getObject(params, (err, data) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Body);
    
//   }

// }).promise();

const url =
 await bucket
    .getSignedUrlPromise('getObject', params   
      )
    .catch((err) => {
      console.log(err);
    });
console.log("chegou3",url);

return url;
  }
  async listFileWithPreSignedURL() {
    this.allfileslist=[];
      ///////
      AWS.config.credentials = await new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:e33572b1-7ec3-4ad7-a737-f9c07dc9e734',      
        Logins: {
          // 'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
           'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': this.cognitoService.getToken()
        }
      },{
        region: 'us-east-1'
      
     });
      // AWS.config.update({ accessKeyId: AWS.config.credentials!.accessKeyId, secretAccessKey: AWS.config.credentials!.secretAccessKey });
    //  AWS.config.update({region: 'us-east-1'});
    console.log("chegou1");
     
      var bucket = new AWS.S3();
  
//       const myBucket = '4wallet-users'; //BUCKET_NAME
// const myKey = 'users/'+this.cognitoService.getSub()+'/'; // FILE_NAME
// const signedUrlExpireSeconds = 60*5; //EXPIRATION
// console.log("Passou");
// const presignedURL = bucket.getSignedUrl('getObject', {
//     Bucket: myBucket,
//     Key: myKey,
//     Expires: signedUrlExpireSeconds
// })
// console.log(JSON.stringify(presignedURL));


    
          var params = { 
            Bucket: '4wallet-users', 
              Prefix: 'users/'+this.cognitoService.getSub()+'/', 
            //  Delimiter: '/'
            };
            console.log("chegou2");
//   bucket.listObjectsV2(params,  (err, data) =>{
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data['Contents']);
    
//   }
//   this.allfileslist = data['Contents']!;
// }).promise();

// (async () => {
//   const data = await bucket.listObjectsV2(params).promise();
//   this.allfileslist = data['Contents']!;
//   console.log("data:",data);

// })();

// const abc =  await bucket.listObjectsV2(params, (err, data) => {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data);
//       this.allfileslist = data['Contents']!;
//     }
//     return this.allfileslist;
//   });

const response = await bucket.listObjectsV2(params).promise();
console.log("chegou3:",response.Contents!);
  return response.Contents!;





// const allData = [];

// allData.push( bucket.listObjectsV2(params).promise());
// return allData;
//   bucket.listObjectsV2(params,(err,data)=>{
//   this.listObjects=true;
//   this.allfileslist=data.Contents!;
//   this.listLoading=false;
//   console.log(data.Contents);
// }).promise();
// return this.allfileslist;
    // var out=[];
    // for(obj of objs.Contents!){
    //     out.push(obj.Prefix);
    // }

          // return response;

      try {

      } catch(err) {
        console.log(err);
      }
}
  
  
    
  
  
  
  
  
  async uploadFileWithPreSignedURL(file: File) {


     ///////
     AWS.config.credentials = await new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:e33572b1-7ec3-4ad7-a737-f9c07dc9e734',      
      Logins: {
        // 'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
         'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': this.cognitoService.getToken()
      }
      // optionally provide configuration to apply to the underlying service clients
      // if configuration is not provided, then configuration will be pulled from AWS.config
   
      // region should match the region your identity pool is located in
    },{
      region: 'us-east-1'
    
   });
  
  //  await AWS.config.getCredentials((err) => {
  //   if (err) {
  //       console.log(err);
  //   } else {
  //       console.log('S3CLass ID:'+ AWS.config.credentials!.accessKeyId)
  //       console.log('S3CLass SID:'+AWS.config.credentials!.secretAccessKey)
  //       console.log('S3CLass SToken:'+AWS.config.credentials!.sessionToken)


  //   }
  // });
  
    //////



    // const contentType = file.type;
  
    // const parametros = {
    //   Bucket: '4wallet-users',
    //   Key: 'users/'+this.cognitoService.getSub()+file.name,
    //   ACL: 'public-read',
    //   Body: file,
    //   ContentType: contentType
    // };
    
    // const command = new PutObjectCommand(parametros)
    AWS.config.region = 'us-east-1';
    // AWS.config.update({ accessKeyId: AWS.config.credentials!.accessKeyId, secretAccessKey: AWS.config.credentials!.secretAccessKey });

    var bucket = new AWS.S3({ params: {  maxRetries: 10 }, httpOptions: { timeout: 360000 } });

    
  
        var params = { 
          Bucket: '4wallet-users', 
          Key: 'users/'+this.cognitoService.getSub()+'/'+file.name, 
          ContentType: file.type, 
          Body: file };
        var options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: 'private'
        };
        var uploader = await bucket.upload(params, options, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
        }).promise();
        // uploader.on('httpUploadProgress', function (event) {
        //   console.log(event);
        // });

    try {
      // AWS.config.update({
      //   region: 'us-east-1', 
      //   accessKeyId: AWS.config.credentials!.accessKeyId, 
      //   secretAccessKey: AWS.config.credentials!.secretAccessKey });

      // var bucket = new AWS.S3({ params: params, httpOptions: { timeout: 360000 } });
  
      // const s3Client = new S3Client({
      //   region: 'us-east-1',
      //   credentials,
      // })
 
      // await s3Client.send(command);
      
      
      // console.log("passou aqui");

// // const s3 = new AWS.S3({apiVersion: '2006-03-01',
// // params: {
// //   Bucket: '4wallet-users',
// //   Key: 'users/'+this.cognitoService.getSub()+file.name,
// //   ACL: 'public-read',
// //   Body: file,
// //   ContentType: contentType
// // }});
// // // s3.listObjects( function(err, data) {
// // //   console.log(err, data)
// // // });
// // s3.putObject( (err,data)=>{
// // if(err){
// //   console.log('Erro: '+err);
// // }else{
// //   console.log(data);
// // }
// // });

    //   const preSignedURL = await getSignedUrl(this.bucket, command, { expiresIn: 3600});

    //   console.log(preSignedURL);

   
  
    //   const  headers = new  HttpHeaders().set("authorization", "Bearer "+this.cognitoService.getSessionToken());

    // const requestOptions = { headers: headers };
    //   this.http.put(preSignedURL, file,{headers}).subscribe({
    //     next: (res) => {
    //       console.log("SUCCESS", res);
    //     },
    //     error: (err) => {
    //       console.log("FAILED", err);
    //     },
    //     complete: () => {
    //       console.log("DONE")
    //     }
    //   })
    } catch(err) {
      console.log(err);
    }
  }


  




  

  //   try {
  //    const data =  await bucket.send(params)
  //   } catch(err) {
  //     console.log(err);
  //   }
  // bucket.config
    // bucket.upload(params, (err: any, data: any) => {
    //   if (err) {
    //     console.log('EROOR: ', JSON.stringify(err));
    //     return false;
    //   }
    //   console.log('File Uploaded.', data);
    //   return true;
    // });
}

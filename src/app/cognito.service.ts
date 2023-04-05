import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import  {Amplify, Auth } from 'aws-amplify';

import * as AWS from 'aws-sdk'
import { environment } from '../environments/environment';
import jwt_decode from 'jwt-decode';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private decodedToken: any| null;

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public async login(user_parameter: IUser)
  {
    
    
    
    //   .then(user => {
    //     Auth.currentCredentials().then(credentials => {
    //       var identityId = credentials.identityId;
    //       // const AccessToken =  user.signInUserSession.accessToken.jwtToken
    //  console.log('identityId:'+ identityId);
     
    //   })
    //   return user;
    // }
    //   );
    
    // try
    // {
      const user = await Auth.signIn(user_parameter.email, user_parameter.password);
      console.log('Login Succes');
      // const currentUserCredentials = await Auth.currentCredentials(); 
      // console.log('identityId:'+currentUserCredentials.identityId);
      
    let decoded = jwt_decode(user.signInUserSession.accessToken.jwtToken);
    // console.log('IdToken:',user.signInUserSession.idToken.jwtToken);
 

    this.decodedToken=decoded;
    // console.log('AccessToken:',user.signInUserSession.accessToken.jwtToken);
    
    // console.log('Expiration: '+this.decodedToken.exp);

    localStorage.setItem('token',user.signInUserSession.idToken.jwtToken);

    //console.log(user.signInUserSession.idToken.jwtToken);


    
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({      
      IdentityPoolId: 'us-east-1:e33572b1-7ec3-4ad7-a737-f9c07dc9e734',      
      Logins: {
        // 'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
         'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
      }
      // optionally provide configuration to apply to the underlying service clients
      // if configuration is not provided, then configuration will be pulled from AWS.config
   
      // region should match the region your identity pool is located in
    },{
      region: environment.AWS_REGION
    
   });
   console.log('Credenciais:');
   const credenciais = AWS.config.credentials;
  //  console.log(credenciais );
   AWS.config.getCredentials((err) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(AWS.config.credentials!.accessKeyId)
        // console.log(AWS.config.credentials!.secretAccessKey)
        // console.log(AWS.config.credentials!.sessionToken)

        localStorage.setItem('accessKeyId',AWS.config.credentials!.accessKeyId);
    localStorage.setItem('secretAccessKey',AWS.config.credentials!.secretAccessKey);
    // localStorage.setItem('sessionToken',user.signInUserSession.idToken.jwtToken);
    // localStorage.setItem('sessionToken',AWS.config.credentials!.sessionToken as string);
    
     localStorage.setItem('sub',(AWS.config.credentials as AWS.CognitoIdentityCredentials).identityId);
    
    }
});


// const cognitoIdentity = new AWS.CognitoIdentity();

// cognitoIdentity.getId({
//     IdentityPoolId: 'us-east-1:e33572b1-7ec3-4ad7-a737-f9c07dc9e734',
//     Logins: {
//       'cognito-idp.us-east-1.amazonaws.com/us-east-1_pG2pWfJY3': user.signInUserSession.idToken.jwtToken
//     }
    
   
// },{
//   region: 'us-east-1'
// ) .promise()
// .then(data => {
//   if (data.IdentityId) {
//     console.log('IdentityID:'+ data.IdentityId);
//   }
//   throw new Error('Invalid authorization token.');
// });
// console.log("linha166");

return user;
// }
// catch(error)
// {

//     console.log(error);
//     return error;
// }


// const credenciais = await Auth.currentUserCredentials();
// console.log("identityId"+ credenciais.identityId);
    // localStorage.setItem('accessKeyId',user.credentials.accessKeyId);
    // localStorage.setItem('secretAccessKey',user.credentials.secretAccessKey);
    // localStorage.setItem('sessionToken',user.credentials.sessionToken);

    // Auth.currentSession()
    // .then(data => console.log(data));

  //   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: 'IDENTITY_POOL_ID',
  //     IdentityId: 'IDENTITY_ID_RETURNED_FROM_YOUR_PROVIDER',
  //     Logins: {
  //        'cognito-identity.amazonaws.com': 'TOKEN_RETURNED_FROM_YOUR_PROVIDER'
  //     }
  //  });

    // console.log('accessKeyId:'+user.credentials.accessKeyId);
  //   console.log('secretAccessKey:'+user.credentials.secretAccessKey);
  //   console.log('sessionToken:'+user.credentials.sessionToken);
   
  }
  public getToken(): string {
    return localStorage.getItem('token') as string;
  }
  public getAccessKeyId(): string {
    return localStorage.getItem('accessKeyId') as string;
  }
  public getSecretAccessKey(): string {
    return localStorage.getItem('secretAccessKey') as string;
  }
    
  public getSub(): string {
    return localStorage.getItem('sub') as string;
  }
  public decodePayloadJWT(): any {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }

  getExpiryTime() {
     this.decodedToken= this.decodePayloadJWT() as string;
     
     return this.decodedToken ? this.decodedToken.exp : 0;
   
  }


  isTokenExpired(): boolean {


    // const user = await Auth.currentAuthenticatedUser();
    
    
    // return Auth.currentAuthenticatedUser()==null;

    const expiryTime: number = this.getExpiryTime();
    // console.log('expiryTime :' +expiryTime);
    if (expiryTime) {
        var d = new Date(expiryTime*1000); // The 0 there is the key, which sets the date to the epoch      
    
      return (d.getTime() - (new Date()).getTime()) < 5000;
    } else {
      return true;
    }
  }

  public async onSignOut()
  {
    localStorage.clear();
  
    
    this.decodedToken=null;
    await Auth.signOut();
  }


}

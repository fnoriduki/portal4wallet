import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Carteira } from './Shared/Carteira';
import {CognitoService } from './cognito.service';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient,private cognitoService: CognitoService) { }
  httpOptions = {
    headers: new HttpHeaders({      
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Connection': 'keep-alive',
      // "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      // "Access-Control-Allow-Headers": '*',
      // "Access-Control-Allow-Headers": "x-requested-with, content-type",
      'Authorization': this.cognitoService.getToken()
      //'eyJraWQiOiJsTGNnYytYcmgwRlpFc1pTR2ZQcVJXOXhnR0Vab0dFOTBRN1llXC9MTHR3az0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NjBhNTVlZS00ZmQ1LTQwMjQtYjdlOS0yZGYzZmRkYzUyNWIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfcEcycFdmSlkzIiwiY29nbml0bzp1c2VybmFtZSI6Ijk2MGE1NWVlLTRmZDUtNDAyNC1iN2U5LTJkZjNmZGRjNTI1YiIsIm9yaWdpbl9qdGkiOiJkMDYwMTEyMi05NjRlLTQ3ZjgtOTBlNS05MjRiY2JjMDUwZmIiLCJhdWQiOiI2dGczdHRwc2Q0cGZnY2RnYWVkb3RoNG9tMCIsImV2ZW50X2lkIjoiMGRlNzg5ZTQtZjQ0NC00NjNiLWE2NjctYjhiOWYyNzA0MmRkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NzU2NDg2MTgsIm5hbWUiOiJGZXJuYW5kbyIsImV4cCI6MTY3NTY1MjIxOCwiaWF0IjoxNjc1NjQ4NjE4LCJqdGkiOiI4OTBlYWQ4MS04MWJlLTQ0OWEtODEyYS1hZTcyNjYwZDE5ZGMiLCJlbWFpbCI6ImZub3JpZHVraUBnbWFpbC5jb20ifQ.ktJtjbdph8GQr87QUeHLkKUW6N7z5wmDz2I535_LjIUvw0HV8Js7QWWXXtQLkUsruXMos3LVgHNEOBcYMlK7MWtuNps6JgebL3B7_6ayh0PJz2qE9k9bPPFE3H7I2EmBRbvrPs24d0WKx9wfqltMMjn7nut-bMATDHuxVpMvHdnJVxe8m6jAx_pjk14GdBpZzUNblCpD6Nkh5zxRx28ZcneT8mCrd9UcggWFgado0I_mjwkGfUZ4yWMSpztvvPppaV-6qsjXG8iz2y_LLKEb0ES85_W7xPjY4H_20DyYgBjcy-E-fmPD2uts6jrLofsHZG9jDDEjZXt6btFdjgIjpA'
    })
  };


  getCarteira(): Observable<any> {
    
    // console.log('URL:',  environment.API_CARTEIRA);
    // return this.http
    //   .get<Carteira>(environment.API_CARTEIRA, this.httpOptions)
    //   .pipe(retry(1), catchError(this.errorHandl));

      return this.http
      .get(environment.API_CARTEIRA, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  putCarteira(){
    // console.log("dasdada");
    var body ="{}";
    return this.http
    .put(environment.API_CARTEIRA, body,this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
  }

   // Error handling
   errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
     console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}

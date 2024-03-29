import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators';
// import  {}
import {throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http: HttpClient) { }
  private host = 'https://disease.sh/v3/covid-19';
  private host_news ='http://api.mediastack.com/v1/news';
  private apikey = 'd02529a49522dab574d6946972bcd168';

  getAll(){
    return this.http.get(`${this.host}/all`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCountry(){
    return this.http.get(`${this.host}/countries`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getnews(keywords,country){
    return this.http.get(`${this.host_news}?access_key=${this.apikey}&keywords=${keywords}&countries=${country}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }




  handleError(error){
    let errorMessage;
    if (error.error instanceof ErrorEvent){
       // get client-side error
       errorMessage = error.error.message;
    }else{
      errorMessage = `Error`;
    }
    window.alert('Please check your Internet');
    return throwError(errorMessage);
  }
}

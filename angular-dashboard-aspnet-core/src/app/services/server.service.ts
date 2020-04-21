import { Injectable } from '@angular/core';
import { Server } from '../core/models/server';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServerMessage } from '../core/models/server-message';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _http: HttpClient) { }

   public headers: HttpHeaders =  new HttpHeaders()
   .set("Content-Type", "application/json");    
 
   public getServers() {
     return this._http.get<Server[]>('http://localhost:5000/api/server')
     .pipe(map(res => res), catchError(this.handleError));
   }
 
   public handleServerMessage(msg: ServerMessage): Observable<any> {
     const url = 'http://localhost:5000/api/server/' + msg.id;
     return this._http.put(url, msg)
      .pipe(map(res => res));
   }

   private handleError(error: any) {
    const errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}

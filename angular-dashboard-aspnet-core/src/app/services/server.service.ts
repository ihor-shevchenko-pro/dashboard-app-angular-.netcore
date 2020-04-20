import { Injectable } from '@angular/core';
import { Server } from '../core/models/server';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServerMessage } from '../core/models/server-message';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _http: HttpClient) {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Accept' : 'q=0.8;application/json;q=0.9'
    });

    this.options = new RequestOptions({ headers: this.headers });
   }

   public options: RequestOptions;
   public headers: Headers;
 
   public getServers() {
     return this._http.get<Server[]>('http://localhost:5000/api/server')
     .pipe(map(res => res), catchError(this.handleError));
   }
 
   public handleServerMessage(msg: ServerMessage): Observable<Response> {
     const url = 'http://localhost:5000/api/server/' + msg.id;
     return this._http.put(url, msg, this.options)
      .pipe(map(res => res));
   }

   private handleError(error: any) {
    const errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}

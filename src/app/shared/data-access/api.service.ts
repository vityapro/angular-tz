import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http: HttpClient = inject(HttpClient);

  get<T>(endpoint: string = '', params?: any, reqOpts?: { [key: string]: any }): Observable<T> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    // Support easy query params for GET requests
    if (params) {
      reqOpts["params"] = new HttpParams();

      Object.keys(params).forEach(key => {
        // @ts-ignore
        reqOpts.params = reqOpts.params.set(key, params[key]);
      });
    }
    return this.http.get<T>(environment.api.url + '/' + endpoint, reqOpts);
  }

  post<T>(endpoint: string, body: any = {}, reqOpts?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(environment.api.url + '/' + endpoint, body, reqOpts);
  }

  put<T>(endpoint: string, body: any, reqOpts?: any): Observable<T> {
    // @ts-ignore
    return this.http.put<T>(environment.api.url + '/' + endpoint, body, reqOpts);
  }

  delete<T>(endpoint: string, reqOpts?: any): Observable<T> {
    // @ts-ignore
    return this.http.delete<T>(environment.api.url + '/' + endpoint, reqOpts);
  }

  patch<T>(endpoint: string, body: any, reqOpts?: any): Observable<T> {
    // @ts-ignore
    return this.http.patch<T>(environment.api.url + '/' + endpoint, body, reqOpts);
  }
}

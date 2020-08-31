import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  public get(): Observable<object> {
    return this.httpClient.get(this.SERVER_URL + '/powers');
  }
}

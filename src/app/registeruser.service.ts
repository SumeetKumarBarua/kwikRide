import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  headers: Headers;


  constructor(private http: HttpClient) {
      this.headers = new Headers({ 'Content-Type': 'application/json', 
                                   'Accept': 'application/json' });
     
  }

  createService(url: string, param: any): Promise<any> {
  let body = (param);
  console.log(body)
  return this.http
      .post<User>(url, body)
      .toPromise()
      .then(res=>this.data)
      .catch(this.handleError);
  }  

  private data(res: Response) {
      let body = res.json();
      return body || {};
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}

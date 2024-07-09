import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl:string = environment.apiUrl + '/auth';
  
  constructor(private http : HttpClient ) {  }
  
  checkLogin(email : string , password:string  ) :  Observable<any> {
    return this.http.post(this.baseUrl+'/login',{
      "email" : email,
      "password":password
    },{ 
      withCredentials: true 
    })
  }
  
}

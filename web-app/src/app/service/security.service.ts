import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private readonly baseUrl = `${environment.apiUrl}/auth`

  constructor(private http : HttpClient) { }

  registerApi(name:string , age :number ,email:string , password:string , sex:string):Observable<any>{
    return this.http.post(this.baseUrl+'/register',{
      name : name,
      age : age ,
      email : email ,
      password : password ,
      sex : sex
    })
  }

  verifyEmail(id:string , token : string):Observable<any>{
    
    return this.http.post(this.baseUrl+'/verify'+'/'+id+'/'+token,null)
  }

  checkLogin(email : string , password:string  ) :  Observable<any> {
    return this.http.post(this.baseUrl+'/login',{
      "email" : email,
      "password":password
    },{ 
      withCredentials: true 
    })
  }

  checkUser():Observable<any> {
    return this.http.get(this.baseUrl+'/user',{ 
      withCredentials: true 
    })
  }
  logout():Observable<any> {
    return this.http.post(this.baseUrl+'/logout',{ 
      withCredentials: true 
    })
  }
}

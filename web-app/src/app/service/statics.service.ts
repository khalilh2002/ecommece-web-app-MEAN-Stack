import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {
  apiUrl = environment.apiUrl+'/statics'

  constructor(private http : HttpClient) { }
  
  userByFemaleAndMale() : Observable<any>{
    return this.http.get(this.apiUrl+'/userByFemaleAndMale' , { withCredentials: true })
  }

  CategoriesByProductsCount(): Observable<any> {
    return this.http.get(this.apiUrl+'/categoriesByProductCount' , { withCredentials: true })
  }
}

import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../service/security.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor (private securityService : SecurityService , private cookieService : CookieService){}
  ngOnInit(): void {
    this.securityService.checkUser().subscribe({
      next :(res )=>{
        
        localStorage.setItem('user-info', JSON.stringify(res.user))
        this.cookieService.set('is-login', 'true')

      },
      error:(err)=>{
        this.cookieService.set('is-login', 'false')

      }
    })
  }
  
  
}

import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../service/security.service';
import { CookieService } from 'ngx-cookie-service';
import { Emitters } from '../emitters/emitters';


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
        this.cookieService.set('user-info', JSON.stringify(res.user))
        Emitters.authEmitter.emit(true);
      },
      error:(err)=>{
        console.warn(err);
      }
    })
  }
  
  
}

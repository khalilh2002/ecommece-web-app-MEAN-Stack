import { Component , OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RouterLink } from '@angular/router';
import { SecurityService } from '../service/security.service';
import { Emitters } from '../emitters/emitters';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent , RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authenticated  = false;
  user : any
  constructor(private securityService : SecurityService , private cookieService:CookieService ){}
  ngOnInit(): void {

    Emitters.authEmitter.subscribe({
      next:(auth:any)=>{
        this.authenticated = auth;
        if (auth) {
          this.user = this.cookieService.get('user-info')
        }
      },
      error:(err : any)=>{
        this.authenticated = false;
      }
    })
  }

}

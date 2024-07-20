import { Component , OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SecurityService } from '../service/security.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink , ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authenticated  = false;
  user : any;
  baseUrl = environment.baseUrl
  
  constructor(private securityService : SecurityService , private cookieService:CookieService ){}

  ngOnInit(): void {
    let isLogin = this.cookieService.get('is-login') === 'true'; // Strict comparison

    console.warn(isLogin); // Log the actual value
    
    if (!isLogin) { // Negate for better readability
      this.authenticated = false;
    
      this.securityService.checkUser().subscribe({
        next: (res) => {
          localStorage.setItem('user-info', JSON.stringify(res.user));
          this.cookieService.set('is-login', 'true');
          this.authenticated = true;
          console.warn(res); // Log the final state

        },
        error: (err) => {
          console.warn(err);
          this.cookieService.set('is-login', 'false');
          this.authenticated = false;
        },
      });
    } else {

      try {
        
        const userInfo = localStorage.getItem('user-info');
        this.user = userInfo ? JSON.parse(userInfo) : null;

      } catch (error) {
        console.error('Error parsing user-info from localStorage:', error);
        this.user = null;
      }
      this.authenticated = true; // Already logged in

    }
  
    console.warn(this.user);
    
  }
  // search bar 
  searchForm = new FormGroup({
    searchText : new FormControl('')
  }) 
  searchFunction(){
    console.log(this.searchForm.value.searchText);
    
  }

  logout(){
      this.securityService.logout().subscribe({
        next: () => {
          console.log('Logout successful');
          this.cookieService.deleteAll();
          console.log('Cookies after deletion:', this.cookieService.getAll());
          localStorage.clear();
          console.log('LocalStorage after clearing:', localStorage);
          this.authenticated = false;
        },
        error: (err) => {
          console.error('Logout failed', err);
        }
      });
    }
    
  

}
 
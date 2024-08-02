import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../service/security.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit{

  adminUser :any;
  constructor(private router : Router , private securityService:SecurityService , private cookieService:CookieService){}

  ngOnInit(): void {
    let isLogin = this.cookieService.get('is-login') === 'true'; // Strict comparison
    if (isLogin) {
      this.securityService.checkUser().subscribe({
        next:(res)=>{
          this.adminUser= res.user
          if (this.adminUser?.role!=='admin') {
            alert('you are not an admin')
            this.router.navigate(['/login'])
          }
        }
      });
    }
  }
  
  logout(){
    this.securityService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.cookieService.deleteAll();
        this.cookieService.delete('authToken')
        console.log('Cookies after deletion:', this.cookieService.getAll());
        localStorage.clear();
        console.log('LocalStorage after clearing:', localStorage);
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}

import { Component , OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from "./admin/admin-header/admin-header.component";
import {PrimeNGConfig} from 'primeng/api';
import { SecurityService } from './service/security.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AdminHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})

export class AppComponent implements OnInit {
  title = 'web-app';
  admin = false;

  constructor(private primengConfig: PrimeNGConfig , private securityService:SecurityService) {}

  ngOnInit(): void {
    this.securityService.checkUser().subscribe({
      next:(res)=>{
        if(res.user.role=='admin'){
          this.admin=true;
        }else{
          this.admin=false;
        }
      },
      error:(err)=>{
        this.admin=false;
      }

    })
    this.primengConfig.ripple = true;

  }

}

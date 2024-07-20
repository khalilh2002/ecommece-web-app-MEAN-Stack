import { Component , OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from "./admin/admin-header/admin-header.component";
import {PrimeNGConfig} from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AdminHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})

export class AppComponent implements OnInit {
  title = 'web-app';
  admin = true

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
  
    this.primengConfig.ripple = true;

  }

}

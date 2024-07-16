import { Component , OnInit } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RouterLink } from '@angular/router';
import { SecurityService } from '../service/security.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent , RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private securityService : SecurityService){}
  ngOnInit(): void {
    this.securityService.checkUser().subscribe({
      next:(response)=>{
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}

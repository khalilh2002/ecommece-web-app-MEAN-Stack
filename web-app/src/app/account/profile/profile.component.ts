import { Component , OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  user:any;
  baseUrl=environment.baseUrl
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user-info') || "");
    console.log(this.user);


  }
  
}

import { Component , OnInit} from '@angular/core';
import { UsersService } from '../../service/admin-service/users.service';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [TableModule ,RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit{
  users:any[]=[];
  constructor(private usersService : UsersService) {}
  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next:(res)=>{
        this.users = res        
      }
    })
  }


}

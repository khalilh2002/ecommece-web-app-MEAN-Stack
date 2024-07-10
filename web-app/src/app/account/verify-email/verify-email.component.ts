import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit{
  
  constructor(private activatedRoute : ActivatedRoute , private registerService : RegisterService , private router : Router ){}

  verifyLink(id:string , token:string):void{
    this.registerService.verifyEmail(id,token).subscribe({
      next:(res)=>{
        console.log(res);
        
        if (res.ok==true) {
          alert(res?.message)
          this.router.navigate(['/'])
        }
      },
      error:(err)=>{
        console.error('Error verification user', err);
        alert(err?.error?.message)      
      }
    })
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['userId'];
      const token = params['token'];
      this.verifyLink(id, token);
    });


  }

}

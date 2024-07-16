import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../../service/security.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private securityService : SecurityService , private router : Router){}


  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ])
  })

  async applyLoginForm() {
    const email = this.loginForm.value.email || "" ;
    const password = this.loginForm.value.password || "";
    if ( email=="" || password=="") {
      alert('error fill all the inputs')
      return
    }
    this.securityService.checkLogin(email,password).subscribe({
      next : (res)=>{
        if(res?.user?.verified===true){

          if (res?.user?.role=="admin") {
            alert('admin')
            this.router.navigate(['/admin'])
          }else if(res?.user?.role=="user"){
            alert('user')
            this.router.navigate(['/home'])
          }
        }else{
          alert('check email for verification')
        }
       
      },
      error: (err)=>{
        alert(err?.error?.message)
        console.error(err?.error?.message);
        
      }
    })

    


  }

  
}

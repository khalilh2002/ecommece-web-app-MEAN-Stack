import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private loginService : LoginService , private router : Router){}


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
    this.loginService.checkLogin(email,password).subscribe({
      next : (res)=>{
        if (res?.user?.role=="admin") {
          alert('admin')
          this.router.navigate(['/admin'])
        }else if(res?.user?.role=="user"){
          alert('user')
          this.router.navigate(['/home'])
        }
      },
      error: (err)=>{
        alert(err?.error?.message)
        console.error(err?.error?.message);
        
      }
    })

    


  }

  
}

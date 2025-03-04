import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecurityService } from '../../service/security.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private securityService : SecurityService) {}

  registerForm = new FormGroup({
    name : new FormControl(''),
    age : new FormControl(),
    email : new FormControl(''),
    sex : new FormControl('M'),
    password : new FormControl(''),
    passwordConfirm : new FormControl(''),
  })

  onSubmit():void{
    if (this.registerForm.invalid) {
      return; // Prevent submission if form is invalid
    }

    const name: string = this.registerForm.value.name || '';
    const age: number = this.registerForm.value.age || 0;
    const email: string = this.registerForm.value.email || '';
    const sex : string = this.registerForm.value.sex || 'M'
    const password: string = this.registerForm.value.password || '';
    const passwordConfirm: string | undefined | null = this.registerForm.value.passwordConfirm ;
    
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    
    this.securityService.registerApi(name, age, email, password , sex).subscribe({
      next: (response) => {
        alert('check your email for verification')
        console.log('User registered successfully', response);
      },
      error: (err) => {
        console.error('Error registering user', err);
        alert(err?.error?.message)
      }
    })
    


  }
}

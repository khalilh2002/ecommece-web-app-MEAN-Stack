import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name : new FormControl(''),
    age : new FormControl(Number),
    email : new FormControl(''),
    password : new FormControl(''),
    passwordConfirm : new FormControl(''),
  })

  onSubmit():void{
    
  }
}

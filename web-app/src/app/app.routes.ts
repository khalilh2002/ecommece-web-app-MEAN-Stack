import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { VerifyEmailComponent } from './account/verify-email/verify-email.component';

export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent,
        title:"home"
        
    },
    {
        path:"",
        component: HomeComponent,
        title:"home"
        
    },
    {
        path:"product",
        component: ProductComponent,
        title:"product"
        
    },
    {
        path:"login",
        component: LoginComponent,
        title:"login"
        
    },
    {
        path:"register",
        component: RegisterComponent,
        title:"register"
        
    },
    {
        path:"verify",
        component: VerifyEmailComponent,
        title:"verify"
        
    }

];

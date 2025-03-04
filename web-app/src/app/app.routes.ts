import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { VerifyEmailComponent } from './account/verify-email/verify-email.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { DetailsComponent } from './product/details/details.component';

export const routes: Routes = [
    {
        path:"home",
        redirectTo: "",
        
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
        path:"details/product/:id",
        component:DetailsComponent
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
        
    },
    {
        path:"profile",
        component: ProfileComponent,
        
        
    },
    {
        path:"admin",
        component: DashboardComponent,
        title:"admin"
        
    },
    {
        path:"admin/orders",
        component: DashboardComponent,
        title:"admin"
        
    },
    {
        path:"admin/users",
        component: AdminUsersComponent,
        title:"admin"
        
    },
    {
        path:"admin/products",
        component: AdminProductsComponent,
        title:"admin"
        
    },
    {
        path:"user/details/:id",
        component: HomeComponent,
        title:"admin"
        
    },

];

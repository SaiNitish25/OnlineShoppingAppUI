import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{
  path:'',
  component:HomeComponent,
  canActivate: [AuthGuard]
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'forgot',
  component:ForgotPasswordComponent
},
{
  path:'product/:id',
  component:ProductComponent,
  canActivate: [AuthGuard]
},

{
  path:'add',
  component:AddProductComponent,
  canActivate: [AuthGuard]
},
{
  path:'orders',
  component:OrdersComponent,
  canActivate: [AuthGuard]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

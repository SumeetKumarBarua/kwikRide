import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { BookRideComponent } from './book-ride/book-ride.component';
import { RegisterFormComponent } from './register-form/register-form.component';


const routes: Routes = [
{ path : '', component: LoginFormComponent},
{ path: 'register',component:RegisterFormComponent},{ path: 'bookride',component:BookRideComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

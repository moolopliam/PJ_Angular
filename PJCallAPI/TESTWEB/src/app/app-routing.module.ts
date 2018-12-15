import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import{HomeComponent} from './home/home.component';
import { enableProdMode } from '@angular/core';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login.component';

import { CreateComponent } from './home/create/create.component';
import { DetailComponent } from './home/detail/detail.component';




enableProdMode();
const routes: Routes =[
  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'home',component:HomeComponent},
  { path:'login',component:LoginComponent},
  { path:'login/register',component:RegisterComponent},
  { path:'Create',component:CreateComponent},
  { path:'home/edit/:id',component:CreateComponent},
  { path:'detail/:id',component:DetailComponent}



];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterViewComponent} from "./views/register-view/register-view.component";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {ConfigureViewComponent} from "./views/configure-view/configure-view.component";
import {ProfileViewComponent} from "./views/profile-view/profile-view.component";

const routes: Routes = [
  { path: 'register', component: RegisterViewComponent, data: { animation: 'register' } },
  { path: 'login', component: LoginViewComponent, data: { animation: 'login' }},
  { path: '', component: ConfigureViewComponent, data: { animation: 'configure' } },
  { path: 'profile', component: ProfileViewComponent, data: { animation: 'profile' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

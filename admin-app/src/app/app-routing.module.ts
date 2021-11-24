import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivateChild } from '@angular/router';
import { SignInComponent } from './session/sign-in/sign-in.component';
import { SignOutComponent } from './session/sign-out/sign-out.component';
const routes: Routes = [
  {
    path: 'admin/sign-out',
    component: SignOutComponent,
  },
  {
    path: 'admin/home',
  },
  {
    path: '',
    component: SignInComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

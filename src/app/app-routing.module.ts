import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BouncingLogoComponent} from "./bouncing-logo/bouncing-logo.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: BouncingLogoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BouncingLogoComponent } from './bouncing-logo/bouncing-logo.component';
import { BouncingLogo2Component } from './bouncing-logo2/bouncing-logo2.component';

@NgModule({
  declarations: [
    AppComponent,
    BouncingLogoComponent,
    BouncingLogo2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

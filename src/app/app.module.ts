import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BouncingLogoComponent } from './bouncing-logo/bouncing-logo.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JsonFormatterComponent } from './json-formatter/json-formatter.component';
import { HomeTabComponent } from './home-tab/home-tab.component';
import {FormsModule} from "@angular/forms";
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { CharacterCounterComponent } from './character-counter/character-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    BouncingLogoComponent,
    TopBarComponent,
    HomePageComponent,
    JsonFormatterComponent,
    HomeTabComponent,
    HamburgerMenuComponent,
    MenuItemsComponent,
    CharacterCounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

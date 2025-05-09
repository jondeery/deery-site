import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BouncingLogoComponent } from './bouncing-logo/bouncing-logo.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JsonFormatterComponent } from './tabs/json-formatter/json-formatter.component';
import { HomeTabComponent } from './tabs/home-tab/home-tab.component';
import { FormsModule } from "@angular/forms";
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { MenuItemsComponent } from './tabs/menu-items/menu-items.component';
import { CharacterCounterComponent } from './tabs/character-counter/character-counter.component';
import { CardChallengeComponent } from './tabs/card-challenge/card-challenge.component';
import { CardComponent } from './tabs/card-challenge/card/card.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { InfiniteRunComponent } from "./tabs/infinite-run/infinite-run.component";

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
    CharacterCounterComponent,
    CardChallengeComponent,
    CardComponent,
    InfiniteRunComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

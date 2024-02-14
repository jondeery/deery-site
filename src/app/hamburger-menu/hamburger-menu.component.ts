import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {
  @Output() tabChange = new EventEmitter<string>();

  showMenu = false;
  currentSelectedTab = 'home';

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
    this.currentSelectedTab = tab;
    this.showMenu = false;
  }
}

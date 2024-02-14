import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  @Output() tabChange = new EventEmitter<string>();

  currentSelectedTab = 'home';

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
    this.currentSelectedTab = tab;
  }
}

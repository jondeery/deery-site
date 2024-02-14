import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
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

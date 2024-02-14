import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() tabChange = new EventEmitter<string>();
  currentSelectedTab = 'home';

  constructor(private Router: Router) { }

  ngOnInit(): void {
  }

  changeTab(tab: string) {
    this.tabChange.emit(tab);
    this.currentSelectedTab = tab;
  }

  navigateToBouncingLogo() {
    this.Router.navigate(['/bouncing-logo'])

  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardVal = '';
  @Input() cardSuit = '';
  @Input() defaultCard = false;

  constructor() { }

  ngOnInit(): void {
  }



}

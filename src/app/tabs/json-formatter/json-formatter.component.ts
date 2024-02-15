import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent implements OnInit {

  inputtedJson = '';
  formattedJson = '';
  copied = false;

  constructor() { }

  ngOnInit(): void {
  }

  formatJson() {
    try {
      let pasrsedJson = JSON.parse(this.inputtedJson);
      this.formattedJson = JSON.stringify(pasrsedJson, null, 4)
    } catch (error) {
      this.formattedJson = 'Invalid JSON please try again.';
      return;
    }
  }

  copyJson() {
    navigator.clipboard.writeText(this.formattedJson);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3500);
  }

}

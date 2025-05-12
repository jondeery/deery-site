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
  pasrsedJson: any;

  constructor() { }

  ngOnInit(): void {
  }

  formatJson() {
    try {
      this.pasrsedJson = JSON.parse(this.inputtedJson);
      this.formattedJson = JSON.stringify(this.pasrsedJson, null, 4)
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

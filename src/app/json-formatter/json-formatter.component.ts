import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent implements OnInit {

  inputtedJson = '';
  formattedJson = '';

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
  }

  syntaxHighlight(json: string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

}

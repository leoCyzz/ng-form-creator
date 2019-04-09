import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'fc-index',
  templateUrl: './index.component.html'
})

export class IndexComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    console.log(this.translate.translations[this.translate.defaultLang]);
  }

}

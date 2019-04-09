import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fb-default',
  templateUrl: './default.component.html'
})
export class LayoutDefaultComponent implements OnInit {

  constructor(
    router: Router,
  ) { }

  ngOnInit() {
  }

}

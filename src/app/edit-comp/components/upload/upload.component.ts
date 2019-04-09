import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IUpload } from 'app/model/component';

@Component({
  selector: 'fb-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements IDynamicComponent, OnInit {
  config: IUpload;

  constructor() { }

  ngOnInit() {
  }

}

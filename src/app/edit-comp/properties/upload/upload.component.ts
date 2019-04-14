import { Component, OnInit } from '@angular/core';
import { IUpload } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-upload',
  templateUrl: './upload.component.html'
})
export class UploadPropertyComponent implements IDynamicProperty, OnInit {
  config: IUpload;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}

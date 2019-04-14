import { Component, OnInit } from '@angular/core';
import { PageConfig, IPage } from 'app/model/page';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { FormCreatorHttpService } from '@core/net/form-creator-http.service';
import { EditService } from 'app/edit-comp/service/edit.service';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  pageConfig: IPage = new PageConfig();
  translation: any = null;
  selectorCompParams: any;
  dataTables: IDataTable[] = [];
  localActions: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private fcHttp: FormCreatorHttpService,
    private editService: EditService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.config) {
        this.pageConfig = data.config;
      }
    });

    this.initData();
  }

  onComponentSelect(e: any) {
    this.selectorCompParams = e;
  }

  initData() {
    zip(
      this.fcHttp.getTableList(),
      this.fcHttp.getLocalActionList()
    ).subscribe(([tableData, actionData]: any) => {
      if (tableData.status === 'success') {
        this.dataTables = tableData.data;
        // this.editService.setDataTables(tableData.data);
      }

      if (actionData.status === 'success') {
        this.localActions = actionData.data;
        // this.editService.setLocalActions(actionData.data);
      }
    });
  }
}

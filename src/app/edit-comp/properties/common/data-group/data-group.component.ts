import { Component, OnInit, Input } from '@angular/core';
import { IPage } from 'app/model/page';
import { DataGroup, IDataTable, DataItem } from 'app/model/data';
import { EditService } from 'app/edit-comp/service/edit.service';

@Component({
  selector: 'fc-data-group',
  templateUrl: './data-group.component.html'
})
export class DataGroupComponent implements OnInit {
  @Input() config: IPage;
  @Input() dataTables: IDataTable[] = [];
  constructor(
    private editService: EditService
  ) { }

  ngOnInit() {
  }

  onAddDataGroup() {
    this.config.dataGroups.push(new DataGroup());
  }

  onDeleteDataGroup(e: Event, index: number) {
    e.stopPropagation();
    console.log(index);
  }

  onAddFKMap(e: Event, index: number) {
    this.config.dataGroups[index].fkMap.push(new DataItem());
  }

  onDeleteFKMap(index: number, fkIndex: number) {
    this.config.dataGroups[index].fkMap.splice(fkIndex, 1);
  }

  onAddUniqueFields(e: Event, index: number) {
    this.config.dataGroups[index].uniqueFields.push('');
  }

  onDeleteUniqueFields(index: number, uIndex: number) {
    this.config.dataGroups[index].uniqueFields.splice(uIndex, 1);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { IDataTable } from 'app/model/data';

@Pipe({
  name: 'dataTableFilter'
})
export class DataTableFilterPipe implements PipeTransform {

  transform(dataTables: IDataTable[], tableId: string = ''): any {
    const filterTableId = tableId ? tableId.toString() : '';
    const filterTable = dataTables.find(table => table.id === filterTableId);
    return filterTable ? filterTable.fields : [];
  }

}

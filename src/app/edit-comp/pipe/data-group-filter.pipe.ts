import { Pipe, PipeTransform } from '@angular/core';
import { IDataGroup } from 'app/model/data';

@Pipe({
  name: 'dataGroupFilter'
})
export class DataGroupFilterPipe implements PipeTransform {

  transform(dataGroups: IDataGroup[], name: string = ''): any {
    const filterDataGroup = dataGroups.find(dataGroup => dataGroup.name === name.toString());
    return filterDataGroup ? filterDataGroup.tableId : '';
  }

}

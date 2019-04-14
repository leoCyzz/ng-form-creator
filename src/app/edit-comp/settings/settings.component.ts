import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPage } from 'app/model/page';
import { IComponent } from 'app/model/component';
import { IEvent } from 'app/model/event';
import { ThirdTranslateService } from '@core/net/third-translate.service';
import { EditService } from '../service/edit.service';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnChanges {
  @Input()pageConfig: IPage;
  @Input()selectorParams: any;
  @Input()dataTables: IDataTable[] = [];
  @Input()localActions: string[] = [];

  title = '';
  hasDataItem = false;
  currentType = '';
  currentCompConfig: IComponent | IPage = null;
  currentTabShowIndex = 1;
  currentTranslateList = [];
  currentIsContainer = false;
  currentEvents: IEvent[] = [];
  currentCompName = '';
  isNameError = false;
  constructor(
    private thirdTranslate: ThirdTranslateService,
    private editService: EditService,
  ) { }

  ngOnInit() {
    this.initData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('selectorParams')) {
      // get current config
      const selectorId = changes.selectorParams.currentValue
                          ? changes.selectorParams.currentValue.selectorId
                          : this.pageConfig.id;
      this.getCurrentSelectConfig(this.pageConfig, selectorId, true);
      this.currentTabShowIndex = 1;
    }
  }

  initData() {
    this.currentTranslateList = this.thirdTranslate.getThirdTranslation();
    // this.dataTables = this.editService.getDataTables();
    // this.localActions = this.editService.getLocalActions();
  }

  getCurrentSelectConfig(config: IComponent | IPage, selectorId: string, isPage: boolean = true) {
    if (selectorId === config.id) {
      this.currentCompConfig = config;
      this.currentIsContainer = !isPage && (config as IComponent).type  === 'container';
      this.currentEvents = this.currentIsContainer ? [] : config.events;
      this.currentType = isPage ? 'page' : (config as IComponent).type;
      this.title = this.currentType.substring(0, 1).toUpperCase() + this.currentType.substring(1);
      this.hasDataItem = this.currentType !== 'container';
      this.currentCompName = this.currentCompConfig.name;
    } else {
      if (isPage || (config as IComponent).type === 'container') {
        config .children.forEach((childConfig) => {
          this.getCurrentSelectConfig(childConfig, selectorId, false);
        });
      }
    }
  }

  onChangeSettingTab(index: number = 1) {
    this.currentTabShowIndex = index;
  }

  onNameChange(name: any) {
    if (name) {
      if (this.editService.isRepeat(name)) {
        this.isNameError = true;
      } else {
        this.isNameError = false;
        this.editService.removeName(this.currentCompName);
        this.editService.addName(name);
      }
    }
  }
}

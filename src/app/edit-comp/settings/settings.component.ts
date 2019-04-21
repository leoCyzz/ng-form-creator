import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { IPage } from 'app/model/page';
import { IComponent } from 'app/model/component';
import { IEvent } from 'app/model/event';
import { ThirdTranslateService } from '@core/net/third-translate.service';
import { IDataTable } from 'app/model/data';
import { SketchService } from '../service/sketch.service';

@Component({
  selector: 'fc-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnChanges, AfterViewInit {
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
  compNames = [];
  constructor(
    private thirdTranslate: ThirdTranslateService,
    private sketchService: SketchService,
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

  ngAfterViewInit(): void {
    this.compNames = this.sketchService.getCompNames();
  }

  initData() {
    this.currentTranslateList = this.thirdTranslate.getThirdTranslation();
  }

  getCurrentSelectConfig(config: IComponent | IPage, selectorId: string, isPage: boolean = true) {
    if (selectorId === config.id) {
      this.currentCompConfig = config;
      this.currentIsContainer = !isPage && (config as IComponent).type  === 'container';
      this.currentEvents = this.currentIsContainer ? [] : config.events;
      this.currentType = isPage ? 'page' : (config as IComponent).type;
      this.title = this.currentType.substring(0, 1).toUpperCase() + this.currentType.substring(1);
      this.hasDataItem = this.currentType !== 'container' && this.currentType !== 'button';
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
    if (name && this.currentType !== 'page') {
      this.sketchService.compNames.set(this.currentCompConfig.id, name);
      this.compNames = this.sketchService.getCompNames();
      console.log(this.compNames);
    }
  }
}

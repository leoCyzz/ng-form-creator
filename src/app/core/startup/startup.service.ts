import { Injectable } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ICONS } from 'style-icons';
import { zip } from 'rxjs';
import { I18NService } from '@core/i18n/i18n.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StartupService {
    constructor(
        iconSrv: NzIconService,
        private translate: TranslateService,
        private i18n: I18NService,
        private httpClient: HttpClient,
    ) {
        iconSrv.addIcon(...ICONS);
    }

    private viaHttp(resolve: any, reject: any) {
        zip(
          this.httpClient.get(`assets/i18n/${this.i18n.defaultLang}.json`),
          this.httpClient.get('getTranslator')
        ).pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([langData, transData]) => {
              resolve(null);
              return [langData, transData];
          })
        ).subscribe(([langData, transData]) => {
          // setting language data
          this.translate.setTranslation(this.i18n.defaultLang, langData, true);
          this.translate.setTranslation(this.i18n.defaultLang, transData.translation, true);
          this.translate.setDefaultLang(this.i18n.defaultLang);
        },
        () => { },
        () => {
          resolve(null);
        });
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
          // http
          this.viaHttp(resolve, reject);
        });
      }
}

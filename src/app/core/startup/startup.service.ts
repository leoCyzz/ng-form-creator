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
      private httpClient: HttpClient
  ) {
      iconSrv.addIcon(...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get(`assets/i18n/${this.i18n.defaultLang}.json`),
      this.httpClient.get('getTranslations')
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([langData, translationData]) => {
          resolve(null);
          return [langData, translationData];
      })
    ).subscribe(([langData, translationData]: any) => {
      // setting language data
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);
      if (translationData.status === 'success') {
        const thirdLangData = this.parseTranslation(translationData.translations);
        this.translate.setTranslation(this.i18n.defaultLang, thirdLangData, true);
      }
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

  parseTranslation(translations: any[]) {
    const resObj = {};
    translations.forEach(item => {
      resObj[item.key] = item.value;
    });
    return resObj;
  }
}

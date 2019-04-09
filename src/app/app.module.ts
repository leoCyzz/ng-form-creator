import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { default as ngLang } from '@angular/common/locales/zh';

import { NZ_I18N, zh_CN as zorroLang, NZ_DATE_LOCALE, NZ_ICONS } from 'ng-zorro-antd';
import * as df_zh_cn from 'date-fns/locale/zh_cn';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { I18NService, FC_I18N_TOKEN } from '@core/i18n/i18n.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { StartupService } from '@core/startup/startup.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { ICONS } from 'style-icons';

const LANG = {
  abbr: '🇨🇳',
  ng: ngLang,
  zorro: zorroLang,
  dateFns: df_zh_cn,
};
// register angular
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.dateFns }
];
// #endregion
// #region i18n services

// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

const I18NSERVICE_MODULES = [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: I18nHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
];

const I18NSERVICE_PROVIDES = [
  { provide: FC_I18N_TOKEN, useClass: I18NService, multi: false }
];
// #region



// #region Http Interceptors

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true}
];
// #endregion

// #region Startup Service

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];
// #endregion

// #region ICON
const ICON_PROVIDES = [
  { provide: NZ_ICONS, useValue: ICONS }
];
// #endregion

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    ...I18NSERVICE_MODULES
  ],
  providers: [
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...I18NSERVICE_PROVIDES,
    ...APPINIT_PROVIDES,
    ...ICON_PROVIDES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

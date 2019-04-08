import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN, NZ_ICONS } from 'ng-zorro-antd';
import { SharedModule } from './shared';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { ICONS } from 'src/style-icons';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    RoutesModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: ICONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

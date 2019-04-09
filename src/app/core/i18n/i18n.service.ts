// 请参考：https://ng-alain.com/docs/i18n
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { registerLocaleData } from '@angular/common';
import ngZh from '@angular/common/locales/zh';
import ngEn from '@angular/common/locales/en';
import ngZhTw from '@angular/common/locales/zh-Hant';
import ngJa from '@angular/common/locales/ja';
import ngKo from '@angular/common/locales/ko';

import { en_US, zh_CN, zh_TW, NzI18nService, ko_KR, ja_JP } from 'ng-zorro-antd';
import * as df_en from 'date-fns/locale/en';
import * as df_zh_cn from 'date-fns/locale/zh_cn';
import * as df_zh_tw from 'date-fns/locale/zh_tw';
import * as df_ja from 'date-fns/locale/ja';
import * as df_ko from 'date-fns/locale/ko';

import { TranslateService } from '@ngx-translate/core';

interface LangData {
  text: string;
  ng: any;
  zorro: any;
  dateFns: any;
  abbr: string;
}

const DEFAULT = 'zh-CN';
const LANGS: { [key: string]: LangData } = {
  'zh-CN': {
    text: '简体中文',
    ng: ngZh,
    zorro: zh_CN,
    dateFns: df_zh_cn,
    abbr: '🇨🇳',
  },
  'zh-TW': {
    text: '繁体中文',
    ng: ngZhTw,
    zorro: zh_TW,
    dateFns: df_zh_tw,
    abbr: '🇭🇰',
  },
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: en_US,
    dateFns: df_en,
    abbr: '🇬🇧',
  },
  'ja-JP': {
    text: '日本語',
    ng: ngJa,
    zorro: ja_JP,
    dateFns: df_ja,
    abbr: 'ᴊᴘ',
  },
  'ko-KR': {
    text: '한국어',
    ng: ngKo,
    zorro: ko_KR,
    dateFns: df_ko,
    abbr: 'ᴋʀ',
  },
};

@Injectable({ providedIn: 'root' })
export class I18NService {
  // tslint:disable-next-line:variable-name
  private _default = DEFAULT;
  private change$ = new BehaviorSubject<string>(null);

  // tslint:disable-next-line:variable-name
  private _langs = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });

  constructor(
    private nzI18nService: NzI18nService,
    private translate: TranslateService,
  ) {
    const defaultLan = translate.getBrowserLang();
    // `@ngx-translate/core` 预先知道支持哪些语言
    const lans = this._langs.map(item => item.code);
    translate.addLangs(lans);

    this._default = lans.includes(defaultLan) ? defaultLan : lans[0];
    this.updateLangData(this._default);
  }

  private updateLangData(lang: string) {
    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.dateFns);
    (window as any).__locale__ = item.dateFns;
  }

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    lang = lang || this.translate.getDefaultLang();
    this.updateLangData(lang);
    this.translate.use(lang).subscribe(() => this.change$.next(lang));
  }
  /** 获取语言列表 */
  getLangs() {
    return this._langs;
  }
  /** 翻译 */
  fanyi(key: string, interpolateParams?: any) {
    return this.translate.instant(key, interpolateParams);
  }
  /** 默认语言 */
  get defaultLang() {
    return this._default;
  }
  /** 当前语言 */
  get currentLang() {
    return (
      this.translate.currentLang ||
      this.translate.getDefaultLang() ||
      this._default
    );
  }
}

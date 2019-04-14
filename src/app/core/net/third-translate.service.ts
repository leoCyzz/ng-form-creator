import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThirdTranslateService {
    private thirdTranslations: { key: string, value: string }[];

    setThirdTranslations(translations: { key: string, value: string }[]) {
        this.thirdTranslations = translations;
    }

    getThirdTranslation() {
        return this.thirdTranslations;
    }
}

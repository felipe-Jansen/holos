import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");


export interface AppConfig {
  availableLanguages: Array<any>;
  demoMode: boolean;
}

export const BaseAppConfig: AppConfig = {
  availableLanguages: [{
    code: 'en',
    name: 'English'
  }, {
    code: 'ar',
    name: 'Arabic'
  }, {
    code: 'sp',
    name: 'Spanish'
  }, {
    code: 'pt',
    name: 'Portuguese'
  }, {
    code: 'in',
    name: 'Indonesia'
  }, {
    code: 'fr',
    name: 'French'
  }],
  demoMode: true,
};
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { TemplateConfig } from '../template-config/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public templateConf: TemplateConfig;

  constructor() {
    this.setConfigValue();
  }

  setConfigValue() {
    this.templateConf = {
      layout: {
        variant: 'Light',
        dir: 'ltr',
        customizer: {
          hidden: true
        },
        sidebar: {
          collapsed: true,
          size: 'sidebar-lg',
          backgroundColor: 'black',
          backgroundImage: false,
          backgroundImageURL: 'assets/img/sidebar-bg/01.jpg'
        }
      }
    };
  }
}

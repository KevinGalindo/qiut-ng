import { Injectable } from '@angular/core';
import { DialogModalConfig } from './dialog-modal-config';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor() { }


  show(config:{ content:string, title?:string }): void {

    DialogModalConfig.data = config;
    DialogModalConfig.show();

  }

  info(config:{ content:string, title?:string }):void{
    const icon = {
      class: 'fa-circle-exclamation',
      color: 'color-info',
    }

    DialogModalConfig.icon = icon;
    DialogModalConfig.data = config;
    DialogModalConfig.show();
  }

  alert(config:{ content:string, title?:string }):void{
    const icon = {
      class: 'fa-triangle-exclamation',
      color: 'color-alert',
    }

    DialogModalConfig.confirm = true;
    DialogModalConfig.icon = icon;
    DialogModalConfig.data = config;
    DialogModalConfig.show();
  }

  error(config:{ content:string, title?:string }):void{
    const icon = {
      class: 'fa-skull-crossbones',
      color: 'color-danger',
    }

    DialogModalConfig.icon = icon;
    DialogModalConfig.data = config;
    DialogModalConfig.show();
  }
}

import { Injectable } from '@angular/core';
import { dialogModalConfig, ModalType } from './dialog-modal-config';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor() { }

  private _open(type:ModalType, config:IDataModela, resolve:(value:boolean|undefined) => void): void {
    dialogModalConfig.title = config.title || 'Mensaje del sistema';
    dialogModalConfig.content = config.content;
    dialogModalConfig.confirm = config.confirm || false;
    dialogModalConfig.type = type;
    dialogModalConfig.disableClose = config.disableClose || false;
    dialogModalConfig.resolve = resolve;
    dialogModalConfig.show();
  }

  show(config:IDataModela): Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      this._open('show',  config, resolve);
    });
  }

  info(config:IDataModela): Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      this._open('info',  config, resolve);
    });
  }

  alert(config:IDataModela): Promise<boolean|undefined> {
  
    return new Promise((resolve, reject) => {
      this._open('alert',  config, resolve);
    });
  }

  error(config:IDataModela): Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      this._open('error',  config, resolve);
    });
  }
}

interface IDataModela { 
  content:string,
  title?:string,
  confirm?:boolean,
  disableClose?:boolean
}

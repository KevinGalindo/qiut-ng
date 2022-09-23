import { Injectable } from '@angular/core';
import { DialogModalConfig } from './dialog-modal-events';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor() { }


  show(config:{ content:string, title?:string }): void {

    DialogModalConfig.data = config;
    DialogModalConfig.show();
    // alert('s');

  }
}

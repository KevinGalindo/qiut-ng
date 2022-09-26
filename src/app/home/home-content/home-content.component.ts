import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModalService } from 'src/app/components/dialog-modal/dialog-modal.service';
import { leadingComment } from '@angular/compiler';

@Component({
  selector: 'app-home-content',
  standalone: true,
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  imports: [CommonModule],
})
export class HomeContentComponent implements OnInit {

  constructor(
    private _modal: DialogModalService
  ) { }

  ngOnInit(): void {
  }

  activar(type: 'show'|'info'|'alert'|'error', confirm:boolean = false, disableClose:boolean = false){
    if (type == 'show') {
      this._modal.show({ content: 'Hola desde show', title: 'TITULO', confirm, disableClose }).then( result => {
        alert(result);
      });
    }
    if (type == 'info') {
      this._modal.info({ content: 'Hola desde info', title: 'TITULO', confirm, disableClose });
    }
    if (type == 'alert') {
      this._modal.alert({ content: 'Hola desde alert', title: 'TITULO', confirm, disableClose });
    }
    if (type == 'error') {
      this._modal.error({ content: 'Hola desde error', title: 'TITULO', confirm, disableClose });
    }
  }

}

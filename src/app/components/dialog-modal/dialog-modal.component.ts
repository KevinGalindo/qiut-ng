import { HttpBackend } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogModalConfig } from './dialog-modal-events';

@Component({
  selector: 'dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit, AfterViewInit {

  @ViewChild('buttonShow') elementRefButtonShow!:ElementRef<HTMLButtonElement>;

  get buttonShow():HTMLButtonElement {
    return this.elementRefButtonShow.nativeElement;
  }

  constructor() {

    
    DialogModalConfig.show = () => {
      
      this.buttonShow.click();

    }

  }

  get data(){
    return DialogModalConfig.data
  }



  ngAfterViewInit(): void {
    // let button = this.elementRefButtonShow.nativeElement;
  }

  ngOnInit(): void {
  }

  eventoComponete() {
    console.log("Evento en el componete");
  }

}

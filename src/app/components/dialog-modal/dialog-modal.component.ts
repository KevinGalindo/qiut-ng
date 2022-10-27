import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { dialogModalConfig } from './dialog-modal-config';

@Component({
  selector: 'dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit, AfterViewInit {

  modalShow:boolean = false;
  @ViewChild('buttonShow') elementRefButtonShow!:ElementRef<HTMLButtonElement>;
  @ViewChild('modal') elementRefModal!:ElementRef<HTMLElement>;

  get buttonShow():HTMLButtonElement {
    return this.elementRefButtonShow.nativeElement;
  }
  static:string = 'true'

  constructor(
    private render2:Renderer2
  ) {

    dialogModalConfig.show = () => {

      this.buttonShow.click();
    }

  }

  get typeToString():string{
    return dialogModalConfig.type.toString();
  }

  get content():string{
    return dialogModalConfig.content;
  }

  get title():string{
    return dialogModalConfig.title;
  }

  get icon():string{
    return dialogModalConfig.icon;
  }

  get isConfirm():boolean{
    return dialogModalConfig.confirm
  }


  onClickClose(val:boolean|undefined):void {
    dialogModalConfig.resolve(val);
  }


  ngAfterViewInit(): void {
    
    let modal = this.elementRefModal.nativeElement;

    let remove = modal.removeAttribute;

    modal.removeAttribute = (qualifiedName: string) => {
      if (qualifiedName == 'role'){
        dialogModalConfig.resolve(undefined);
      }
    }

  }

  ngOnInit(): void {
  }

  eventoComponete() {
    console.log("Evento en el componete");
  }

}

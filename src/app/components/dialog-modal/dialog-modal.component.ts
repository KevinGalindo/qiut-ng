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

      let modal = this.elementRefModal.nativeElement;

      // // // console.log(dialogModalConfig.disableClose);

      // if (dialogModalConfig.disableClose){
      //   // modal.setAttributeNode()
      //   console.log('CLOSE ');
        
      //   // modal.setAttribute('data-bs-backdrop', 'static');
      //   this.render2.setAttribute(modal, 'data-bs-backdrop', 'static');
      //   // this.static = 'static';
      // }else{
      //   this.render2.removeAttribute(modal,'data-bs-backdrop');
      //   console.log('open0');
      //   // this.static = 'true';
      //   // modal.removeAttribute('data-bs-backdrop');
      //   // modal.setAttribute('data-bs-backdrop', 'true');
      // }

      this.buttonShow.click();
    }

    console.log(dialogModalConfig.type.toString());

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
    // if (dialogModalConfig.disableClose){
    //   modal.setAttribute('data-bs-backdrop', 'static');
    // }else{
    //   modal.removeAttribute('data-bs-backdrop');
    // }

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

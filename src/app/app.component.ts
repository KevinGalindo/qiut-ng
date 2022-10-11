import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qiut-v2';

  constructor(){

    document.body.addEventListener("DOMNodeInserted", e => {

      let el = e.target;

      if ( el instanceof HTMLElement ){

        let inputs = el.querySelectorAll<HTMLInputElement>('input.number');

        inputs.forEach(inp => {

          inp.addEventListener('keypress', ev => {

            if (!ev.key.match('[0-9]')){
              ev.preventDefault();
            }

          });

        })

      }

      if ( el instanceof HTMLInputElement){

      }

    })

  }
}

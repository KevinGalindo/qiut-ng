// fa-bell  info: fa-circle-exclamation alert: fa-triangle-exclamation error: fa-skull-crossbones

class DialogModalConfig {
    public title:string = '';
    public content:string = '';
    public confirm:boolean = false;
    public type:ModalType = 'show';
    public disableClose:boolean = false;

    public resolve!:(value:boolean|undefined) => void

    get icon():string {
        switch (this.type) {
            case "info": return 'fa-solid fa-circle-exclamation';
            case "alert": return 'fa-solid fa-triangle-exclamation';
            case "error": return 'fa-solid fa-skull-crossbones';
            default: return 'fa-solid fa-bell';
        }
    }


    public show!:() => void;
}




export type ModalType = 'show' | 'info' | 'alert' | 'error';
export const dialogModalConfig = new DialogModalConfig();


// export const DialogModalConfig:Iconfig = {
//     type: "show",
//     confirm: false,
//     icon:{
//         class: 'fa-bell',
//         color: ''
//     },
//     data: {
//         content: '',
//     },
//     show: () => {}
// }

// interface Iconfig{
//     type:'show'|'info'|'alert'|'error';
//     confirm: boolean;
//     icon:{
//         class: string,
//         color: string
//     },
//     data:{
//         content:string,
//         title?:string,
//     },
//     show: () => void
// }
export const DialogModalConfig:Iconfig = {
    type: "show",
    confirm: false,
    icon:{
        class: 'fa-bell',
        color: ''
    },
    data: {
        content: '',
    },
    show: () => {}
}

interface Iconfig{
    type:'show'|'info'|'alert'|'error';
    confirm: boolean;
    icon:{
        class: string,
        color: string
    },
    data:{
        content:string,
        title?:string,
    },
    show: () => void
}
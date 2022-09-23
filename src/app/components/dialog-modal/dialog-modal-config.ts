export const DialogModalConfig:{
    data:{
        content:string,
        title?:string
    },
    show: () => void
} = {
    data: {
        content: '',
        title: 'Mensaje del sistem'
    },
    show: () => {}
}
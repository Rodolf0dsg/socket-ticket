//referencias html

lblNuevoTicket = document.querySelector('#lblNuevoTicket');
btnCrear = document.querySelector('button');

console.log('Nuevo Ticket HTML');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true;

});

btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
        console.log( ticket );
    });

});

socket.on('ultimo-ticket', ( ultimoTicket ) => {

    lblNuevoTicket.innerText = `Ticket: ${ultimoTicket}`;

});
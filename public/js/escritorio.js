//Referencias html

const lblEscritorio = document.querySelector('h1');
const lblPendientes       = document.querySelector('#lblPendientes'); 
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');


const searchParams = new URLSearchParams( window.location.search );
//parsea los queryparams, solo funciona en chrome y firefox

console.log( searchParams );

if ( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.opacity = '0';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;

});

btnAtender.addEventListener( 'click', () => {
    
    socket.emit( 'atender-ticket', {escritorio}, ( {ok, ticket, msg} ) => {
        
        if (!ok) {
            lblTicket.innerText = `Nadie.`;

            return divAlerta.style.opacity = '100';
        }

        lblTicket.innerText = `Ticket ${ ticket.numero }`;
    });

});

socket.on('ultimo-ticket', ( ultimoTicket ) => {

    // lblNuevoTicket.innerText = `Ticket: ${ultimoTicket}`;

});

socket.on('tickets-pendientes', ( tickets ) => {
    if ( tickets === 0) {
        lblPendientes.style.display = 'none';
    }
    
    lblPendientes.innerText = tickets;
})


console.log('Escritorio HTML');
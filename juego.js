// Define los personajes
var jugador = {
    vida: 100,
    ataque: null,
    defensa: null
};

var enemigo = {
    vida: 100,
    ataque: null,
    defensa: null
};

document.getElementById('pantalla-juego').style.display = 'none';
document.getElementById('boton-inicio').addEventListener('click', function() {
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('pantalla-juego').style.display = 'block';

    iniciarTurno();
});


// Función para iniciar un nuevo turno
function iniciarTurno() {
    jugador.ataque = null;
    jugador.defensa = null;
    enemigo.ataque = null;
    enemigo.defensa = null;

    // Escoge ataque y defensa del enemigo
    var ataques = ['tiro al arco', 'dribleo', 'celebracion'];
    enemigo.ataque = ataques[Math.floor(Math.random() * ataques.length)];
    enemigo.defensa = ataques[Math.floor(Math.random() * ataques.length)];

    document.getElementById('botones-ataque-jugador').style.display = 'block';
    document.getElementById('botones-defensa-jugador').style.display = 'none';
}

// Cuando el jugador selecciona un ataque
var botonesAtaque = document.getElementsByClassName('ataque');
for (var i = 0; i < botonesAtaque.length; i++) {
    botonesAtaque[i].addEventListener('click', function() {
        jugador.ataque = this.getAttribute('data-tipo');

        // Ocultar botones de ataque y mostrar los de defensa
        document.getElementById('botones-ataque-jugador').style.display = 'none';
        document.getElementById('botones-defensa-jugador').style.display = 'block';

        // Calcula el daño y muestra el mensaje del ataque
        var vidaPerdida = calculaVidaPerdida(jugador.ataque, enemigo.defensa);
        enemigo.vida -= vidaPerdida;
        document.getElementById('vida-enemigo').textContent = enemigo.vida;
        var mensaje = `Has atacado con ${jugador.ataque}, el enemigo se ha defendido con ${enemigo.defensa}. Le has quitado ${vidaPerdida} de vida.`;
        document.getElementById('mensajes').textContent = mensaje;

        // Verifica si el juego ha terminado
        if (enemigo.vida <= 0) {
            finalJuego('¡Has ganado!');
        }
    });
}

// Cuando el jugador selecciona una defensa
var botonesDefensa = document.getElementsByClassName('defensa');
for (var i = 0; i < botonesDefensa.length; i++) {
    botonesDefensa[i].addEventListener('click', function() {
        jugador.defensa = this.getAttribute('data-tipo');

        // Calcula el daño y muestra el mensaje del ataque
        var vidaPerdida = calculaVidaPerdida(enemigo.ataque, jugador.defensa);
        jugador.vida -= vidaPerdida;
        document.getElementById('vida-jugador').textContent = jugador.vida;
        var mensaje = `El enemigo ha atacado con ${enemigo.ataque}, te has defendido con ${jugador.defensa}. Te ha quitado ${vidaPerdida} de vida.`;
        document.getElementById('mensajes').textContent = mensaje;

        // Verifica si el juego ha terminado
        if (jugador.vida <= 0) {
            finalJuego('¡Has perdido!');
        } else {
            // Inicia un nuevo turno
            iniciarTurno();
        }
    });
}

function calculaVidaPerdida(ataque, defensa) {
    if (ataque === defensa) {
        return 10;  // Ataque y defensa iguales
    } else {
        switch (ataque) {
            case 'dribleo':
                if (defensa === 'tiro al arco') {
                    return 20;  // Ataque de dribleo, defensa de tiro al arco
                } else if (defensa === 'celebracion') {
                    return 0;   // Ataque de dribleo, defensa de celebracion
                }
                break;
            case 'tiro al arco':
                if (defensa === 'dribleo') {
                    return 0;   // Ataque de tiro al arco, defensa de dribleo
                } else if (defensa === 'celebracion') {
                    return 20;  // Ataque de tiro al arco, defensa de celebracion
                }
                break;
            case 'celebracion':
                if (defensa === 'dribleo') {
                    return 20;  // Ataque de celebracion, defensa de dribleo
                }
                break;
        }
    }
    return 0; // Por defecto, si no se cumple ninguna condición, no se resta vida
}


function finalJuego(mensaje) {
    // Muestra el mensaje de final del juego y reinicia la pantalla de inicio
    alert(mensaje);
    location.reload();
}

// Iniciar el juego
iniciarTurno();

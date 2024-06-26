let intentos = 6;
let diccionario = ['GUISO', 'PETER', 'ANANA', 'PERAS', 'MATES', 'MADRE', 'CHETOS', 'TURRO', 'MOUSE'];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

window.addEventListener('load', init);

function init() {
    console.log('Esto se ejecuta solo cuando se carga la pagina web');
    
    const guessinput = document.getElementById("guess-input");
    const button = document.getElementById("guess-button");
    
    guessinput.addEventListener("keypress", (event) => {
        if (event.key == "Enter") {
            button.click();
        }
    });

    button.addEventListener("click", intentar);
}

function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const mensaje = document.getElementById("mensaje");

    // Verificar si el intento tiene la cantidad correcta de letras
    if (INTENTO.length !== palabra.length) {
        mensaje.textContent = "Letras insuficientes";
        return;
    } else {
        mensaje.textContent = "";
    }

    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { 
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabra.includes(INTENTO[i])) { 
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {    
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE</h1>");
        return;
    }

    for (let i in palabra) {
        if (INTENTO[i] === palabra[i]) {
            console.log(INTENTO[i], "VERDE");
        } else if (palabra.includes(INTENTO[i])) {
            console.log(INTENTO[i], "AMARILLO");
        } else {
            console.log(INTENTO[i], "GRIS");
        }
    }

    intentos--;
    if (intentos == 0) {
        terminar("<h1>PERDISTE</h1>");
    }

    // Limpiar el campo de texto después de cada intento
    document.getElementById("guess-input").value = '';
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

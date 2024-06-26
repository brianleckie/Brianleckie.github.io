let intentos = 6;
let palabra = '';

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

    fetch('https://random-word.ryanrk.com/api/en/word/random/?length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log('Palabra aleatoria:', palabra);
        })
        .catch(error => console.error('Error al obtener la palabra:', error));
}

function intentar() {
    if (!palabra) {
        return;
    }

    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const mensaje = document.getElementById("mensaje");


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

    intentos--;
    if (intentos == 0) {
        terminar(`<h1>PERDISTE</h1><p>La palabra era: ${palabra}</p>`);
    }


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

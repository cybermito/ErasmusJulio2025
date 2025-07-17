/*
Instrucciones para la creación del juego "Adivina el Número"

1. Generar un número aleatorio

2. Guardar el número del intento en el que el jugador se encuentro empezando por el 1

3. Darle al jugador una forma de adivinar el número.

4. Una vez que se ha introducido el número, guardarlo en alguna parte para que el jugador pueda ver sus intentos.

5. Comprobar si el número es correcto.

6. Si el número es correcto:

    - Mostrar un mensaje de felicitación 
    - Hacer que el jugador no pueda introducir más números/intentos.
    - Mostrar un control que permita que el jugador vuelva a empezar el juego.

7. Si el número es incorrecto y al jugador le quedan intentos:

    - Decirle al jugador que ha fallado
    - Dejar que el jugador lo intente de nuevo
    - Incrementar el número de intentos en 1

8. Si el número es incorrecto y no quedan intentos:

    - Decirle al jugador que ha terminado (GAMEOVER)
    - Hacer que el jugador no pueda introducir más intentos
    - Mostrar un control que permita al jugador empezar de nuevo.

9. Una vez que el juego se reinicia, asegurase de que la lógica del juego y la interface de usuario (UI) se restablecen por completo para volver al paso 1.

*/

// Generamos el número aleatorio a adivinar
let randomNumber = Math.floor(Math.random() * 100 ) + 1;

// Guardamos las referencias de cada párrafo
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

// Guardamos las referencias al input y botón de enviar

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

// Variable para los intentos
let guessCount = 1;
// Variable para guardar y crear el botón de reset
let resetButton;
// Damos el foco al input
guessField.focus();

//Función para comprobar el número a adivinar
function checkGuess(){
    //Guardar el número ingresado en el input
    //Nos aseguramos que se un Number
    let userGuess = Number(guessField.value);

    //Comprobamos si estamos en el primer intento
    if (guessCount === 1){
        guesses.textContent = "Intentos anteriores ";
    }
    guesses.textContent += userGuess + " ";
    
    //Bloque de comprobación del número a adivinar
    //Pasos del 5 al 8
    // Condición cuando acertamos
    if (userGuess === randomNumber){
        lastResult.textContent = "¡Felicidades has acertado!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10){
        //Condición cuando no quedan intentos
        lastResult.textContent = "¡GAME OVER!";
        setGameOver();
    } else {
        // Condición cuando quedan intentos, entonces comprobamos si es mayor o menor el número introducido con respecto al número a adiuvinar
        lastResult.textContent = "¡Incorrecto!";
        lastResult.style.backgroundColor = "red";

        if (userGuess < randomNumber){
            lowOrHi.textContent = "¡El número es muy bajo!";
        } else if(userGuess > randomNumber){
            lowOrHi.textContent = "¡El número es muy alto!";
        }
    }

    // Preparamos las variables para el siguiente intento
    guessCount++;
    // Borramos el valor del campo númerico
    guessField.value = "";
    // Aplicamos nuevamente el foco
    guessField.focus();
}

//Agregamos un listener al botón guessSubmit
guessSubmit.addEventListener("click", checkGuess);

//función gameover
function setGameOver(){
    guessField.disabled = true; //Deshabilita el input
    guessSubmit.disabled = true; //Deshabilita el botón enviar

    //Creamos el botón reset para resetear el juego
    resetButton = document.createElement("button");
    resetButton.className = "resetButton";
    resetButton.textContent = "Reiniciar el juego";
    //Colocamos el botón dentro de contenedor padre, en este caso el body
    document.body.append(resetButton);
    
    //Creamos el listener del botón creado
    resetButton.addEventListener("click", resetGame);   

}

//Creamos la función resetGame que reseteará el juego para volver a empezar.
function resetGame(){
    guessCount = 1;

    //Reseteamos los párrafos de ayuda
    const resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0; i < resetParas.length; i++){
        resetParas[i].textContent = "";
        resetParas[i].style.backgroundColor = "black";
    }

    //Eliminamos el botón reset
    resetButton.parentNode.removeChild(resetButton);

    //Reactivamos el input y el submit
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    //Cambiamos el background de lastresult para que no se vea
    lastResult.style.backgroundColor = "black";

    //Generamos un nuevo número aleatorio
    randomNumber = Math.floor(Math.random() * 100) + 1;
}




// Funciones extras cuya funcion son detalles secundarios

//funcion calcular numeros aleatorios
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// funcion poner primera letra mayuscula
function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// limpiar el chart del canvas
function limpiarCanvas(chart){
    if (chart) {
        chart.destroy();        
    }
}
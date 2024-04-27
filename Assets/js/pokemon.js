// Codigo Principal de la pagina de buscar pokemon online .com

// variables globales
let canvasChart;      
let presentar = document.getElementById("infoPokemon");

// Codigo para Obtener un Pokemon ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getPokemon(){
    //como la api necesita que el nombre del pokemon este en minusculas convertimos a minusculas el valor introducido
    let pokemonBuscado = document.getElementById("floatingInput").value;
    if (typeof pokemonBuscado == "string") {
        pokemonBuscado = pokemonBuscado.toLowerCase()
    }

    //llamamos a la api con la url para obtener la informacion de un pokemon y el nombre o numero del pokemon como endpoint
    const url = new URL("https://pokeapi.co/api/v2/pokemon/" + pokemonBuscado);

    //si la llamada es exito seguimos adelante, si no avisamos que no funciono
    const response = await fetch(url.toString());
    if(response.ok) {
        const data =  await response.json();
        presentar.style.border = "solid 2px rgba(227, 52, 13)";

        // con la informacion del pokemon llamamos a una funcion que muestra sus datos generales
        console.log(data)
        mostrarPokemon(data);

        // con la informacion del pokemon llamamos a una funcion que muestra sus estadisticas
        mostrarPokemonStats(data);

        // con la informacion del pokemon llamamos a una funcion que muestra los movimientos que aprende
        mostrarPokemonMoves(data);
    }else{
        alert("Error 404");
    } 

}

// Buscamos la descripcion de un pokemon 

async function getPokemonDescription(p){
    //nos aseguramos de que el endpoint este en minusculas
    let pokemonBuscado = document.getElementById("floatingInput").value;
    if (typeof pokemonBuscado == "string") {
        pokemonBuscado = pokemonBuscado.toLowerCase()
    }

    // buscamos la data de la descripcion con un llamado a la api
    const url = new URL("https://pokeapi.co/api/v2/pokemon-species/"+ pokemonBuscado +"/");

    const response = await fetch(url.toString());
    if(response.ok) {
        const data =  await response.json();

        //con la data del movimiento llamamos a una funcion que trabaje esa informacion
        mostrarPokemonDescripcion(data, p);
    }else{
        alert("asi no es")
    } 

}

//  mostramos la descripcion de un pokemon

function mostrarPokemonDescripcion(data, p){

    //Recorremos el arreglo que tiene la descripcion del pokemon en distintos idiomas 
    //y solo las que estan en español las agregamos a nuestro propio arreglo

    let descripciones = [];
    for (let index = 0; index < data.flavor_text_entries.length; index++) {
        const description = data.flavor_text_entries[index];
        if(description.language.name == "es" && description.flavor_text != undefined){
            descripciones.push(description.flavor_text);
        }
    }  
    
    //Asignamos al elemento donde se va a mostrar la descripcion una descripcion
    //del arreglo de descripciones español de manera aleatoria

    let i = getRandomArbitrary(0,descripciones.length - 1);
    i = Math.round(i);
    p.innerText = descripciones[i];
}

//mostramos la informacion general de un pokemon

function mostrarPokemon(data){
    //Obtenemos y limpiamos el elemento del dom donde se va a mostrar la informacion
    const panel = document.getElementById("info-general")
    panel.innerHTML = "";

    //Creamos una serie de elemtos html para mostrar la informacion
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const id = document.createElement("h4");
    const types = document.createElement("div");
    const type1 = document.createElement("div");
    const type2 = document.createElement("div");
    const abilities = document.createElement("h4");
    const item = document.createElement("h4");
    const exp = document.createElement("h4");
    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    types.setAttribute("class", "tiposPokemon")

    // Se asigna el nombre del pokemon
    title.innerText = capitalizarPrimeraLetra(data.name);

    
    // Como en la data del pokemon no esta su descripcion pero si la url para buscar esa informacion
    // pasamos la url y el elemento html a una funcion que se encargue de conseguirla y mostrarla
    getPokemonDescription(description);

    //asignamos su id o numero de pokedex
    id.innerText = "Numero de Pokedex: " + data.id + ".";

    //se asigna el o los tipos del pokemon
    //segun el dato retornado asignamos el texto y color correspondiente 

    if (data.types.length == 1) {
        let tipo = data.types[0].type.name;  
        switch (tipo) {
            case "normal":
                tipo = "Normal";            
                type1.style.backgroundColor = "rgb(170,170,153)";
                break;
            case "fighting":
                tipo = "Lucha";
                type1.style.backgroundColor = "rgb(187,85,68)";    
                break;
            case "flying":
                tipo = "Volador";
                type1.style.backgroundColor = "rgb(136,153,255)";
                break;
            case "poison":
                tipo = "Veneno";
                type1.style.backgroundColor = "rgb(170,85,153)";
                break;
            case "ground":
                tipo = "Tierra";
                type1.style.backgroundColor = "rgb(221,187,85)";
                break;
            case "rock":
                tipo = "Roca";
                type1.style.backgroundColor = "rgb(187,170,102)";
                break;
            case "bug":
                tipo = "Bicho";
                type1.style.backgroundColor = "rgb(170,187,34)";
                break;            
            case "ghost":
                tipo = "Fantasma";
                type1.style.backgroundColor = "rgb(102,102,187)";
                break;
            case "steel":
                tipo = "Acero";
                type1.style.backgroundColor = "rgb(170,170,187)";
                break;
            case "fire":
                tipo = "Fuego";
                type1.style.backgroundColor = "rgb(255,68,34)";
                break;
            case "water":
                tipo = "Agua";
                type1.style.backgroundColor = "rgb(51,153,255)";
                break;
            case "grass":
                tipo = "Planta";
                type1.style.backgroundColor = "rgb(119,204,85)";
                break;
            case "electric":
                tipo = "Electrico"; 
                type1.style.backgroundColor = "rgb(255,204,51)"; 
                break;
            case "psychic":
                tipo = "Psiquico";
                type1.style.backgroundColor = "rgb(255,85,153)";
                break;
            case "ice":
                tipo = "Hielo";
                type1.style.backgroundColor = "rgb(102,204,255)";
                break;
            case "dragon":
                tipo = "Dragón";
                type1.style.backgroundColor = "rgb(119,102,238)";
                break;
            case "dark":
                tipo = "Siniestro";
                type1.style.backgroundColor = "rgb(119,85,68)";
                break;            
            case "fairy":
                tipo = "Hada";
                type1.style.backgroundColor = "rgb(238,153,238)";
        }
        type1.innerText = tipo;
    }else{
  
        for (let index = 0; index < data.types.length; index++) {
            let tipo = data.types[index].type.name;  
            if (index == 0) {
                switch (tipo) {
                    case "normal":
                        tipo = "Normal";            
                        type1.style.backgroundColor = "rgb(170,170,153)";
                        break;
                    case "fighting":
                        tipo = "Lucha";
                        type1.style.backgroundColor = "rgb(187,85,68)";    
                        break;
                    case "flying":
                        tipo = "Volador";
                        type1.style.backgroundColor = "rgb(136,153,255)";
                        break;
                    case "poison":
                        tipo = "Veneno";
                        type1.style.backgroundColor = "rgb(170,85,153)";
                        break;
                    case "ground":
                        tipo = "Tierra";
                        type1.style.backgroundColor = "rgb(221,187,85)";
                        break;
                    case "rock":
                        tipo = "Roca";
                        type1.style.backgroundColor = "rgb(187,170,102)";
                        break;
                    case "bug":
                        tipo = "Bicho";
                        type1.style.backgroundColor = "rgb(170,187,34)";
                        break;            
                    case "ghost":
                        tipo = "Fantasma";
                        type1.style.backgroundColor = "rgb(102,102,187)";
                        break;
                    case "steel":
                        tipo = "Acero";
                        type1.style.backgroundColor = "rgb(170,170,187)";
                        break;
                    case "fire":
                        tipo = "Fuego";
                        type1.style.backgroundColor = "rgb(255,68,34)";
                        break;
                    case "water":
                        tipo = "Agua";
                        type1.style.backgroundColor = "rgb(51,153,255)";
                        break;
                    case "grass":
                        tipo = "Planta";
                        type1.style.backgroundColor = "rgb(119,204,85)";
                        break;
                    case "electric":
                        tipo = "Electrico"; 
                        type1.style.backgroundColor = "rgb(255,204,51)"; 
                        break;
                    case "psychic":
                        tipo = "Psiquico";
                        type1.style.backgroundColor = "rgb(255,85,153)";
                        break;
                    case "ice":
                        tipo = "Hielo";
                        type1.style.backgroundColor = "rgb(102,204,255)";
                        break;
                    case "dragon":
                        tipo = "Dragón";
                        type1.style.backgroundColor = "rgb(119,102,238)";
                        break;
                    case "dark":
                        tipo = "Siniestro";
                        type1.style.backgroundColor = "rgb(119,85,68)";
                        break;            
                    case "fairy":
                        tipo = "Hada";
                        type1.style.backgroundColor = "rgb(238,153,238)";
                }
                type1.innerText = tipo;
            }else{
                switch (tipo) {
                    case "normal":
                        tipo = "Normal";            
                        type2.style.backgroundColor = "rgb(170,170,153)";
                        break;
                    case "fighting":
                        tipo = "Lucha";
                        type2.style.backgroundColor = "rgb(187,85,68)";    
                        break;
                    case "flying":
                        tipo = "Volador";
                        type2.style.backgroundColor = "rgb(136,153,255)";
                        break;
                    case "poison":
                        tipo = "Veneno";
                        type2.style.backgroundColor = "rgb(170,85,153)";
                        break;
                    case "ground":
                        tipo = "Tierra";
                        type2.style.backgroundColor = "rgb(221,187,85)";
                        break;
                    case "rock":
                        tipo = "Roca";
                        type2.style.backgroundColor = "rgb(187,170,102)";
                        break;
                    case "bug":
                        tipo = "Bicho";
                        type2.style.backgroundColor = "rgb(170,187,34)";
                        break;            
                    case "ghost":
                        tipo = "Fantasma";
                        type2.style.backgroundColor = "rgb(102,102,187)";
                        break;
                    case "steel":
                        tipo = "Acero";
                        type2.style.backgroundColor = "rgb(170,170,187)";
                        break;
                    case "fire":
                        tipo = "Fuego";
                        type2.style.backgroundColor = "rgb(255,68,34)";
                        break;
                    case "water":
                        tipo = "Agua";
                        type2.style.backgroundColor = "rgb(51,153,255)";
                        break;
                    case "grass":
                        tipo = "Planta";
                        type2.style.backgroundColor = "rgb(119,204,85)";
                        break;
                    case "electric":
                        tipo = "Electrico"; 
                        type2.style.backgroundColor = "rgb(255,204,51)"; 
                        break;
                    case "psychic":
                        tipo = "Psiquico";
                        type2.style.backgroundColor = "rgb(255,85,153)";
                        break;
                    case "ice":
                        tipo = "Hielo";
                        type2.style.backgroundColor = "rgb(102,204,255)";
                        break;
                    case "dragon":
                        tipo = "Dragón";
                        type2.style.backgroundColor = "rgb(119,102,238)";
                        break;
                    case "dark":
                        tipo = "Siniestro";
                        type2.style.backgroundColor = "rgb(119,85,68)";
                        break;            
                    case "fairy":
                        tipo = "Hada";
                        type2.style.backgroundColor = "rgb(238,153,238)";
                }
                type2.innerText = tipo;
            }
        }        
    }
    
    //Se asignan la o las las habilidades que puede traer el pokemon
    if (data.abilities.length == 1) {
        abilities.innerText = "Habilidad: " + capitalizarPrimeraLetra(data.abilities[0].ability.name);  
    }else{
        abilities.innerText = "Habilidades: "
        for (let index = 0; index < data.abilities.length; index++) {
            const abilitie = data.abilities[index];
            if (index == data.abilities.length - 1) {
                abilities.innerText = abilities.innerText + capitalizarPrimeraLetra(abilitie.ability.name) + "." ;
            }else{
                abilities.innerText = abilities.innerText + capitalizarPrimeraLetra(abilitie.ability.name) + ", " ;
            }
        }        
    }

    //Se asignan el o los objetos que puede traer el pokemon
    item.innerText ="Objeto que puede traer: ";
    if (data.held_items == 0) {
        item.innerText = item.innerText + "Ninguno";
    }else{
        item.innerText = item.innerText + capitalizarPrimeraLetra(data.held_items[0].item.name) + ".";
    }
    exp.innerText = "Experencia Base: " + data.base_experience + ".";
    
    //Se crea el boton de favoritos

    let favorite = document.createElement("button");
    favorite.setAttribute("id", "btn_favorite");

    //Se revisa el localstorage para saber el valor del botn de favoritos

    if (localStorage.getItem(data.name) == null) {
        localStorage.setItem(data.name, "no-favorito")
    }
    
    if (localStorage.getItem(data.name) == null || localStorage.getItem(data.name) == "no-favorito") {
        favorite.innerText = "➕";
    }

    if (localStorage.getItem(data.name) == "si-favorito") {
        favorite.innerText = "❤️";
    }

    //hacemos que el boton favoritos llame a una funcion al ser presionado
    favorite.addEventListener("click", settearFavorito);

    //funcion que cambia el valor del boton de favoritos al hacer clik

    function settearFavorito() {
        if (localStorage.getItem(data.name) == "no-favorito") {
            favorite.innerText = "❤️";
            localStorage.removeItem(data.name);
            localStorage.setItem(data.name, "si-favorito");
            return;
        }

        if (localStorage.getItem(data.name) == "si-favorito") {
            favorite.innerText = "➕";
            localStorage.removeItem(data.name);
            localStorage.setItem(data.name, "no-favorito");
            return;
        }
    }

    //Se agregan todos los elementos en sus respectivos orden y lugares para mostrarlos

    types.appendChild(type1);
    types.appendChild(type2);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(id);
    card.appendChild(types);
    card.appendChild(abilities);
    card.appendChild(item);
    card.appendChild(exp);   
    card.appendChild(favorite); 
    panel.appendChild(card);
    panel.appendChild(image);
}

// mostramos las estadisticas de un pokemon

function mostrarPokemonStats(data){
    const panel = document.getElementById("info-stats");  

    //creamos una constante para cada estadistica y se le asigna su valor
    const ps = data.stats[0].base_stat;
    const atk = data.stats[1].base_stat;
    const def = data.stats[2].base_stat;
    const spatk = data.stats[3].base_stat;
    const spdef = data.stats[4].base_stat;
    const spd = data.stats[5].base_stat;

    // se limpia el canvas por si se habia usado antes
    limpiarCanvas(canvasChart);

    //Creamos una grafico de barras usando canvas y chart
    var ctx = document.getElementById('myChart').getContext('2d');
    canvasChart = new Chart(ctx, {
        type: 'bar',
        // creamos una barra para cada estadistica, se le asignan valores y colores
        data: {
            labels: ['Salud', 'Ataque', 'Defensa', 'Ata Especial', 'Def especial', "Velocidad"],
            datasets: [{
            label: 'Stats Base',
            maxBarThickness: 80,
        
            data: [ps, atk, def, spatk, spdef, spd],
            backgroundColor: [
                'rgba(115, 255, 99, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 216, 99, 0.2)',
                'rgba(255, 99, 190, 0.2)',
                'rgba(156, 99, 255, 0.2)',
                'rgba(99, 221, 255, 0.2)'
            ],
            borderColor: [
                'rgb(115, 255, 99)',
                'rgb(255, 99, 132)',
                'rgb(255, 216, 99)',
                'rgb(255, 99, 224)',
                'rgb(156, 99, 255)',
                'rgb(99, 221, 255)'
            ],
            borderWidth: 1
            }]
        },
    })  
}

// mostramos los movimientos que aprende el pokemon

function mostrarPokemonMoves(data){
    // obtenemos el elemento donde se va a mostrar la informacion, se crea y agrega el titulo
    const panel = document.getElementById("info-moves")
    panel.innerHTML = "";
    const subTitulo = document.createElement("h2");
    subTitulo.innerText = "Movimientos que aprende el pokemon";
    panel.appendChild(subTitulo);

    // recorremos todo el arreglo de movimientos del pokemon
    for (let index = 0; index < data.moves.length; index++) {
        // creamos una primera fila de elementos para usar como cabezera
        // se le agrega su contenido y se agregan al dom
        if (index == 0) {
            const line = document.createElement("div");
            const title = document.createElement("h5");
            const category = document.createElement("h5");
            const power = document.createElement("h5");
            const accuracy = document.createElement("h5");
            const type = document.createElement("h5");

            category.setAttribute("class", "movil_hide");
            power.setAttribute("class", "movil_hide");
            accuracy.setAttribute("class", "movil_hide");

            title.innerText = "NOMBRE";
            category.innerText = "CATEGORIA";
            power.innerText = "PODER";
            accuracy.innerText = "PRECISION";
            type.innerText = "TIPO";

            line.appendChild(title);
            line.appendChild(category);
            line.appendChild(power);
            line.appendChild(accuracy);
            line.appendChild(type);
            panel.appendChild(line);
        }

        //Creamos una serie de elementos donde se va a mostrar la informacion del movimiento

        const move = data.moves[index].move;
        const line = document.createElement("div");
        const title = document.createElement("p");
        const category = document.createElement("p");
        const power = document.createElement("p");
        const accuracy = document.createElement("p");
        const type = document.createElement("div");
        
        category.setAttribute("class", "movil_hide");
        power.setAttribute("class", "movil_hide");
        accuracy.setAttribute("class", "movil_hide");

        // Como en el arreglo de los movimientos no esta la informacion de los movimientos
        // pero si la url para buscar esa informacion pasamos la url y los elementos html a una funcion
        // que se encargue de conseguir la informacion y asignarla a su respectivo elemento html
        getPokemonMoveDescription(move.url, title, category, power, accuracy, type);

        // Se agregan los elementos al dom
        line.appendChild(title);
        line.appendChild(category);
        line.appendChild(power);
        line.appendChild(accuracy);
        line.appendChild(type);
        panel.appendChild(line);
    }
}

// Buscamos la informacion de movimiento

async function getPokemonMoveDescription(move_url, title, category, power, accuracy, type){
    const url = new URL(move_url);

    // hacemos la llamada a la api para obtener los datos del movimiento
    const response = await fetch(url.toString());
    if(response.ok) {
        const data =  await response.json();

        // enviamos los datos de la api y los elementos html a una funcion que los trabaje
        mostrarPokemonMoveDescripcion(data, title, category, power, accuracy, type);
    }else{
        alert("asi no es")
    } 
}

//  mostramos la informacion de movimiento

function mostrarPokemonMoveDescripcion(data, title, category, power, accuracy, type){
    let nombre = "";
    // recorremos el arreglo que contiene los nombres en distintos idiomas
    // y asigamos el nombre en idioma español, si no hay se muestra en ingles
    let notSpanish = true;
    for (let index = 0; index < data.names.length; index++) {
        moveName = data.names[index];
        if(moveName.language.name == "es"){
            nombre = moveName.name;
            notSpanish = false;
        }

        if(notSpanish == true){
            if(moveName.language.name == "en"){
                nombre = moveName.name;
            }    
        }         
    }  

    //creamos variables y le asignamos los valores que retorna la api

    let categoria = data.damage_class.name;
    let potencia = "-- ";
    let precision;
    let tipo = data.type.name;

    //Asignamos la categoria, potencia y precision correspondiente al movimiento según lo que retorne la api
    // y se manejan las posibles excepciones

    switch (categoria) {
        case "physical":
            categoria = "Físico 💥";
            break;
        case "special":
            categoria = "Especial 🌀";
            break;
        case "status":
            categoria = "Estado ♾️";
    }

    precision = data.accuracy + "%";

    if (data.accuracy == null) {
        precision = "--";
    }

    if (categoria != "Estado ♾️") {
        potencia = data.power;

        if (potencia == null || potencia == 0) {
            potencia = "Variable";
        }

        if (data.accuracy == null) {
            precision = "Nunca Falla";
        }
    }

    // segun el dato retornado asignamos el texto y color correspondiente 
    switch (tipo) {
        case "normal":
            tipo = "Normal";            
            type.style.backgroundColor = "rgb(170,170,153)";
            break;
        case "fighting":
            tipo = "Lucha";
            type.style.backgroundColor = "rgb(187,85,68)";    
            break;
        case "flying":
            tipo = "Volador";
            type.style.backgroundColor = "rgb(136,153,255)";
            break;
        case "poison":
            tipo = "Veneno";
            type.style.backgroundColor = "rgb(170,85,153)";
            break;
        case "ground":
            tipo = "Tierra";
            type.style.backgroundColor = "rgb(221,187,85)";
            break;
        case "rock":
            tipo = "Roca";
            type.style.backgroundColor = "rgb(187,170,102)";
            break;
        case "bug":
            tipo = "Bicho";
            type.style.backgroundColor = "rgb(170,187,34)";
            break;            
        case "ghost":
            tipo = "Fantasma";
            type.style.backgroundColor = "rgb(102,102,187)";
            break;
        case "steel":
            tipo = "Acero";
            type.style.backgroundColor = "rgb(170,170,187)";
            break;
        case "fire":
            tipo = "Fuego";
            type.style.backgroundColor = "rgb(255,68,34)";
            break;
        case "water":
            tipo = "Agua";
            type.style.backgroundColor = "rgb(51,153,255)";
            break;
        case "grass":
            tipo = "Planta";
            type.style.backgroundColor = "rgb(119,204,85)";
            break;
        case "electric":
            tipo = "Electrico"; 
            type.style.backgroundColor = "rgb(255,204,51)"; 
            break;
        case "psychic":
            tipo = "Psiquico";
            type.style.backgroundColor = "rgb(255,85,153)";
            break;
        case "ice":
            tipo = "Hielo";
            type.style.backgroundColor = "rgb(102,204,255)";
            break;
        case "dragon":
            tipo = "Dragón";
            type.style.backgroundColor = "rgb(119,102,238)";
            break;
        case "dark":
            tipo = "Siniestro";
            type.style.backgroundColor = "rgb(119,85,68)";
            break;            
        case "fairy":
            tipo = "Hada";
            type.style.backgroundColor = "rgb(238,153,238)";
    }

    type.style.color= "whitesmoke";  
    
    // se agrega a los elementos html la informacion que ha sido obtenida, revisada y formateada

    title.innerText = nombre;
    category.innerText = categoria;
    power.innerText = potencia;
    accuracy.innerText = precision;
    type.innerText = tipo;
}

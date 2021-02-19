
//Selectores
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    //Valido campos obligatorios
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
        
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000)
    }
}

function consultarAPI(ciudad, pais){

    const appId = '2f0f46b0a1de8787203c9fe8d3f21969';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    spinner(); //Muestra spinner de carga
    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( data => {
            limpiarHTML();
            if(data.cod === "404"){
                mostrarError('Ciudad no encontrada');
                return;
            }

            // Imprmio la respuesta en el HTML
            mostrarClima(data);
        } )
}

function mostrarClima(datos){

    let { name, main: { temp, temp_max, temp_min } } = datos;

    temp = kelvinACentigrados(temp);
    temp_max = kelvinACentigrados(temp_max);
    temp_min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${temp} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const max = document.createElement('p');
    max.innerHTML = `Max: ${temp_max} &#8451`;
    max.classList.add('text-xl');

    const min = document.createElement('p');
    min.innerHTML = `Min: ${temp_min} &#8451`;
    min.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);

    resultado.appendChild(resultadoDiv);

}

function limpiarHTML(){

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    
}

const kelvinACentigrados = grados => parseInt(grados -273.15);

function spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);

}
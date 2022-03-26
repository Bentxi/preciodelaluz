'use strict*';

var fecha = new Date();
var fecha2 = fecha.toISOString().slice(0,10);

var urlree = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=' + fecha2 + 'T00:00&end_date=' + fecha2 + 'T23:59&time_trunc=hour';

var precios = [];
var titulo = document.getElementById('tituloprincipal');
var divprecios = document.getElementById('precios');
var divmax = document.getElementById('maximo');
var divmed = document.getElementById('medio');
var divmin = document.getElementById('minimo');
var divtabla = document.getElementById('cuerpoTabla');
var divtablaord = document.getElementById('cuerpoTablaBaratos');
var divtablaord2 = document.getElementById('cuerpoTablaCaras');

//Hacemos la llamada y rellenamos la tabla con los precios por hora de la luz.
fetch(urlree)
    .then(function(data){
        return data.json();
    })
    .then(prizes =>{
        precios = prizes;
        precios2 = precios.included[0].attributes.values;
        valores = [];

        precios2.forEach(element => {
            valores.push(element.value)
        });

        maximo = Math.max.apply(null,valores);
        minimo = Math.min.apply(null,valores);
        suma = 0;
        valores.forEach (function(numero){
        suma += numero;
        });
        media = (suma / 24).toFixed(2);

        precios2.map(function(precio){

            let tr = document.createElement('tr');
            divtabla.appendChild(tr);
            let td1 = document.createElement('td');
            td1.innerHTML = (precio.datetime.slice(11,13))+':00';
            divtabla.appendChild(td1);
            let td2 = document.createElement('td');
            td2.innerHTML = precio.value + ' €/MWh';
            divtabla.appendChild(td2);
            if (precio.value<media) {
                td2.style.color = "green";
            }else 
                td2.style.color = "red";
            let tdbutton = document.createElement('td');
            let button = document.createElement('button'); 
                button.textContent = 'Más info';
                button.dataset.precio = JSON.stringify(precio);
                button.addEventListener("click", masInfo); 
            divtabla.appendChild(tdbutton);
            tdbutton.appendChild(button);
            let tr2 = document.createElement('tr');
            divtabla.appendChild(tr2);
        });
    });

//Realizamos una nueva llamada y rellenamos la tabla con los 6 mejores precios:
fetch(urlree)
    .then(function(data){
        return data.json();
    })
    .then(prizesord =>{
        preciosord = prizesord;
        preciosordenados = preciosord.included[0].attributes.values;

        preciosordenados.sort(function (a, b) {
            if (a.value > b.value) {
            return 1;
            }
            if (a.value < b.value) {
            return -1;
            }
            return 0;
        });

        preciosordenados2 = preciosordenados.slice(0,5);

        preciosordenados2.map(function(precioord){

            let trord = document.createElement('tr');
            divtablaord.appendChild(trord);
            let td1ord = document.createElement('td');
            td1ord.innerHTML = (precioord.datetime.slice(11,13))+':00';
            divtablaord.appendChild(td1ord);
            let td2ord = document.createElement('td');
            td2ord.innerHTML = precioord.value + ' €/MWh';
            divtablaord.appendChild(td2ord);
            let tdbuttonord = document.createElement('td');
            let buttonord = document.createElement('button'); 
                buttonord.textContent = 'Más info';
                buttonord.dataset.precio = JSON.stringify(precioord);
                buttonord.addEventListener("click", masInfo);
            divtablaord.appendChild(tdbuttonord);
            tdbuttonord.appendChild(buttonord);
            let tdbuttonordw = document.createElement('td');
            let buttonordw = document.createElement('button'); 
            buttonordw.dataset.precio = JSON.stringify(precioord);
            buttonordw.addEventListener("click", compartir);
            buttonordw.setAttribute('class', 'botonw');
            divtablaord.appendChild(tdbuttonordw);
            tdbuttonordw.appendChild(buttonordw);
            let tr2ord = document.createElement('tr');
            divtablaord.appendChild(tr2ord);
            
        });
    });

//Realizamos una nueva llamada y rellenamos la tabla con los 6 peores precios:
fetch(urlree)
    .then(function(data){
        return data.json();
    })
    .then(prizesord2 =>{
        preciosord2 = prizesord2;
        preciosordenados2 = preciosord2.included[0].attributes.values;

        preciosordenados2.sort(function (a, b) {
            if (a.value < b.value) {
            return 1;
            }
            if (a.value > b.value) {
            return -1;
            }
            return 0;
        });

        preciosordenados3 = preciosordenados2.slice(0,5);

        preciosordenados3.map(function(precioord2){

            let trord2 = document.createElement('tr');
            divtablaord2.appendChild(trord2);
            let td1ord2 = document.createElement('td');
            td1ord2.innerHTML = (precioord2.datetime.slice(11,13))+':00';
            divtablaord2.appendChild(td1ord2);
            let td2ord2 = document.createElement('td');
            td2ord2.innerHTML = precioord2.value + ' €/MWh';
            divtablaord2.appendChild(td2ord2);
            let tdbuttonord2 = document.createElement('td');
            let buttonord2 = document.createElement('button'); 
                buttonord2.textContent = 'Más info';
                buttonord2.dataset.precio = JSON.stringify(precioord2);
                buttonord2.addEventListener("click", masInfo); 
            divtablaord2.appendChild(tdbuttonord2);
            tdbuttonord2.appendChild(buttonord2);
            let tr2ord2 = document.createElement('tr');
            divtablaord2.appendChild(tr2ord2);
        });
    });

//Hacemos otra llamada para rellenar el maximo, la media y el minimo.
fetch(urlree)
    .then(function(data){
        return data.json();
    })
    .then(prizes =>{
        precios = prizes;
        precios2 = precios.included[0].attributes.values;
        valores = [];

        precios2.forEach(element => {
            valores.push(element.value)
        });

        maximo = Math.max.apply(null,valores);
        minimo = Math.min.apply(null,valores);
        suma = 0;
        valores.forEach (function(numero){
        suma += numero;
        });
        media = (suma / 24).toFixed(2);

            let fechadehoy = document.createElement('h2');
            fechadehoy.innerHTML = fecha2;
            titulo.appendChild(fechadehoy);

            let preciomax = document.createElement('p');
            preciomax.innerHTML = maximo + ' €/MWh';
            divmax.appendChild(preciomax);

            let preciomed = document.createElement('p');
            preciomed.innerHTML = media + ' €/MWh';
            divmed.appendChild(preciomed);

            let preciomin = document.createElement('p');
            preciomin.innerHTML = minimo + ' €/MWh';
            divmin.appendChild(preciomin);

    });

    // Esta función será llamada cada vez que se haga clic en el botón Mas Info
const masInfo = function() {
    const precioComoJson = this.dataset.precio;
    const precio = JSON.parse(precioComoJson);
    let horainicio = parseInt((precio.datetime).slice(11,13));
    let horafin = parseInt((precio.datetime).slice(11,13))+1;
    if (precio.value < media) {
        alert("Desde las " + horainicio + ":00 hasta las " + horafin + ":00\n\nEl precio es: "+ (precio.value/1000).toFixed(2) + " €/KWh \n\nEstá " + ((media-precio.value)/1000).toFixed(2) + "€ por debajo de la media");
    } else {
        alert("Desde las " + horainicio + ":00 hasta las " + horafin + ":00\n\nEl precio es: "+ (precio.value/1000).toFixed(2) + " €/KWh \n\nEstá " + ((precio.value-media)/1000).toFixed(2) + "€ por encima de la media");
    }
};

    // Esta función será llamada cada vez que se haga clic en el botón Compartir
const compartir = function() {
    const precioComoJson = this.dataset.precio;
    const precio = JSON.parse(precioComoJson);
    var telefono = prompt("¿A que número de teléfono desea enviar la información?:");
    if(telefono==undefined){
    }else{
    let horainicio = parseInt((precio.datetime).slice(11,13));
    let horafin = parseInt((precio.datetime).slice(11,13))+1;
    let url = 'https://api.whatsapp.com/send?phone=34' + telefono + '&text=Desde%20las%20' + horainicio + ':00%20hasta%20las%20' + horafin + ':00\n\n%20el%20precio%20es:%20'+ (precio.value/1000).toFixed(2) + '%20€/KWh%20\n\nEstá%20' + ((media-precio.value)/1000).toFixed(2) + '€%20por%20debajo%20de%20la%20media';
    let url2 = 'https://api.whatsapp.com/send?phone=34' + telefono + '&text=Desde%20las%20' + horainicio + ':00%20hasta%20las%20' + horafin + ':00\n\n%20el%20precio%20es:%20'+ (precio.value/1000).toFixed(2) + '%20€/KWh%20\n\nEstá%20' + ((precio.value-media)/1000).toFixed(2) + '€%20por%20debajo%20de%20la%20media';
    if(precio.value < media) {
    window.open(url);
    }else {
    window.open(url2);
    }
    }
};
    
    //Hacemos el grafico
    fetch(urlree)
    .then(function(data){
        return data.json();
    })
    .then(prizes =>{
        precios = prizes;
        precios2 = precios.included[0].attributes.values;
        valoresgraf = [];

        precios2.forEach(element => {
            valoresgraf.push(element.value)
        });

        console.log(valoresgraf);

    var speedCanvas = document.getElementById("speedChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 14;

var speedData = {
  labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
  datasets: [{
    label: "Precio por hora:",
    data: valoresgraf,
    lineTension: 0,
    fill: false,
    borderColor: 'orange',
    backgroundColor: 'transparent',
    borderDash: [5, 5],
    pointBorderColor: 'orange',
    pointBackgroundColor: 'rgba(255,150,0,0.5)',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
  }]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 40,
      fontColor: 'white'
    }
  }
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

    });
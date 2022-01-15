$(document).ready(function() {

    $("form").submit(function(event) {
        event.preventDefault();

        let valueInput = $("#superHeroInput").val();
        console.log(valueInput)
        if (/[a-z]/gi.test(valueInput) || valueInput == '') {
            return alert(`==> "${valueInput}" <==  | es una palabra, debes ingresar un número !!`.toLocaleUpperCase());
        }
        traerSuperHero(valueInput);

        /* if (
            /[a-z]/gi.test(valueInput) ||
            valueInput == '') {
            alert(`" ${valueInput} " es una palabra, debes ingresar un número !!`.toLocaleUpperCase())
        } else {
            traerSuperHero(valueInput);
        }; */

    });


});

const traerSuperHero = function(valueInput) {
    $.ajax({
        url: "https://superheroapi.com/api.php/3101047970108613/" + valueInput,

        //Lo que se sucita toda vez que de una respuesta la url con funcion
        success: function(data) {

            //Se declaraon variables, buscando en inspector del navegador, los atributos que contienen los arreglos que entrega el valueInput en el formulario Html
            let nombre = data.name;
            let imagen = data.image.url;
            let conecciones = data.connections["group-affiliation"];
            let publicado = data.biography.publisher;
            let ocupacion = data.work.occupation;
            let primera_aparicion = data.biography["first-appearance"];
            //dentro de biography
            let altura = data.appearance.height[0];
            let feet = data.appearance.height[1];
            let libra = data.appearance.weight[0];
            let peso = data.appearance.weight[1];
            let alianzas = data.biography.aliases;

            /* Implementación por Html por Jquery concatenación de variables por interpolación, para implementar html a través de Jquery*/
            $("#superHeroInfo").html(`
            <h5>SuperHero Encontrado</h5>
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${imagen}" class="card-img" alt="imagen_${nombre}">
                    </div>
                    <div class="col-md-8 text-left text-bold">
                        <div class="card-body">
                        
                            <h5 class="card-title">Nombre: ${nombre}</h5>
                            <p class="card-text">Conexiones: ${conecciones}</p>
                            <p class="card-text">Publicador por: ${publicado}</p>
                            <hr>
                            <p class="card-text">Ocupación: ${ocupacion}</p>
                            <hr>
                            <p class="card-text">Primera Aparición: ${primera_aparicion}</p>
                            <hr>
                            <p class="card-text">Altura: ${altura} - ${feet}</p>
                            <hr>
                            <p class="card-text">Peso: ${libra} - ${peso}</p>
                            <hr>
                            <p class="card-text">Alianzas: ${alianzas}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            `);
            //se crea variable powers, para obtener la key u el valor del objeto powerstats
            let powers = Object.entries(data.powerstats);
            console.log(data)
            console.log(powers);

            let estadisticas = powers.map((element) => {
                return {
                    label: element[0],
                    y: +element[1]
                }
            });
            //console.log(estadisticas);

            var chart = new CanvasJS.Chart("chartContainer", {
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: `Estadísticas de Poder para ${nombre}`
                },
                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: estadisticas
                }]
            });
            chart.render();
        },
    })
}
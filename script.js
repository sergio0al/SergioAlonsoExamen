const cotxes = [
    {id: 1, nom: "Bugatti Chiron Super Sport 300+", potencia: 1500, motor: "80 litres W16", foto: "./fotoCoche.avif"},
    {id: 2, nom: "Koenigsegg Jesco", potencia: 1600, motor: "V8 de 6.6 litres", foto: "./fotoCoche.avif"},
    {id: 3, nom: "Hennesseg Venom F5", potencia: 1800, motor: "V8 de 6.6 litres", foto: "./fotoCoche.avif"},
    {id: 4, nom: "FP Llefia Bugatti", potencia: 3200, motor: "V8 Carlos 8.9 litres", foto: "./fotoCoche.avif"},
    {id: 5, nom: "Sergio Seat", potencia: 2700, motor: "Sergio Alonso v16 3.9 litres", foto: "./coche2.jpg"},

]


// Tarjetes
const divTargetes = document.querySelector("#targetes")

cotxes.forEach(function (cotxe){
    divTargetes.innerHTML += `
    <div class="targeta">
    <img src="${cotxe.foto}" alt="${cotxe.nom}">
    <h3>${cotxe.nom}</h3>
    <p>Potència: ${cotxe.potencia} cavalls de força</p>
    <p>Motor: ${cotxe.motor}</p>
    </div>`
})


// Selector

const select1 = document.querySelector("#cotxe1")
const select2 = document.querySelector("#cotxe2")

select1.innerHTML = `<option value="">Selecciona un cotxe</option>`;
select2.innerHTML = `<option value="">Selecciona un cotxe</option>`;

cotxes.forEach(function (cotxe){
    const opcio = `<option value="${cotxe.id}">${cotxe.nom}</option>`
    select1.innerHTML += opcio;
    select2.innerHTML += opcio;
})


// Comparar

const btnComparar = document.querySelector("#btnComparar")

btnComparar.addEventListener("click", function(){
    const error = document.querySelector("#errorComparar")
    const resultat = document.querySelector("#resultatComprar")
    const id1 = select1.value
    const id2 = select2.value

    error.textContent = ""
    resultat.textContent = ""

    if(id1 === ""  || id2 === ""){
        error.textContent = "Has de seleccionar dos cotxes."
        return
    }

    if(id1 === id2){
        error.textContent = "Has de seleccionar dos cotxes diferents"
        return
    }


    const c1 = cotxes.find(function(c){return c.id == id1;})
    const c2 = cotxes.find(function(c){return c.id == id2;})

    resultat.innerHTML = `
    <table>
        <tr><th>Caracteristicas</th><th>${c1.nom}</th><th>${c2.nom}</th></tr>
        <tr><td>Potència</td><td>${c1.potencia} cavalls</td><td>${c2.potencia} cavalls</td></tr>
        <tr><td>Motor</td><td>${c1.motor}</td><td>${c2.motor}</td></tr>
    </table>`
})



// Cerca per potencia

const btnCerca = document.querySelector("#btnCerca")

btnCerca.addEventListener("click", function(){
    const valor = document.querySelector("#potenciaMin").value.trim()
    const error = document.querySelector("#errorCerca")
    const resultat = document.querySelector("#resultatCerca")
    const limit = Number(valor)

    error.textContent = ""
    resultat.textContent = ""

    if(valor === "" || isNaN(limit) ||limit < 0){
        error.textContent = "Introdueix un número valid"
        return
    }


    // Hora
    const ara = new Date()
    const hh = String(ara.getHours()).padStart(2, "0")
    const mm = String(ara.getMinutes()).padStart(2, "0")

    const trobats = cotxes.filter(function(c){return c.potencia > limit})

    let html = `<p><strong>Cerca feta a les ${hh}:${mm}</strong></p>`

    if(trobats.length === 0){
        html += `No s´has trobat cotxes.` 
    }else{
        html += `<ul>`
        trobats.forEach(function (cotxe){
            html += `<li>${cotxe.nom} - ${cotxe.potencia} cavalls</li>`
        })
        html += `</ul>`
    }

    resultat.innerHTML = html
})
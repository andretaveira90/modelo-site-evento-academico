let lati = document.getElementById("latitude")
let longi = document.getElementById("longitude")
var map
var errorMessage = document.getElementById("errorMessage")

function success(position){
    console.log(position.coords.latitude, position.coords.longitude)
    lati.textContent = `Latitude:${position.coords.latitude}` 
    longi.textContent = `Longitude:${position.coords.longitude}`

    if (map === undefined) {
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15) 
    } else {
        map.remove()
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15)
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'        
    }).addTo(map)

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup()
}

function error(err){
    console.log(err)
    errorMessage.innerHTML = "Ocorreu um erro na localização. Leia as dicas ao fim da página."
}

navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
})

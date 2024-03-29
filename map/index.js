var cityIcon = L.icon({
    iconUrl: "https://github.com/ouvcs/ong-map/blob/main/assets/city.png?raw=true",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, 0]
});

var capitalIcon = L.icon({
    iconUrl: "https://github.com/ouvcs/ong-map/blob/main/assets/capital.png?raw=true",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, 0]
});

function geoJSON(geo, meta) {
    L.geoJSON(geo, {
        pointToLayer: function (feature, latlng) {
            let marker; let type = feature.properties.type;
            
            if (type == "capital") {
                marker = L.marker(latlng, {icon: capitalIcon});
                type = "Столица";
            } else {
                marker = L.marker(latlng, {icon: cityIcon});
                type = "Город";
            }

            marker.bindPopup(function () {
                return `<div class="popup"><div class="info"><div class="name"><strong>${type}</strong> ${feature.properties.name}</h3></div></div>`;
            });

            marker.on("mouseover", function (e) {
                this.openPopup();
            });
            marker.on("mouseout", function (e) {
                this.closePopup();
            });
            
            citiesMarkers.addLayer(marker);
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(function (layer) {
                return `<div class="popup"><div class="flag"><img src="${meta.flag}" alt="FLAG"></div><div class="info"><h3 class="name">${meta.name}</h3><a href="${meta.link}" target="_blank" class="vk">Правитель</a></div></div>`;
            });
        },
        style: function (feature) {
            return {color: meta.stroke, fill: meta.fill};
        }
    }).addTo(map);
}

let map = L.map("map").setView([0.0, 0.0], 1);
let citiesMarkers = new L.featureGroup();
let countries = ["peoples-republic-agaria", "severnaya-federation", "andreevskaya-federative-republic"]

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
}).addTo(map);

map.on("zoomend", function() {
    if (map.getZoom() < 3){
        map.removeLayer(citiesMarkers);
    } else {
        map.addLayer(citiesMarkers);
    }
});

countries.forEach(async function (element) {
    await fetch("./geos/"+element+".geojson").then((data) => data.json()).then((geo) => {
        fetch("./geos/"+element+".geojson.meta").then((data) => data.json()).then((meta) => {
            geoJSON(geo, meta);
        });
    });
});



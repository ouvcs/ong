function geoJSON(geo, meta) {
    L.geoJSON(geo, {
        pointToLayer: function (feature, latlng) {
            citiesMarkers.addLayer(L.circleMarker(latlng, {radius: 3, fillColor: "#FFFFFF", color: "#000000", weight: 1, opacity: 1, fillOpacity: 1}));
        },
        onEachFeature: function (feature, layer) {
            
        },
        style: function (feature) {
            return {color: feature.properties.stroke, fill: feature.properties.fill};
        }
    }).bindPopup(function (layer) {
        return `<div class="popup"><div class="flag"><img src="${meta.flag}" alt="FLAG"></div><div class="info"><h3 class="name">${meta.name}</h3><a href="${meta.link}" class="vk">Правитель</a></div></div>`;
    }).addTo(map);
}

let map = L.map("map").setView([0.0, 0.0], 1);
let citiesMarkers = new L.featureGroup();
let countries = ["peoples-republic-agaria", "severnaya-federation"]


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 7,
    attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
}).addTo(map);

map.on("zoomend", function() {
    if (map.getZoom() <= 3){
        map.removeLayer(citiesMarkers);
    } else {
        map.addLayer(citiesMarkers);
    }
});

countries.forEach((element) => {
    fetch("./geos/"+element+".geojson").then((data) => data.json()).then((geo) => {
        fetch("./geos/"+element+".geojson.meta").then((data) => data.json()).then((meta) => {
            geoJSON(geo, meta);
        });
    });
});



function geoJSON(geo, meta) {
    console.log("g0"+meta.name);
    L.geoJSON(geo, {
        pointToLayer: function (feature, latlng) {
            let marker;
            let type = feature.properties.type;
            if (type == "capital") {
                marker = L.circleMarker(latlng, {radius: 5, fillColor: "#FFFFFF", color: "#000000", weight: 2, opacity: 1, fillOpacity: 1});
            else {
                marker = L.circleMarker(latlng, {radius: 4, fillColor: "#FFFFFF", color: "#000000", weight: 1, opacity: 1, fillOpacity: 1});
            }
            marker.bindPopup(function () {
                if (type == "capital") {type = "Столица"} else {type = "Город"};
                return `<div class="popup"><div class="flag"><img src="${meta.flag}" alt="FLAG"></div><div class="info"><div class="name"><strong>${type}</strong> ${feature.properties.name}</h3></div></div>`;
            });
            citiesMarkers.addLayer(marker);
            console.log("g1"+meta.name);
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(function (layer) {
                console.log("g2"+meta.name);
                return `<div class="popup"><div class="flag"><img src="${meta.flag}" alt="FLAG"></div><div class="info"><h3 class="name">${meta.name}</h3><a href="${meta.link}" class="vk">Правитель</a></div></div>`;
            });
        },
        style: function (feature) {
            console.log("g3"+meta.name);
            return {color: meta.stroke, fill: meta.fill};
        }
    }).addTo(map);
    console.log("g4"+meta.name);
}

let map = L.map("map").setView([0.0, 0.0], 1);
let citiesMarkers = new L.featureGroup();
let countries = ["peoples-republic-agaria", "severnaya-federation"]


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 7,
    attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
}).addTo(map);

map.on("zoomend", function() {
    if (map.getZoom() <= 4){
        map.removeLayer(citiesMarkers);
    } else {
        map.addLayer(citiesMarkers);
    }
});

countries.forEach(async function (element) {
    console.log("s0"+element);
    await fetch("./geos/"+element+".geojson").then((data) => data.json()).then((geo) => {
        console.log("s1"+element);
        fetch("./geos/"+element+".geojson.meta").then((data) => data.json()).then((meta) => {
            geoJSON(geo, meta);
            console.log("s2"+element);
        });
    });
});



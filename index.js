var map = L.map("map").setView([0.0, 0.0], 1);
//var citiesMarkers = new L.featureGroup();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`
}).addTo(map);



function geoJSON(geo) {
    L.geoJSON(geo, {
        pointToLayer: function (feature, latlng) {
            citiesMarkers.addLayer(feature);
            return L.circleMarker(latlng, {radius: 3, fillColor: "#FFFFFF", color: "#000000", weight: 1, opacity: 1, fillOpacity: 1});
        }
    }).addTo(map);
}

map.on("zoomend", function() {
    if (map.getZoom() < 7){
        map.removeLayer(citiesMarkers);
    }
    else {
        map.addLayer(citiesMarkers);
    }
});

fetch("./geos/peoples-republic-agaria.geojson").then((data) => data.json()).then((geo) => geoJSON(geo));
fetch("./geos/severnaya-federation.geojson").then((data) => data.json()).then((geo) => geoJSON(geo));

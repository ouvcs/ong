var map = L.map("map").setView([0.0, 0.0], 1);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
    pane: "basemap"
}).addTo(map);

function geoJSON(geo) {
    L.geoJSON(geo, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {radius: 8, fillColor: "#ff7800", color: "#000", weight: 1, opacity: 1, fillOpacity: 0.8});
        }
    }).addTo(map);
}

fetch("./geos/peoples-republic-agaria.geojson").then((data) => data.json()).then((geo) => geoJSON(geo));
fetch("./geos/severnaya-federation.geojson").then((data) => data.json()).then((geo) => geoJSON(geo));

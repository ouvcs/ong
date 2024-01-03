var map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("./geos/peoples-republic-agaria.geojson").then((data) => data.json()).then((geo) => L.geoJSON(geo).addTo(map));
fetch("./geos/severnaya-federation.geojson").then((data) => data.json()).then((geo) => L.geoJSON(geo).addTo(map));

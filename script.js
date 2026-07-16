// Create map

var map = L.map('map', {

fullscreenControl: true

}).setView([7.2,80.5],8);


// OpenStreetMap

var osm = L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{

attribution:'© OpenStreetMap'

}

).addTo(map);


// Satellite

var satellite = L.tileLayer(

'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

{

attribution:'Esri'

}

);


// Basemap Control

var baseMaps={

"OpenStreetMap":osm,
"Satellite":satellite

};


// Scale Bar

L.control.scale().addTo(map);


// Polygon Style

function style(feature){

return{

color:"#003366",
weight:2,
fillColor:"#4CAF50",
fillOpacity:0.5

};

}


// Highlight

function highlightFeature(e){

var layer=e.target;

layer.setStyle({

weight:4,
color:"#ff0000",
fillOpacity:0.7

});

layer.bringToFront();

}


// Reset Style

function resetHighlight(e){

geojson.resetStyle(e.target);

}


// Zoom

function zoomToFeature(e){

map.fitBounds(e.target.getBounds());

}


// Popup

function onEachFeature(feature,layer){

var html="";

for(var key in feature.properties){

html += "<b>"+key+"</b> : "
       + feature.properties[key]
       + "<br>";

}

layer.bindPopup(html);

layer.on({

mouseover:highlightFeature,
mouseout:resetHighlight,
click:zoomToFeature

});

}


// Load GeoJSON

var geojson;

fetch("data/Basin.json")

.then(response=>response.json())

.then(function(data){

geojson=L.geoJSON(data,{

style:style,

onEachFeature:onEachFeature

}).addTo(map);

map.fitBounds(geojson.getBounds());

L.control.layers(baseMaps,{
"Basin":geojson
}).addTo(map);

});
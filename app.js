var parentGroup = L.markerClusterGroup();
var CDI = L.featureGroup.subGroup(parentGroup);
var CDR = L.featureGroup.subGroup(parentGroup);
var CIC = L.featureGroup.subGroup(parentGroup);
var HUE = L.featureGroup.subGroup(parentGroup);
var IM = L.featureGroup.subGroup(parentGroup);
var MAY = L.featureGroup.subGroup(parentGroup);
var ANP = L.featureGroup.subGroup(parentGroup);
var MDC = L.featureGroup.subGroup(parentGroup);
var EEE = L.featureGroup.subGroup(parentGroup);


// Google Spreadsheet
var spreadsheetID = "1gBBlBkU2nMio5MV_qadALPZSRR-SSLQ6zWPNRNTj5ms";
var spreadsheetID2 = "1Q7EuLFDoAN5qXNXG_86lfxUx7IvWTOvP0sCf63-fdMI";
var url =
  "https://spreadsheets.google.com/feeds/list/" +
  spreadsheetID2 +
  "/1/public/values?alt=json";

// Icons
var ColorIcons = L.Icon.extend({
  options: {
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
});
var urlIcons =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-";
var blueIcon = new ColorIcons({ iconUrl: urlIcons + "blue.png" }),
  goldIcon = new ColorIcons({ iconUrl: urlIcons + "gold.png" }),
  redIcon = new ColorIcons({ iconUrl: urlIcons + "red.png" }),
  greenIcon = new ColorIcons({ iconUrl: urlIcons + "green.png" }),
  orangeIcon = new ColorIcons({ iconUrl: urlIcons + "orange.png" }),
  yellowIcon = new ColorIcons({ iconUrl: urlIcons + "yellow.png" }),
  violetIcon = new ColorIcons({ iconUrl: urlIcons + "violet.png" }),
  greyIcon = new ColorIcons({ iconUrl: urlIcons + "grey.png" }),
  blackIcon = new ColorIcons({ iconUrl: urlIcons + "black.png" });

L.icon = function(options) {
  return new L.Icon(options);
};

const icons = {
  CDI: blueIcon,
  CDR: greenIcon,
  CIC: orangeIcon,
  EEE: greyIcon
  // HUE: greenIcon,
  // IM: goldIcon,
  // MAY: greyIcon,
  // ANP: violetIcon,
  // MDC: yellowIcon
};

// Buscamos los datos Json de Google
fetch(url)
  .then(res => res.json())
  .then(data => {
    var entry = data.feed.entry;
    var amount = entry.length;
    console.log(amount);
    var i;
    for (i = 0; i < amount; i++) {
      var lat = data.feed.entry[i]["gsx$latitud"]["$t"];
      var lon = data.feed.entry[i]["gsx$longitud"]["$t"];
      //var titulo = data.feed.entry[i]["gsx$titulo"]["$t"];
      var categoria = data.feed.entry[i]["gsx$categoria"]["$t"];
      var articulador = data.feed.entry[i]["gsx$articulador"]["$t"];
      //var provincia = data.feed.entry[i]["gsx$provincia"]["$t"];
      //var localidad = data.feed.entry[i]["gsx$localidad"]["$t"];
      var dir = data.feed.entry[i]["gsx$direccion"]["$t"];
      var email = data.feed.entry[i]["gsx$email"]["$t"];
      var tel = data.feed.entry[i]["gsx$telefono"]["$t"];
      var web = data.feed.entry[i]["gsx$sitioweb"]["$t"];
      var cat = data.feed.entry[i]["gsx$cat"]["$t"];
      var btnWeb =
        web === ""
          ? ""
          : '<a target="_blank" href="' + web + '">Conocé más</a>';
      L.marker([lat, lon], { icon: icons[cat] })
        .bindPopup(
          "<p>" +
            categoria +
            "</p>" +
            "<h4>" +
            articulador +
            "</h4>" +
            "<p>" +
            dir +
            "</p>" +
            "<p>" +
            email +
            "</p>" +
            "<p>" +
            tel +
            "</p>" +
            btnWeb
            // '<p><a target="_blank" href="https://www.argentina.gob.ar/desarrollosocial/sumainformacion">Sumá información</a></p>'
        )
        .addTo(eval(cat));
    }
  });

// Estilos
var mapboxUrl =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Jpc3RpYW5vamVkYSIsImEiOiJjazVzNWRnczcwa2c0M2ttcXpzNzl6aGV1In0.weNfOTYnFN4OOCj0pye69g";

//   var streets = L.tileLayer(mapboxUrl, {
//   id: "mapbox/streets-v11",
//   tileSize: 512,
//   zoomOffset: -1
// });
// var satellite = L.tileLayer(mapboxUrl, {
//   id: "cristianojeda/ck5wlrbjg042x1in6xgq6dop9",
//   tileSize: 512,
//   zoomOffset: -1
// });
var barriospopulares = L.tileLayer(mapboxUrl, {
  id: "cristianojeda/ckg0z38hh2q8218pg889xbhr1",
  tileSize: 512,
  zoomOffset: -1,
})
var barriospopularesAMBA = L.tileLayer(mapboxUrl, {
  id: "cristianojeda/ck5wlv6np0gv11irhsi6ao9al",
  tileSize: 512,
  zoomOffset: -1,
})
var mapa = L.tileLayer("https://gis.argentina.gob.ar/osm/{z}/{x}/{y}.png", {
  attribution:
    '&copy; Contribuidores <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map("map", { layers: [mapa, CDI] }).setView([-40.44, -63.59], 4);
parentGroup.addTo(map);
CDI.addTo(map);
// CDR.addTo(map);
// CIC.addTo(map);
// EEE.addTo(map);
// MDC.addTo(map);
// HUE.addTo(map);
// IM.addTo(map);
// MAY.addTo(map);
// ANP.addTo(map);

var baseMaps = {
  "Mapa": mapa,
  // "Calles": streets,
  // "Satélite": satellite,
  "Barrios Populares": barriospopulares,
  "Barrios Populares AMBA": barriospopularesAMBA
};

const overlayMaps = {
  "Centros de Desarrollo Infantil": CDI,
  "Centros de Referencia": CDR,
  "Centros Integradores Comunitarios": CIC,
  "Establecimientos Educativos Educación": EEE
  // "Consejo Federal de Mayores": MAY,
  // "Instituciones de Microcrédito": IM,
  // "Mercados Solidarios": MDC,
  // "Organismos de Protección Integral": ANP,
  // "Pro Huerta": HUE
};

L.Control.mostrar = L.Control.extend({
  onAdd: function(map) {
    let div1 = L.DomUtil.create("div", "todosdiv");
    let label = L.DomUtil.create("label", "", div1);
    let div2 = L.DomUtil.create("div", "", label);
    let input = L.DomUtil.create("input", "", div2);
    input.type = "checkbox";
    input.checked = true;
    let span = L.DomUtil.create("span", "b", div2);
    label.id = "todos";
    span.textContent = "Mostrar / Ocultar Todos";
    var visible = 1;
    L.DomEvent.on(input, "click", function() {
      if (visible) {
        CDI.remove();
        CDR.remove();
        CIC.remove();
        EEE.remove();        
        // HUE.remove();
        // IM.remove();
        // MAY.remove();
        // ANP.remove();
        // MDC.remove();
        visible = 0;
      } else {
        CDI.addTo(map);
        CDR.addTo(map);
        CIC.addTo(map);
        EEE.addTo(map);
        // HUE.addTo(map);
        // IM.addTo(map);
        // MAY.addTo(map);
        // ANP.addTo(map);
        // MDC.addTo(map);
        visible = 1;
      }
    });
    return div1;
  },
  onRemove: function(map) {}
});
L.control.mostrar = function(opts) {
  return new L.Control.mostrar(opts);
};

L.Control.ubicacion = L.Control.extend({
  onAdd: function(map) {
    var button = L.DomUtil.create("button");
    button.id = "ubicacion";
    L.DomUtil.create("i", "fa fa-map-marker fa-2x azul", button);
    button.style.padding = "0.5em";
    button.title = "Mi Ubicación";
    L.DomEvent.on(button, "click", function() {
      var browserLat;
      var browserLong;
      navigator.geolocation.getCurrentPosition(
        function(position) {
          browserLat = position.coords.latitude;
          browserLong = position.coords.longitude;
          var marker_actual = L.marker([browserLat, browserLong]).addTo(map);
          marker_actual.bindPopup("<b>Usted está aquí<b>").openPopup();
          map.setView([browserLat, browserLong], 16);
        },
        function(err) {
          console.error(err);
        }
      );
    });
    return button;
  },
  onRemove: function(map) {}
});
L.control.ubicacion = function(opts) {
  return new L.Control.ubicacion(opts);
};

L.Control.ampliar = L.Control.extend({
  onAdd: function(map) {
    var button = L.DomUtil.create("button");
    button.id = "ampliar";
    L.DomUtil.create("i", "fa fa-arrows-alt fa-lg azul", button);
    button.style.padding = "0.5em";
    button.title = "Ampliar mapa";
    L.DomEvent.on(button, "click", function() {
      map.setView([-40.44, -63.59], 4);
    });
    return button;
  },
  onRemove: function(map) {}
});
L.control.ampliar = function(opts) {
  return new L.Control.ampliar(opts);
};

L.control.ubicacion({ position: "bottomright" }).addTo(map);
L.control.ampliar({ position: "bottomright" }).addTo(map);
L.control.mostrar({ position: "topright" }).addTo(map);

var collapsedMenu = window.screen.width < 800 ? true : false;

L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: collapsedMenu,
    hideSingleBase: false
  })
  .addTo(map);
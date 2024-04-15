
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );

  let latLing = { lat: 46.619261, lng: -33.134766 }
  let map = new Map(document.getElementById("map"), {
    center: latLing,
    zoom: 3,
  });


  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      map,
      label: labels[i % labels.length]
    });
  });
  
  const markerCluster = new markerClusterer.MarkerClusterer({ markers, map });
};

const locations = [
  { lat: 40.785091, lng: -73.9682 },
  { lat: 41.084045, lng: -73.874245 },
  { lat: 40.754932, lng: -73.984016 },
];



initMap();



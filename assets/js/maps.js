const { Map } = await google.maps.importLibrary("maps");

const map = new Map(document.getElementById("map"), {
    zoom: 5,
    center: {lat: 45.42152967, lng: -75.6971931},
    mapId: "DEMO_MAP_ID"
});
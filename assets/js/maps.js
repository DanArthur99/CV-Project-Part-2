function initMap() {

    const centerMap = {
        lat: 51.454513, 
        long: -2.58791,
    }

    const mapOptions = {
        center: centerMap,
        zoom: 10,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
};
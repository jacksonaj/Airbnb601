var table = document.getElementById("table1");

var xhr = new XMLHttpRequest();

xhr.open('GET', '/json');
xhr.send();
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    let res = JSON.parse(xhr.response);
    console.log(res[0]);

    let i = 0;
    let lat = 0;
    let long = 0;

    res[0].forEach(element => {
      i++;
      lat += parseFloat(element.latitude);
      long += parseFloat(element.longitude);

      var row = table.insertRow(i + 1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = element.name;
      cell2.innerHTML = element.host_name;
      cell3.innerHTML = element.price;
    });



    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([long / i, lat / i]),
        zoom: 10
      })
    });


    res[0].forEach(element => {
      var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(element.longitude), parseFloat(element.latitude)]))
            })
          ]
        })
      });

      layer.setProperties({ 'name': element.name, 'host_name': element.host_name, 'neighbourhood_group': element.neighbourhood_group, 'minimum_nights': element.minimum_nights,
       'room_type': element.room_type, 'number_of_reviews': element.number_of_reviews, 'availability_365': element.availability_365, 'price': element.price});

      map.addLayer(layer);
    });


    map.on("click", function (e) {
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        alert(`Name: ${layer.get('name')}\n
            Host Name: ${layer.get('host_name')}\n
            Neighbourhood Group: ${layer.get('neighbourhood_group')}\n
            Miminum Nights: ${layer.get('minimum_nights')}\n
            Room Type: ${layer.get('room_type')}\n
            Number of Reviews: ${layer.get('number_of_reviews')}\n 
            Availability out of the Year: ${layer.get('availability_365')}\n
            Price: ${layer.get('price')}`);
      })
    });
  } else {
    console.log('The request failed!');
  }
};



function initMap() {
  var mapBoxAccessToken = 'pk.eyJ1IjoibGVpZ2hnaHVudCIsImEiOiJyRzdpd29RIn0.XZy9nQVW6YGhmQF0kRrDSQ'
  var mapBoxTileId = 'leighghunt.b7wkqyiy'
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -41.104286, lng: 175.100565},
    zoom: 18,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'Plan', 'hybrid']
    }
  });

  var retina = window.devicePixelRatio > 1;

  // bounds of the desired area
  var allowedBounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(-41.105676, 175.097031),
       new google.maps.LatLng(-41.102520, 175.103741) 
  );
  
  var lastValidCenter = map.getCenter();
  var lastValidZoom = map.getZoom();
  
  var brownOwlMapBoxTiles = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
        return 'https://a.tiles.mapbox.com/v4/' 
          + mapBoxTileId + '/' 
          + zoom + '/' 
          + coord.x + '/' 
          + coord.y + 
          (retina?'@2x.png':'.webp')
          + '?access_token=' + mapBoxAccessToken;
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 20,
    minZoom: 0,
    radius: 1738000,
    name: 'Plan'
  });
 
  
  map.mapTypes.set('Plan', brownOwlMapBoxTiles);
  map.setMapTypeId('Plan');


  /*
  alreadyCheckingBounds = false;

  function checkPlanBounds(){
    if(alreadyCheckingBounds){
      return;
    }
    
    if(map.getMapTypeId() == 'Plan'){

      alreadyCheckingBounds = true;

      // if (map.getZoom()>=17 && allowedBounds.contains(map.getCenter())) {
      if (allowedBounds.contains(map.getBounds().getNorthEast())
          && allowedBounds.contains(map.getBounds().getSouthWest())) {

        // still within valid bounds, so save the last valid position
        lastValidCenter = map.getCenter();
        lastValidZoom = map.getZoom();
        console.log('good' + lastValidZoom)
        alreadyCheckingBounds = false;
        return; 
      }
      // } else{console.log('doesnt contain centre?')}

      // not valid anymore => return to last valid position
      console.log('nope')
      map.panTo(lastValidCenter);
      map.setZoom(lastValidZoom);
      
      setTimer(function(){alreadyCheckingBounds = false;}, 100);


    }
  }

  map.addListener('zoom_changed', function() {
    console.log('zoom_changed')
    checkPlanBounds()
  });

  map.addListener('center_changed', function() {
    console.log('center_changed')
    checkPlanBounds()
  });

  map.addListener('maptypeid_changed', function() {
    checkPlanBounds()
  });
  */
}

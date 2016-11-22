$('.input').draggable({
        opacity: .4,
        create: function(){$(this).data('position',$(this).position())},
        cursorAt:{left:15},
        cursor:'move',
        start:function(){$(this).stop(true,true)}
   });



function initMap() {
        
          
        // Initialize variables
        var parisCrdnts = {lat: 48.8573214, lng: 2.2960058};
        var coords;
          
        // Create map object
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: parisCrdnts
        });
          
          
        // Create street view object
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
                position: parisCrdnts,
                pov: {
                    heading: 300, 
                    pitch: 20
                }
            });
        map.setStreetView(panorama);
          
          
        // Create variable for address entered
        var input = document.getElementById('address');
          
        // Add autocomplete functionality  
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
          
          
        // ADD LISTENER FOR AUTCOMPLETE
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            if(!place.geometry) {
                window.alert("No deatils available for input: '" + place.name  + "'");
                return;
            }
            
            if(place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(16);  // Why 17? Because it looks good - Google lol
            }
            map.setStreetView(place.geometry.location);
            panorama.setPosition(place.geometry.location);
            
            var address = '';
            
        });
          
      }
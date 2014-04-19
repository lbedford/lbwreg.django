function ShowElementWhenButtonClicked(button_id, element_id) {
  $(button_id).click(function() {
    $(element_id).show();
  });
}

function HideElementWhenButtonClicked(button_id, element_id) {
  $(button_id).click(function() {
    $(element_id).hide();
  });
}

function SetupDeleteHandler(button_id) {
  $(button_id).click(function() {
    $.ajax({
	type: 'POST',
	url: $(button_id).attr('data-url'),
	data: {
	    csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
	},
	success: function(data) {
	  location.assign($(button_id).attr('next-url'));
	},
	error: function(xhr, textStatus, errorThrown) {
	  alert("Please report this error: "+errorThrown+xhr.status+xhr.responseText);
	}
    });
  });
}

function drawMap(url, track_name, div_id) {
  // Start position for the map (hardcoded here for simplicity,
  // but maybe you want to get this from the URL params)
  var map; //complex object of type OpenLayers.Map

  map = new OpenLayers.Map ("map", {
    controls:[
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.PanZoomBar(),
      //new OpenLayers.Control.LayerSwitcher(),
      new OpenLayers.Control.Attribution()],
    maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
    maxResolution: 156543.0399,
    numZoomLevels: 19,
    units: 'm',
    projection: new OpenLayers.Projection("EPSG:900913"),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    theme: null,
  } );

  // Define the map layer
  // Here we use a predefined layer that will be kept up to date with URL changes
  //layerMapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
  //map.addLayer(layerMapnik);
  layerCycleMap = new OpenLayers.Layer.OSM.CycleMap("CycleMap");
  map.addLayer(layerCycleMap);
  //layerMarkers = new OpenLayers.Layer.Markers("Markers");
  //map.addLayer(layerMarkers);

  // Add the Layer with the GPX Track
  var lgpx = new OpenLayers.Layer.Vector(track_name, {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
      url: url,
      format: new OpenLayers.Format.GPX()
    }),
    style: {strokeColor: "green", strokeWidth: 5, strokeOpacity: 0.5},
    projection: new OpenLayers.Projection("EPSG:4326")
  });
  map.addLayer(lgpx);

  // once loaded, zoom to the displayed data.
  lgpx.events.register("loadend", lgpx, function() {
    map.zoomToExtent(lgpx.getDataExtent());
  });

}

$(function() {
  $( ".datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
});

$(function() {
  $( ".datetimepicker" ).datetimepicker({dateFormat: "yy-mm-dd",
                                         timeFormat: "hh:mm:ss"});
});



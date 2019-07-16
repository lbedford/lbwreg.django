// attach show handler to every item with class "show"
function setupShowHandlers() {
  $(".show").click(function () {
    $($(this).attr('data-id')).show();
  });
}

// attach hide handler to every item with class "hide"
function setupHideHandlers(target) {
  $(".hide").click(function () {
    $($(this).attr('data-id')).hide();
  });
}

// attach ajax handler to every item with class "ajax"
function setupAjaxHandlers(target) {
  $(".ajax_call").click(function () {
    next_url = $(this).attr('next-url');
    $.ajax({
      type: 'POST',
      url: $(this).attr('data-url'),
      data: {
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
      },
      success: function (data) {
        if (next_url == null) {
          window.location.reload(true);
        } else {
          location.assign(next_url);
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("Please report this error: " + errorThrown + xhr.status + xhr.responseText);
      }
    });
  });
}

function drawMap(url, track_name, div_id) {
  // Start position for the map (hardcoded here for simplicity,
  // but maybe you want to get this from the URL params)
  var map; //complex object of type OpenLayers.Map

  map = new OpenLayers.Map("map", {
    controls: [
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.PanZoomBar(),
      new OpenLayers.Control.LayerSwitcher(),
      new OpenLayers.Control.Attribution()],
    maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
    maxResolution: 156543.0399,
    numZoomLevels: 19,
    units: 'm',
    projection: new OpenLayers.Projection("EPSG:900913"),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    theme: null,
  });

  // Define the map layer, match the protocol
  layerStreetMap = new OpenLayers.Layer.OSM("OpenCycleMap",
    ["//a.tile.thunderforest.com/cycle/${z}/${x}/${y}.png",
      "//b.tile.thunderforest.com/cycle/${z}/${x}/${y}.png",
      "//c.tile.thunderforest.com/cycle/${z}/${x}/${y}.png"]);
  map.addLayer(layerStreetMap);
  layerMapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
  map.addLayer(layerMapnik);

  // Add the Layer with the GPX Track
  var lgpx = new OpenLayers.Layer.Vector(track_name, {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
      url: url,
      format: new OpenLayers.Format.GPX()
    }),
    style: { strokeColor: "green", strokeWidth: 5, strokeOpacity: 0.5 },
    projection: new OpenLayers.Projection("EPSG:4326")
  });
  map.addLayer(lgpx);

  // once loaded, zoom to the displayed data.
  lgpx.events.register("loadend", lgpx, function () {
    map.zoomToExtent(lgpx.getDataExtent());
  });

}

$(function () {
  $(".datepicker").datepicker({ dateFormat: "yy-mm-dd" });
});

$(function () {
  $(".datetimepicker").datetimepicker({
    dateFormat: "yy-mm-dd",
    timeFormat: "HH:mm:ss"
  });
});


function setupHandlers() {
  setupShowHandlers();
  setupHideHandlers();
  setupAjaxHandlers();
}



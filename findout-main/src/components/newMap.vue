<template>
  <div id="map">
    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  props: {
    start: {
      type: Object,
      required: true
    },
    end: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      platform: null,
      apikey: "eGEbMqmjPEdw473hAUUXR5t_22Ys36iC6n4NfKGCu8Q"
    };
  },
  async mounted() {
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.initializeHereMap(this.start, this.end);
  },
  methods: {
    initializeHereMap(start, end) { 
      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      const maptypes = this.platform.createDefaultLayers();


      const unimarCoordinates = {
    lat: -22.23513460978872,
    lng: -49.96971069370079           
  };
      const map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 16,
        center: unimarCoordinates
      });

      const icon = new H.map.Icon('https://cdn-icons-png.flaticon.com/512/5817/5817087.png', {
        size: { w: 50, h: 50 }
      });

      const startMarker = new H.map.Marker(start, { icon: icon });
      map.addObject(startMarker);

      const startLabel = new H.map.DomIcon(`<div style="color: blue;">Start</div>`);
      const startLabelMarker = new H.map.DomMarker(start, { icon: startLabel });
      map.addObject(startLabelMarker);

      const endMarker = new H.map.Marker(end, { icon: icon });
      map.addObject(endMarker);

      const endLabel = new H.map.DomIcon(`<div style="color: red;">End</div>`);
      const endLabelMarker = new H.map.DomMarker(end, { icon: endLabel });
      map.addObject(endLabelMarker);

      addEventListener("resize", () => map.getViewPort().resize());

      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      H.ui.UI.createDefault(map, maptypes);

      this.addRoute(map, start, end);
    },
    addRoute(map, start, end) {
      const router = this.platform.getRoutingService(null, 8);

      const routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'car',
        origin: `${start.lat},${start.lng}`,
        destination: `${end.lat},${end.lng}`,
        return: 'polyline'
      };

      router.calculateRoute(routeRequestParams, result => {
        if (result.routes.length) {
          result.routes[0].sections.forEach(section => {
            const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

            const routeLine = new H.map.Polyline(linestring, {
              style: { strokeColor: 'blue', lineWidth: 5 }
            });

            map.addObject(routeLine);

            map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
          });
        }
      }, error => {
        console.error(error);
      });
    }
  }
};
</script>

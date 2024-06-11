<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="p-5 col-5 mt-3 bg-info rounded-start">
          <div class="fw-bold lh-1 text-white text-start mb-3" style="font-size: 4.5em;">
            Descubra lugares sem sair de casa...
          </div>
          <h2 class="mb-2 text-white">De onde?</h2>
          <div class="input-group input-group-sm mb-3">
            <input 
              type="text" 
              class="form-control p-2" 
              aria-label=""
              aria-describedby="inputGroup-sizing-sm"
              v-model="startLocation"  
            >
            <button class="input-group-text" id="basic-addon2"><i class="bi bi-pin"></i></button>
          </div>
          <h2 class="mb-2 text-white">Para onde?</h2>
          <div class="input-group input-group-sm mb-3">
            <input 
              type="text" 
              class="form-control p-2" 
              aria-label=""
              aria-describedby="inputGroup-sizing-sm"
              v-model="endLocation" 
            >
            <button class="input-group-text" id="basic-addon2"><i class="bi bi-pin"></i></button>
          </div>
          <button type="button" class="btn btn-light mb-3 text-dark" style="font-size: 1.5em;" @click="searchRoute">
            Buscar <i class="bi bi-search ms-1"></i>
          </button>
        </div>
        <div class="col-7 mt-3 bg-white rounded-end">
          <HereMap ref="hereMap" 
          :key="mapKey" 
          :start="startCoordinates" 
          :end="endCoordinates"
          
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HereMap from '../components/newMap.vue';

export default {
  components: {
    HereMap
  },
  data() {
    return {
      startLocation: '',
      endLocation: '',
      startCoordinates: '',
      endCoordinates:'',
      apiKey: 'eGEbMqmjPEdw473hAUUXR5t_22Ys36iC6n4NfKGCu8Q'
    };
  },
  computed: {
    mapKey() {
      return `${this.startCoordinates.lat}_${this.startCoordinates.lng}_${this.endCoordinates.lat}_${this.endCoordinates.lng}`;
    }
  },
  methods: {
    async searchRoute() {
      if (!this.startLocation || !this.endLocation) {
        alert('Por favor, insira ambos os locais de partida e destino.');
        return;
      }
      
      console.log('antes')
      console.log( this.startCoordinates)
      console.log(this.endCoordinates)
      try {
        const startCoords = await this.getCoordinates(this.startLocation);
        const endCoords = await this.getCoordinates(this.endLocation);

        if (startCoords && endCoords) {
          this.startCoordinates = startCoords;
          this.endCoordinates = endCoords;

          this.displayRoute(startCoords, endCoords);
        } else {
          alert('Não foi possível encontrar coordenadas para os locais fornecidos.');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        alert('Ocorreu um erro ao buscar as coordenadas.');
      }
    },
    async getCoordinates(location) {
      if (!location) return null;

      const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(location)}&apiKey=${this.apiKey}`;
      try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
          const position = response.data.items[0].position;
          return { lat: position.lat, lng: position.lng };
        } else {
          console.error('No coordinates found for location:', location);
          return null;
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
      }
    },
    async displayRoute(startCoords, endCoords) {
      const route = await this.calculateRoute(startCoords, endCoords);
      this.startCoordinates = route[0]
      this.endCoordinates = route[1]

      console.log('depois')
      console.log( this.startCoordinates)
      console.log(this.endCoordinates)
    },
    async calculateRoute(startCoords, endCoords) {
      return [startCoords, endCoords];
    }
    
  }
};
</script>


<template>
  <div class="container">
    <h2 class="mt-3 fs-1 text-center">Conheça nossa equipe</h2>
  </div>
  <div class="container">
    <div class="row mt-5">

      <div class="col-auto" :key="index" v-for="(member, index) in members">
        <div class="card text-bg-info" style="width: 18rem;">
          <img :src="member.image" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ member.name }}</h5>
            <p class="card-text">RA: {{ member.ra }}</p>
          </div>
          <div class="card-footer">
            <p>{{ member.area }}</p>
          </div>
        </div>
     </div>

    </div> 
  </div>

  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  },
  data: () => ({
    members: [
      {
        name: 'Vitor Euflauzino',
        ra: '1982199',
        area: 'Dev. Front-End',
        image: 'https://i.ibb.co/wRjshFk/vitor-hugo.png'
      },
      {
        name: 'Matheus Machado',
        ra: '1982439',
        area: 'Dev. Front-End',
        image: 'https://i.ibb.co/v3DXNxN/matheus-machado.png'
      },
      {
        name: 'Lucas Raineri',
        ra: '1982251',
        area: 'Dev. Back-End',
        image: 'https://i.ibb.co/p36Qr8m/lucas-raineri.jpg'
      },
      {
        name: 'Ayrton Lima',
        ra: '1957939',
        area: 'Dev. Back-End',
        image: 'https://i.ibb.co/cQtnYkk/ayrton-lima.jpg'
      },
      {
        name: 'Vinicius Tamae',
        ra: '1982153',
        area: 'Dev. Back-End',
        image: 'https://i.ibb.co/rFjt2nR/vinicius-tamae.jpg'
      }
    ]
  }),
}
</script>

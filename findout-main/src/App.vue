<script setup>
import {ref} from 'vue'
</script>

<template>
  
  <Navbar/>

  <div class="main">
    <router-view></router-view>
  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },  
}
</script>


<style>

body {
    background-color: #edece8;
}

</style>
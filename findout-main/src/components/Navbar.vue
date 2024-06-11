<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img src="@/assets/images/icon.png" alt="Logo" width="50" height="50" class="me-2">
            <router-link class="nav-link fs-4 text-decoration-none text-info fw-bold" to="/">FindOut</router-link>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link fs-5 text-decoration-none text-info" to="/about">Sobre</router-link>
              </li>
              <li class="nav-item" v-if="currentPath !== 'login' && !logged">
                <router-link class="nav-link fs-5 text-decoration-none text-info" to="/login">Login</router-link>
              </li>
              <li class="nav-item" v-if="currentPath === 'login' && !logged">
                <router-link class="nav-link fs-5 text-decoration-none text-info" to="/register">Registro</router-link>
              </li>
              <li class="nav-item" v-if="logged" @click="logout()">
                <router-link class="nav-link fs-5 text-decoration-none text-info" to="/login">Logout</router-link>
              </li>              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
</template>
  
<script>
  export default {
    name: "Navbar",
    computed: {
      currentPath() {
        return this.$route.path.substring(1);
      },
      logged() {
        return localStorage.getItem('logged') ===  'true' ? true : false
      }
    },
    methods: {
      logout() {
        localStorage.setItem('logged', false)
        this.$router.push('/login');
      }
    }
  };
</script>
  
  <style>
  .navbar {
    padding: 1rem;
  }
  
  .nav-link {
    margin-right: 1rem;
  }
  
  .navbar-brand img {
    border-radius: 50%;
  }
  
  .navbar-collapse {
    justify-content: space-between;
  }
  
  .navbar-toggler {
    border-color: rgba(0, 123, 255, 0.5);
  }
  
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 123, 255, 0.5)' stroke-width='2' linecap='round' linejoin='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
  </style>
  
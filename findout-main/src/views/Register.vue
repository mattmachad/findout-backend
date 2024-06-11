<template>
  <div class="container d-flex justify-content-center align-items-center my-3">
    <div class="row w-100">
      <div class="p-5 col-md-5 bg-info rounded-start">
        <div class="fw-bold lh-1 text-white text-start mb-3" style="font-size: 4.5em;">
          Registre-se
          <hr class="border border-white border-3 bg-white">
        </div>
        <h2 class="mb-2 text-white">Usuário</h2>
        <div class="input-group input-group-sm mb-3">
          <input
            v-model="user.username"
            type="text" 
            class="form-control p-2" 
            aria-label=""
            name="name"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Crie um usuário"
          >
        </div>
        <h2 class="mb-2 text-white">Email</h2>
        <div class="input-group input-group-sm mb-3">
          <input
            v-model="user.email"
            type="text" 
            class="form-control p-2" 
            aria-label=""
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Crie um email"
          >
        </div>
        <h2 class="mb-2 text-white">Senha</h2>
        <div class="input-group input-group-sm mb-3">
          <input
            v-model="user.password"
            :type="visibility ? 'text' : 'password'" 
            class="form-control p-2" 
            aria-label=""
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Crie uma senha"
          >
        </div>
        <h2 class="mb-2 text-white">Confirme a Senha</h2>
        <div class="input-group input-group-sm mb-3">
          <input 
            v-model="confirmPassword"
            :type="visibility ? 'text' : 'password'" 
            class="form-control p-2" 
            aria-label=""
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Digite sua senha novamente"
          >
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="form-check">
            <input 
              class="form-check-input" 
              type="checkbox" 
              id="flexCheckIndeterminate" 
              v-model="visibility"
            />
            <label 
              class="form-check-label text-black" 
              for="flexCheckIndeterminate"
            >
              Exibir senha
            </label>
          </div>
          <button @click="register()" type="button" class="btn btn-light text-dark" style="font-size: 1.5em;">
            Registrar
          </button>
        </div>
      </div>
      <div class="col-md-7 bg-white rounded-end d-flex align-items-center justify-content-center">
        <img src="../assets/images/loginAndRegister/register.webp" alt="" class="img-fluid" style="max-width: 80%;">
      </div>
    </div>

    <div :class="'alert alert-' + alertInfo.color" style="position: fixed; bottom: 1em; right: 1em;" role="alert" v-if="alertActivate">
      {{alertInfo.text}}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        nome: '',
        senha: '',
        email: '' 
      },
      confirmPassword: '',
      visibility: false,
      alertInfo: {
        text: '',
        color: ''
      },
      alertActivate: false
    };
  },
  methods: {
    async register() {
      if (this.user.password !== this.confirmPassword) {
        this.alertInfo.text = 'As senhas não coincidem!';
        this.alertInfo.color = 'danger';
        this.alertActivate = true;
        return;
      }

      try {
        const response = await axios.post('https://localhost:7290/api/v1.0/usuarios', {
          nome: this.user.username, 
          senha: this.user.password,
          email: this.user.email
        });
        
        this.alertInfo.text = 'Registro bem-sucedido!';
        this.alertInfo.color = 'success';
        this.alertActivate = true;
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        this.alertInfo.text = 'Erro ao registrar usuário. Por favor, tente novamente.';
        this.alertInfo.color = 'danger';
        this.alertActivate = true;
      }
    }
  }
}
</script>


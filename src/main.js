import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')



if (!localStorage.getItem('allUsers')) {
    const user = [
        {
            username: "Admin",
            password: "senha123"
        }
    ];
    
    localStorage.setItem('allUsers', JSON.stringify(user));
}

if (!localStorage.getItem('logged')) {
    localStorage.setItem('logged', false);
}

<template>
    <footer class="text-center bg-body-tertiary mt-5">
        <div class="container pt-1">
            <section class="mb-4">

                <div class="fs-3 col-auto">Nosso trabalho é um sistema de GPS e cálculo de rotas, totalmente
                    gratuito!
                </div>

            </section>
        </div>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
            © {{ currentYear }} Copyright:
            <router-link class="text-body" to="/">findout.com.br</router-link>
        </div>
    </footer>
</template>

<script>

export default {
    computed: {
        currentYear() {
            const date = new Date();
            return date.getFullYear();
        }
    },
}
</script>

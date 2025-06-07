<template>
    <div class="relative w-full h-80 sm:h-100 overflow-hidden rounded-lg shadow-lg">
        <div v-for="(banner, index) in banners" :key="index"
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :class="{ 'opacity-100 z-10': index === current, 'opacity-0 z-0': index !== current }">
            <img :src="banner.image" :alt="banner.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 class="text-white text-xl sm:text-3xl font-bold">{{ banner.title }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const banners = [
    {
        title: 'Perfumes icônicos que definem sua personalidade',
        image: '/src/assets/img/banners/banner1.jpg',
    },
    {
        title: 'Brilhe com estilo — Maquiagens com até 80% OFF!',
        image: 'src/assets/img/banners/banner2.avif',
    },
    {
        title: 'O melhor presente: perfumes para ele e para ela',
        image: 'src/assets/img/banners/banner3.png',
    },
]

const current = ref(0)
let interval

onMounted(() => {
    interval = setInterval(() => {
        current.value = (current.value + 1) % banners.length
    }, 5000)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<style scoped>
/* Evita que imagens anteriores fiquem clicáveis */
div[style*="opacity: 0"] {
    pointer-events: none;
}
</style>

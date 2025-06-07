<template>

    <div class="min-h-screen bg-gradient-to-b from-pink-50 to-white rounded-lg shadow">
        <div class="container mx-auto px-4">

            <h1 class="text-3xl font-bold text-pink-600 text-center">Produtos de Beleza</h1>
            <p class="text-gray-600 text-center mt-2">
                A essência da sua personalidade em cada fragrância.
            </p>
        </div>

        <main class="container mx-auto px-4 py-8">

            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
                {{ error }}
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="product in products.slice(0, 4)" :key="product.id"
                    class="bg-white rounded shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col">

                    <div class="relative h-48 w-full">
                        <router-link :to="`/product/${product.id}`">
                            <img :src="product.thumbnail || '/placeholder.svg'" :alt="product.title"
                                class="object-cover w-full h-full" />
                        </router-link>

                        <button @click="toggleFavorito(product)" class="absolute top-4 right-4 z-10"
                            :aria-label="isFavorito(product) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
                            <svg v-if="isFavorito(product)" xmlns="http://www.w3.org/2000/svg" fill="#ff0000"
                                viewBox="0 0 24 24" class="w-7 h-7">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-width="2"
                                viewBox="0 0 24 24" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>

                        <span v-if="product.discountPercentage > 0"
                            class="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded">
                            {{ Math.round(product.discountPercentage) }}% OFF
                        </span>
                    </div>

                    <div class="p-4 flex-1 flex flex-col">
                        <div class="flex items-center justify-between mb-2">

                            <span class="inline-block border border-pink-200 text-pink-600 text-xs rounded px-2 py-0.5">
                                {{ product.brand }}
                            </span>

                            <div class="flex items-center">
                                <span v-for="i in 5" :key="i">
                                    <svg v-if="i <= Math.floor(product.rating)"
                                        class="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <svg v-else class="h-4 w-4 text-gray-300" viewBox="0 0 24 24">
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </span>
                                <span class="text-xs text-gray-500 ml-1">({{ product.rating }})</span>
                            </div>
                        </div>

                        <h2 class="text-lg font-semibold mb-1 truncate">{{ product.title }}</h2>
                        <p class="text-gray-600 text-sm line-clamp-2 mb-2">{{ product.description }}</p>

                        <div class="flex items-end gap-2 mb-4">
                            <span class="text-xl font-bold text-pink-600">
                                ${{ discountedPrice(product.price, product.discountPercentage) }}
                            </span>
                            <span v-if="product.discountPercentage > 0" class="text-sm text-gray-500 line-through">
                                ${{ product.price }}
                            </span>
                        </div>

                        <div class="flex flex-wrap justify-between items-center gap-2 mt-auto">
                            <span class="text-sm text-gray-500">
                                {{ product.stock > 0 ? product.stock + ' em estoque' : 'Esgotado' }}
                            </span>
                            <button
                                class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition hover:scale-105"
                                @click="adicionarCarrinho(product)">
                                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>


<script setup>

import { ref, onMounted } from "vue"
import { adicionarCarrinho } from '/src/assets/js/cartStore.js'
import { toggleFavorito, favoritos } from '/src/assets/js/favoritoStore.js'


const products = ref([])
const loading = ref(true)
const error = ref("")

function discountedPrice(price, discountPercentage) {
    return (price - (price * discountPercentage) / 100).toFixed(2)
}

function isFavorito(product) {
    return favoritos.value.some(f => f.id === product.id)
}

onMounted(async () => {
    loading.value = true
    error.value = ""
    try {
        const fragrancesResponse = await fetch("https://dummyjson.com/products/category/fragrances")
        const fragrancesData = await fragrancesResponse.json()
        products.value = [...fragrancesData.products]
    } catch (err) {
        error.value = "Não foi possível carregar os produtos. Tente novamente mais tarde."
    } finally {
        loading.value = false
    }
})
</script>
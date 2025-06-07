<template>
    <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-white rounded-lg shadow-inner flex flex-col">
        <div class="w-full bg-white border-b border-pink-100 px-6 py-4 shadow-md flex flex-col items-center">
            <h2 class="text-4xl font-bold text-pink-600 mb-2 flex items-center gap-2">
                Categorias
            </h2>
            <div class="flex flex-wrap gap-2 justify-center pt-2">
                <button v-for="cat in categorias" :key="cat" @click="selecionarCategoria(cat)" :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition duration-200',
                    categoriaSelecionada === cat
                        ? 'bg-pink-600 text-white shadow'
                        : 'bg-pink-50 hover:bg-pink-100 text-pink-700'
                ]">
                    {{ cat }}
                </button>
            </div>
        </div>

        <main class="flex-1 p-8 bg-gradient-to-br from-white to-pink-50">
            <h1 class="text-4xl font-bold text-pink-700 text-center mb-1">
                {{ categoriaSelecionada || 'Escolha uma categoria' }}
            </h1>
            <p v-if="categoriaSelecionada" class="text-gray-500 text-center mb-8">
                Veja os melhores produtos de <span class="font-medium">{{ categoriaSelecionada }}</span>!
            </p>

            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center mb-6">
                {{ error }}
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">

                    <div class="relative h-48">
                        <router-link :to="`/product/${product.id}`">
                            <img :src="product.thumbnail || '/placeholder.svg'" :alt="product.title"
                                class="object-cover w-full h-full" />
                        </router-link>
                        <button @click="toggleFavorito(product)"
                            class="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:scale-105 transition"
                            :aria-label="isFavorito(product) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
                            <svg v-if="isFavorito(product)" xmlns="http://www.w3.org/2000/svg" fill="#ff0000"
                                viewBox="0 0 24 24" class="w-6 h-6">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
                3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0
                3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-width="2"
                                viewBox="0 0 24 24" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36
                  2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74
                  0 3.41.81 4.5 2.09C13.09 3.81 14.76 3
                  16.5 3 19.58 3 22 5.42 22 8.5c0
                  3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        <span v-if="product.discountPercentage > 0"
                            class="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                            {{ Math.round(product.discountPercentage) }}% OFF
                        </span>
                    </div>

                    <div class="p-4 flex flex-col flex-1">
                        <div class="flex justify-between items-center mb-2">
                            <span
                                class="text-xs bg-pink-100 text-pink-600 border border-pink-200 rounded-full px-2 py-0.5 uppercase">
                                {{ product.brand }}
                            </span>
                            <div class="flex items-center">
                                <span v-for="i in 5" :key="i">
                                    <svg v-if="i <= Math.floor(product.rating)"
                                        class="h-4 w-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
                      12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <svg v-else class="h-4 w-4 text-gray-300" viewBox="0 0 24 24">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
                      12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </span>
                                <span class="text-xs text-gray-500 ml-1">({{ product.rating }})</span>
                            </div>
                        </div>

                        <h2 class="text-base font-semibold truncate mb-1">{{ product.title }}</h2>
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>

                        <div class="flex items-center gap-2 mb-3">
                            <span class="text-lg font-bold text-pink-600">
                                ${{ discountedPrice(product.price, product.discountPercentage) }}
                            </span>
                            <span v-if="product.discountPercentage > 0" class="text-sm text-gray-500 line-through">
                                ${{ product.price }}
                            </span>
                        </div>

                        <div class="flex justify-between items-center mt-auto">
                            <span class="text-sm text-gray-500">
                                {{ product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado' }}
                            </span>
                            <button
                                class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium shadow hover:scale-105 transition"
                                @click="adicionarCarrinho(product)">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2"
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
import { ref } from "vue"
import { adicionarCarrinho } from '/src/assets/js/cartStore.js'
import { toggleFavorito, favoritos } from '/src/assets/js/favoritoStore.js'

const categorias = ref([
    "beauty",
    "fragrances",
    "skincare",
])
const categoriaSelecionada = ref(null)
const products = ref([])
const error = ref("")

function discountedPrice(price, discountPercentage) {
    return (price - (price * discountPercentage) / 100).toFixed(2)
}
function isFavorito(product) {
    return favoritos.value.some(f => f.id === product.id)
}
function selecionarCategoria(cat) {
    categoriaSelecionada.value = cat
    buscarProdutos(cat)
}
async function buscarProdutos(cat) {
    products.value = []
    error.value = ""
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${cat}`)
        const data = await res.json()
        products.value = data.products
    } catch (err) {
        error.value = "Não foi possível carregar os produtos."
    }
}
</script>
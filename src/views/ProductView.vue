<template>
    <div>
        <div v-if="loading" class="text-center text-pink-600 font-semibold p-6">
            Carregando produto...
        </div>

        <div v-else-if="error" class="text-center text-red-600 font-semibold p-6">
            {{ error }}
        </div>

        <div v-else
            class="grid md:grid-cols-2 gap-0 md:gap-8 mb-12 bg-gradient-to-b from-pink-200 to-white rounded-2xl shadow-lg p-0 md:p-6">
            <div
                class="flex justify-center items-center bg-white rounded-l-2xl md:rounded-xl shadow-lg p-6 md:p-8 border-r border-pink-100">
                <img :src="product.thumbnail" :alt="product.title"
                    class="object-contain w-64 h-64 md:w-80 md:h-80 rounded-xl border-4 border-pink-100 shadow transition-transform duration-300 hover:scale-105" />
            </div>

            <div class="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
                <nav class="text-xs text-gray-400 mb-2">
                    <router-link to="/" class="hover:underline">Início</router-link> /
                    <span class="text-pink-600">{{ product.title }}</span>
                </nav>

                <h1 class="text-3xl md:text-4xl font-extrabold text-pink-600 mb-2 drop-shadow text-left">
                    {{ product.title }}
                </h1>

                <span v-if="product.brand"
                    class="text-pink-400 font-semibold text-xs uppercase tracking-widest mb-2 block">
                    {{ product.brand }}
                </span>

                <p class="text-gray-700 text-base md:text-lg mb-4 leading-relaxed text-justify">
                    {{ product.description }}
                </p>

                <div class="flex items-center mb-2">
                    <span class="text-yellow-400 mr-2 flex">
                        <svg v-for="n in Math.round(product.rating)" :key="n" class="inline w-5 h-5" fill="currentColor"
                            viewBox="0 0 20 20">
                            <polygon
                                points="9.9,1.1 12.3,6.6 18.2,7.3 13.8,11.2 15.1,17 9.9,14 4.7,17 6,11.2 1.6,7.3 7.5,6.6" />
                        </svg>
                    </span>
                    <span class="text-gray-600 text-sm font-medium">({{ product.rating }})</span>
                </div>

                <div class="flex items-center gap-4 mb-2">
                    <span class="text-sm font-medium" :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'">
                        <span v-if="product.stock > 0">Em estoque: {{ product.stock }}</span>
                        <span v-else>Esgotado</span>
                    </span>
                    <span class="text-xs text-gray-500 font-semibold">Frete grátis para compras acima de R$ 100</span>
                </div>

                <span class="text-pink-600 font-extrabold text-3xl md:text-4xl mb-4 drop-shadow block">
                    R$
                    {{
                        product.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                        })
                    }}
                </span>

                <div class="flex gap-4 mt-4">
                    <button
                        class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold shadow
                         transition-all duration-200 flex items-center gap-2" @click="adicionarCarrinho(product)">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Adicionar ao Carrinho
                    </button>
                    <button
                        class="bg-white border border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-semibold shadow 
                        hover:bg-pink-50 transition-all duration-200">
                        <img src="/src/assets/img/favoritos.png" alt="" class="inline w-5 h-5 mr-2" />
                        Lista de Desejos
                    </button>
                </div>
            </div>
        </div>

        <div v-if="similarProducts.length" class="mt-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-pink-600 text-center">Produtos similares</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="prod in similarProducts" :key="prod.id"
                    class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <img :src="prod.thumbnail" :alt="prod.title" class="w-24 h-24 object-contain mb-2" />
                    <div class="font-semibold text-center mb-1">{{ prod.title }}</div>
                    <div class="text-pink-600 font-bold mb-2">
                        R$ {{ discountedPrice(prod.price, prod.discountPercentage) }}
                    </div>
                    <router-link :to="`/product/${prod.id}`" class="text-pink-600 hover:underline text-sm">
                        Ver detalhes
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { cart, adicionarCarrinho } from '/src/assets/js/cartStore.js'

const route = useRoute()
const product = ref({})
const loading = ref(true)
const error = ref('')
const similarProducts = ref([])

function discountedPrice(price, discountPercentage) {
    return (price - (price * discountPercentage) / 100).toFixed(2)
}

async function fetchProduct() {
    loading.value = true
    error.value = ''
    try {
        const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
        if (!res.ok) throw new Error('Produto não encontrado')
        product.value = await res.json()

        const resSimilar = await fetch(`https://dummyjson.com/products/category/${product.value.category}`)
        const dataSimilar = await resSimilar.json()
        similarProducts.value = dataSimilar.products
            .filter(p => p.id !== product.value.id)
            .slice(0, 4)
    } catch (err) {
        error.value = 'Não foi possível carregar o produto.'
    } finally {
        loading.value = false
    }
}

onMounted(fetchProduct)

watch(() => route.params.id, fetchProduct)
</script>
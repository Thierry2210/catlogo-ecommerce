<template>
  <header class="bg-gray-500 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <router-link to="/" class="flex items-center">
          <h1 class="text-pink-600 font-bold text-xl transition-transform motion-safe:hover:scale-110">
            BeautySkin
          </h1>
        </router-link>

        <button @click="isOpen = !isOpen"
          class="sm:hidden text-black focus:outline-none focus:ring-2 focus:ring-green-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="hidden sm:block flex-1 max-w-md mx-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/src/assets/img/lupa.png" alt="Buscar" class="w-5 h-5 text-gray-400" />
            </div>
            <input v-model="searchTerm" type="text" placeholder="Buscar produtos..." @focus="showResults = true"
              @blur="showResults = false"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400">
            <div v-if="searchResults.length && showResults"
              class="absolute z-50 bg-white w-full mt-1 rounded shadow max-h-60 overflow-auto">
              <ul>
                <li v-for="product in searchResults" :key="product.id"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  @mousedown.prevent="router.push(`/product/${product.id}`)">
                  {{ product.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="hidden sm:flex items-center space-x-4 text-black">
          <router-link to="/login" class="flex items-center hover:text-pink-600 motion-safe:hover:scale-110">
            <img src="/src/assets/img/perfil.png" alt="Entrar" class="w-6 h-6 mr-1" />
            <span class="text-sm">Entrar/Cadastrar</span>
          </router-link>

          <router-link to="/likeds" class="flex items-center hover:text-pink-600 motion-safe:hover:scale-110 relative">
            <img src="/src/assets/img/favoritos.png" alt="Favoritos" class="w-5 h-5 mr-1" />
            <span class="text-sm">Favoritos</span>
            <span v-if="favoritosCount > 0"
              class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {{ favoritosCount }}
            </span>
          </router-link>

          <router-link to="/cart" class="flex items-center hover:text-pink-600 motion-safe:hover:scale-110 relative">
            <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-1" />
            <span class="text-sm">Carrinho</span>
            <span v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {{ cartCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-show="isOpen" class="sm:hidden bg-gray-400 px-4 pb-4">

      <div class="relative mt-2 mb-4">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="/src/assets/img/lupa.png" alt="Buscar" class="w-5 h-5 text-gray-400" />
        </div>
        <input v-model="searchTerm" type="text" placeholder="Buscar produtos..." @focus="showResults = true"
          @blur="showResults = false"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-400" />
        <div v-if="searchResults.length && showResults"
          class="absolute z-50 bg-white w-full mt-1 rounded shadow max-h-60 overflow-auto">
          <ul>
            <li v-for="product in searchResults" :key="product.id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @mousedown.prevent="router.push(`/product/${product.id}`)">
              {{ product.title }}
            </li>
          </ul>
        </div>
      </div>

      <div class="space-y-3 text-black text-sm">
        <router-link to="/login" class="flex items-center hover:text-pink-600">
          <img src="/src/assets/img/perfil.png" alt="Entrar" class="w-6 h-6 mr-2" />
          Entrar/Cadastrar
        </router-link>

        <router-link to="/likeds" class="flex items-center hover:text-pink-600 relative">
          <img src="/src/assets/img/favoritos.png" alt="Favoritos" class="w-5 h-5 mr-2" />
          Favoritos
          <span v-if="favoritosCount > 0"
            class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5">
            {{ favoritosCount }}
          </span>
        </router-link>

        <router-link to="/cart" class="flex items-center hover:text-pink-600 relative">
          <img src="/src/assets/img/carrinho-de-compras.png" alt="Carrinho" class="w-5 h-5 mr-2" />
          Carrinho
          <span v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5">
            {{ cartCount }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { cart } from '/src/assets/js/cartStore.js'
import { favoritos } from '/src/assets/js/favoritoStore.js'

const isOpen = ref(false)
const searchTerm = ref('')
const searchResults = ref([])
const showResults = ref(false)
const router = useRouter()

async function fetchProducts(query) {
  if (!query) {
    searchResults.value = []
    return
  }
  const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
  const data = await res.json()
  searchResults.value = data.products || []
}

watch(searchTerm, (newTerm) => {
  fetchProducts(newTerm)
})

const favoritosCount = computed(() =>
  favoritos.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
)
</script>
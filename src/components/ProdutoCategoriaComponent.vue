<template>
  <!-- Container principal com fundo gradiente -->
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Título -->
      <h1 class="text-3xl font-bold text-pink-600 text-center">Filtrar por Categoria</h1>
      <p class="text-gray-600 text-center mt-2 mb-6">
        Escolha uma categoria para ver os produtos
      </p>

      <!-- Botões de categorias -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="filterByCategory(cat)"
          class="px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition"
        >
          {{ formatCategory(cat) }}
        </button>
        <!-- Botão para mostrar todos -->
        <button
          @click="showAll"
          class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
        >
          Todas
        </button>
      </div>

      <!-- Mensagem de erro, se houver -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
        {{ error }}
      </div>

      <!-- Lista de produtos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <!-- Imagem e link -->
          <div class="relative h-48 w-full">
            <router-link :to="`/product/${product.id}`">
              <img
                :src="product.thumbnail || '/placeholder.svg'"
                :alt="product.title"
                class="object-cover w-full h-full"
              />
            </router-link>
            <!-- Badge de desconto -->
            <span
              v-if="product.discountPercentage > 0"
              class="absolute top-2 right-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded"
            >
              {{ Math.round(product.discountPercentage) }}% OFF
            </span>
          </div>

          <!-- Informações do produto -->
          <div class="p-4 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <!-- Marca -->
              <span class="text-xs text-pink-600 border border-pink-200 rounded px-2 py-0.5">
                {{ product.brand }}
              </span>

              <!-- Avaliação com estrelas -->
              <div class="flex items-center">
                <span v-for="i in 5" :key="i">
                  <svg
                    v-if="i <= Math.floor(product.rating)"
                    class="h-4 w-4 fill-yellow-400 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-4 w-4 text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  </svg>
                </span>
                <span class="text-xs text-gray-500 ml-1">({{ product.rating }})</span>
              </div>
            </div>

            <!-- Nome e descrição -->
            <h2 class="text-lg font-semibold mb-1 truncate">{{ product.title }}</h2>
            <p class="text-gray-600 text-sm line-clamp-2 mb-2">{{ product.description }}</p>

            <!-- Preços -->
            <div class="flex items-end gap-2 mb-4">
              <span class="text-xl font-bold text-pink-600">
                ${{ discountedPrice(product.price, product.discountPercentage) }}
              </span>
              <span
                v-if="product.discountPercentage > 0"
                class="text-sm text-gray-500 line-through"
              >
                ${{ product.price }}
              </span>
            </div>

            <!-- Estoque e botão -->
            <div class="flex justify-between items-center mt-auto">
              <span class="text-sm text-gray-500">
                {{ product.stock > 0 ? product.stock + ' em estoque' : 'Esgotado' }}
              </span>
              <button
                class="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded flex items-center text-sm transition hover:scale-105"
              >
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
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
    </div>
  </div>
</template>

<script setup>
// Importa recursos do Vue
import { ref, onMounted } from 'vue'

// Criando variáveis reativas
const categories = ref([])         // Lista de categorias
const allProducts = ref([])        // Todos os produtos
const filteredProducts = ref([])   // Produtos filtrados por categoria
const error = ref('')              // Erro, se houver

// Função para mostrar nome da categoria formatado (ex: skincare → Skincare)
function formatCategory(cat) {
  if (typeof cat !== 'string') return ''
  return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')
}

// Função para calcular o valor com desconto aplicado
function discountedPrice(price, discountPercentage) {
  return (price - (price * discountPercentage) / 100).toFixed(2)
}

// Quando o componente carrega
onMounted(async () => {
  try {
    // Carrega as categorias
    const catRes = await fetch('https://dummyjson.com/products/categories')
    categories.value = await catRes.json()

    // Carrega todos os produtos
    const prodRes = await fetch('https://dummyjson.com/products')
    const prodData = await prodRes.json()
    allProducts.value = prodData.products
    filteredProducts.value = prodData.products
  } catch (err) {
    error.value = 'Não foi possível carregar os produtos ou categorias.'
  }
})

// Quando clicamos em uma categoria
async function filterByCategory(category) {
  try {
    error.value = ''
    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    const data = await res.json()
    filteredProducts.value = data.products
  } catch (err) {
    error.value = 'Erro ao filtrar produtos.'
  }
}

// Botão “Todas” para mostrar todos os produtos de novo
function showAll() {
  filteredProducts.value = allProducts.value
}
</script>

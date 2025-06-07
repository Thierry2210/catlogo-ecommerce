<template>
  <!-- #container-principal -->
  <div class="container bg-gray-200 px-4 md:px-6 rounded-lg shadow">

    <!-- #titulo-e-subtitulo -->
    <div class="flex flex-col items-center justify-center text-center space-y-4">
      <h1 class="text-2xl sm:text-3xl text-pink-600 font-bold mt-4">Produtos em Destaque</h1>
      <p class="text-lg text-gray-800">Os produtos mais vendidos e bem avaliados pelos nossos clientes</p>
    </div>

    <!-- #grid-destaques -->
    <div class="mx-auto grid max-w-4xl gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
      <!-- #card-produto -->
      <div v-for="(produto, idx) in produtos.slice(0, 3)" :key="idx"
        class="bg-white rounded shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col">

        <!-- #imagem-produto -->
        <router-link :to="`/product/${produto.id || idx}`">
          <div class="relative h-48 w-full">
            <img :src="produto.imagem" :alt="produto.nome" class="object-cover w-full h-full" />
            <span v-if="produto.destaque"
              class="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {{ produto.destaque }}
            </span>
          </div>
        </router-link>
        
        <!-- #info-produto -->
        <div class="p-4 flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <!-- #marca-ou-categoria -->
            <span class="inline-block border border-pink-200 text-pink-600 text-xs rounded px-2 py-0.5">
              {{ produto.marca || produto.categoria || 'Beleza' }}
            </span>
            <!-- #avaliacoes -->
            <div class="flex items-center">
              <span v-for="i in 5" :key="i">
                <svg v-if="i <= Math.floor(produto.avaliacoes)" class="h-4 w-4 fill-yellow-400 text-yellow-400"
                  viewBox="0 0 24 24">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <svg v-else class="h-4 w-4 text-gray-300" viewBox="0 0 24 24">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <span class="text-xs text-gray-500 ml-1">({{ produto.avaliacoes }})</span>
            </div>
          </div>

          <!-- #nome-produto -->
          <h3 class="text-base font-bold mb-1 truncate">{{ produto.nome }}</h3>

          <!-- #preco-produto -->
          <div class="flex items-end gap-2 mb-4">
            <span class="text-lg font-bold text-pink-600">{{ produto.preco }}</span>
            <span class="text-xs text-gray-500 line-through">{{ produto.precoAntigo }}</span>
          </div>

          <!-- #botao-comprar -->
          <button
            class="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors mt-auto motion-safe hover:scale-105">
            Comprar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// #imports
import { ref, onMounted } from "vue";
import axios from "axios";

// #produtos-reactivo
const produtos = ref([]);

// #busca-produtos
onMounted(async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=10");
    produtos.value = response.data.products.map(produto => ({
      id: produto.id, // Corrigido para garantir o id
      nome: produto.title,
      imagem: produto.thumbnail,
      destaque: produto.category,
      avaliacoes: produto.rating,
      preco: `R$ ${produto.price.toFixed(2)}`,
      precoAntigo: `R$ ${(produto.price * 1.2).toFixed(2)}`,
      marca: produto.brand,
      categoria: produto.category
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
});
</script>
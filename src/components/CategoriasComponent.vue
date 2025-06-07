<template>
  <div class="flex flex-wrap gap-3 justify-center my-4">
    <button v-for="cat in categories" :key="cat" @click="$emit('select-category', cat)"
      class="px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200">
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products/categories')
  categories.value = await res.json()
})
</script>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BannerComponent from "@/components/BannerComponent.vue";
import DestaqueComponent from "@/components/DestaqueComponent.vue";
import ProdutoComponent from "@/components/ProdutoComponent.vue";
// import ProdutoCategoriaComponent from "@/components/ProdutoCategoriaComponent.vue";
</script>

<template>
  <div class="space-y-8">
    <BannerComponent />
    <DestaqueComponent />
    <ProdutoComponent />
    <!-- <ProdutoCategoriaComponent /> -->
  </div>
</template>
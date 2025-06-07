import { ref } from 'vue'

export const favoritos = ref(JSON.parse(localStorage.getItem('favoritos') || '[]'))

export function toggleFavorito(produto) {
  const idx = favoritos.value.findIndex(p => p.id === produto.id)
  if (idx >= 0) {
    favoritos.value.splice(idx, 1)
  } else {
    favoritos.value.push(produto)
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}

// Sincroniza entre abas
window.addEventListener('storage', () => {
  favoritos.value = JSON.parse(localStorage.getItem('favoritos') || '[]')
})
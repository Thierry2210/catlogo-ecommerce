import { ref } from 'vue'

export const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

export function adicionarCarrinho(produto) {
    const found = cart.value.find(item => item.idProduto === produto.idProduto)
    const qtd = produto.quantity || 1
    if (found) {
        found.quantity = (found.quantity || 1) + qtd
    } else {
        cart.value.push({ ...produto, quantity: qtd })
    }
    localStorage.setItem('cart', JSON.stringify(cart.value))
}

export function removerCarrinho(index) {
    if (cart.value[index].quantity > 1) {
        cart.value[index].quantity--
    } else {
        cart.value.splice(index, 1)
    }
    localStorage.setItem('cart', JSON.stringify(cart.value))
}

// Sincroniza entre abas (opcional)
window.addEventListener('storage', () => {
    cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
})
# Catálogo Ecommerce - BeautySkin

Este projeto é um catálogo de ecommerce feito com [Vue.js 3](https://vuejs.org/) e [Tailwind CSS](https://tailwindcss.com/), consumindo produtos da API [DummyJSON](https://dummyjson.com/). Ele simula uma loja de beleza, com funcionalidades de navegação, visualização de produtos, carrinho, favoritos e banners promocionais.

---

## 📁 Estrutura da pasta `src`

--

## 🧩 Componentes

- **NavbarComponent.vue**  
  Barra de navegação superior, com links para as páginas principais, ícones de carrinho, favoritos e busca.

- **BannerComponent.vue**  
  Exibe banners promocionais rotativos na página inicial.

- **CategoriasComponent.vue**  
  Lista as categorias de produtos disponíveis, permitindo filtrar por categoria.

- **DestaqueComponent.vue**  
  Mostra produtos em destaque na home, com botão de compra rápida.

- **ProdutoCategoriaComponent.vue**  
  Lista produtos filtrados por categoria, com opção de adicionar ao carrinho e favoritos.

- **ProdutoFragranciaComponent.vue**  
  Lista produtos da categoria "fragrâncias", seguindo o mesmo padrão visual dos outros produtos.

- **FooterComponent.vue**  
  Rodapé com informações da loja, links úteis e redes sociais.

---

## 🖼️ Assets

- **img/**  
  Imagens de ícones, banners e elementos gráficos usados nos componentes.

- **js/cartStore.js**  
  Gerencia o estado do carrinho de compras:
  - Guarda os produtos adicionados ao carrinho usando `ref`.
  - Funções para adicionar (`adicionarCarrinho`) e remover (`removerCarrinho`) produtos.
  - Sincroniza o carrinho com o `localStorage` para manter os itens mesmo ao recarregar a página.

- **js/favoritoStore.js**  
  Gerencia a lista de produtos favoritos (lista de desejos):
  - Guarda os produtos marcados como favoritos.
  - Funções para adicionar/remover favoritos.
  - Também usa `localStorage` para persistência.

---

## 🌐 Rotas

Definidas em [`router/index.js`](router/index.js):

- `/` → HomeView.vue  
  Página inicial com banners, categorias e destaques.

- `/product/:id` → ProductView.vue  
  Página de detalhes de um produto.

- `/cart` → CartView.vue  
  Página do carrinho de compras.

---

## 🖥️ Views

- **HomeView.vue**  
  Página inicial, exibe banners, categorias e produtos em destaque.

- **ProductView.vue**  
  Página de detalhes do produto. Mostra todas as informações do produto selecionado (imagem, nome, marca, descrição, avaliação, estoque, preço, desconto), botões para adicionar ao carrinho e à lista de desejos, e produtos similares.

- **CartView.vue**  
  Exibe os produtos adicionados ao carrinho, permite alterar quantidades, remover produtos, simular frete e ver o total.

---

## 🛒 Lógica de Estado

- **cartStore.js**  
  - Adiciona, remove e lista produtos no carrinho.
  - Pode ser usado nos componentes com `import`.

- **favoritoStore.js**  
  - Gerencia produtos favoritos (lista de desejos).

---

## 💡 Como funciona a navegação e interação

- O usuário navega pelo site usando a barra de navegação.
- A Home mostra banners, categorias e destaques.
- Ao clicar em uma categoria ou produto, a lista ou detalhes são exibidos.
- O botão "Adicionar ao Carrinho" usa a função do cartStore para inserir o produto no carrinho.
- O botão de favoritos usa a função do favoritoStore para marcar/desmarcar produtos.
- O carrinho mostra todos os produtos escolhidos, permite aumentar/remover, calcula o total e simula o frete.

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install

## 🖥️ Views

- **HomeView.vue**  
  Página inicial, exibe banners, categorias e produtos em destaque.

- **ProductView.vue**  
  Página de detalhes do produto. Mostra imagem, nome, marca, descrição, avaliação, estoque, preço, botões de ação (adicionar ao carrinho, lista de desejos) e produtos similares.  
  - Usa `onMounted` e `watch` para buscar o produto correto ao navegar entre produtos.
  - Exemplo de navegação para outro produto:
    ```vue
    <router-link :to="`/product/${prod.id}`">Ver detalhes</router-link>
    ```

- **CartView.vue**  
  Exibe os produtos adicionados ao carrinho, permite alterar quantidades e finalizar compra.

---

## 🛒 Lógica de Estado

- **cartStore.js**  
  - Adiciona, remove e lista produtos no carrinho.
  - Pode ser usado nos componentes com `import`.

- **favoritoStore.js**  
  - Gerencia produtos favoritos (lista de desejos).

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install

```

### Compile and Minify for Production

```sh
npm run build
```

#Link do Vídeo do Youtube com o vídeo: https://youtu.be/P2DAjBggX0M

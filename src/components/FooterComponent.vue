<template>
    <footer class="bg-gradient-to-t from-pink-100 to-gray-50 text-gray-700 py-10 mt-12 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <!-- Logo e descrição -->
                <div>
                    <router-link to="/" class="flex items-center mb-2">
                        <span class="text-pink-600 font-bold text-2xl">BeautySkin</span>
                    </router-link>
                    <p class="text-sm text-gray-600 mt-2">
                        Sua loja de produtos de beleza. Cuidados com a pele, fragrâncias e muito mais para realçar sua
                        beleza.
                    </p>
                </div>

                <!-- Informações -->
                <div>
                    <h3 class="text-gray-800 font-semibold mb-3">Informações</h3>
                    <ul class="text-sm space-y-1 text-gray-600">
                        <li>
                            <router-link to="/sobre" class="hover:text-pink-500 transition-colors">Sobre
                                nós</router-link>
                        </li>
                        <li>
                            <router-link to="/politica-de-privacidade"
                                class="hover:text-pink-500 transition-colors">Política de Privacidade</router-link>
                        </li>
                        <li>
                            <router-link to="/termos-de-uso" class="hover:text-pink-500 transition-colors">Termos de
                                Uso</router-link>
                        </li>
                        <li>
                            <router-link to="/contato" class="hover:text-pink-500 transition-colors">Fale
                                Conosco</router-link>
                        </li>
                    </ul>
                </div>

                <!-- Contato e redes sociais -->
                <div>
                    <h3 class="text-gray-800 font-semibold mb-3">Contato</h3>
                    <ul class="text-sm text-gray-600 space-y-1 mb-4">
                        <li><span class="font-semibold">Email:</span> contato@beautyskin.com</li>
                        <li><span class="font-semibold">Telefone:</span> (11) 99999-9999</li>
                        <li><span class="font-semibold">Endereço:</span> Rua da Beleza, 123 - SP</li>
                    </ul>
                    <div class="flex space-x-4 mt-2">
                        <!-- Facebook -->
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Facebook">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.7-3.8h2v3h-1.4c-1 0-1.3.5-1.3 1.2V12H16l-.5 3h-2v7A10 10 0 0 0 22 12Z" />
                            </svg>
                        </a>
                        <!-- Instagram -->
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.5.5.6.3 1 .7 1.3 1.3.2.5.4 1.3.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.5a3.2 3.2 0 0 1-1.3 1.3c-.5.2-1.3.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.5-.5a3.2 3.2 0 0 1-1.3-1.3c-.2-.5-.4-1.3-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.5a3.2 3.2 0 0 1 1.3-1.3c.5-.2 1.3-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.4 0-4.6.1-1 .1-1.6.2-2 .4a1.6 1.6 0 0 0-.9.9c-.2.4-.3 1-.4 2C4 8.6 4 9 4 12s0 3.4.1 4.6c.1 1 .2 1.6.4 2a1.6 1.6 0 0 0 .9.9c.4.2 1 .3 2 .4 1.2.1 1.5.1 4.6.1s3.4 0 4.6-.1c1-.1 1.6-.2 2-.4.4-.2.7-.5.9-.9.2-.4.3-1 .4-2 .1-1.2.1-1.5.1-4.6s0-3.4-.1-4.6c-.1-1-.2-1.6-.4-2a1.6 1.6 0 0 0-.9-.9c-.4-.2-1-.3-2-.4-1.2-.1-1.5-.1-4.6-.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4ZM17.5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                            </svg>
                        </a>
                        <!-- Twitter -->
                        <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Twitter">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M21.5 7.3v.5c0 5.2-4 11.2-11.2 11.2A11.2 11.2 0 0 1 3 17a8.2 8.2 0 0 0 6-1.6 3.9 3.9 0 0 1-3.7-2.8 3.8 3.8 0 0 0 1.8-.1 3.9 3.9 0 0 1-3.1-3.8v-.1a3.9 3.9 0 0 0 1.8.5 3.9 3.9 0 0 1-1.2-5.2 11 11 0 0 0 8 4 3.9 3.9 0 0 1 6.6-3.6 7.8 7.8 0 0 0 2.5-1 3.9 3.9 0 0 1-1.7 2.2 7.9 7.9 0 0 0 2.2-.6 8.1 8.1 0 0 1-2 2Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Linha inferior -->
            <div class="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                <p>© 2024 BeautySkin | Criado com Vue.js e DummyJSON API</p>
                <p class="text-xs mt-2">
                    Este é um projeto de exemplo para aprendizado. Os produtos são fornecidos pela API DummyJSON.
                </p>
            </div>
        </div>
    </footer>
</template>
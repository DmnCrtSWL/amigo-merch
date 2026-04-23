<template>
  <main class="artist-store-view">
    <div class="store-hero" :style="{ backgroundImage: `url(${storeInfo.coverImage})` }">
      <div class="store-hero-overlay"></div>
      <div class="store-hero-content">
        <h1>{{ storeInfo.name }}</h1>
        <p>{{ t('store.officialStore') }}</p>
      </div>
    </div>

    <div class="store-container">
      <div class="store-controls">
        <span class="results-count"><strong>{{ sortedProducts.length }}</strong> {{ t('store.products') }}</span>
        <div class="filter-group">
          <label for="sort">{{ t('store.sortBy') }}</label>
          <select id="sort" v-model="sortBy" class="sort-select">
            <option value="populares">{{ t('store.popular') }}</option>
            <option value="priceAsc">{{ t('store.priceAsc') }}</option>
            <option value="priceDesc">{{ t('store.priceDesc') }}</option>
            <option value="alphaAsc">{{ t('store.alphaAsc') }}</option>
            <option value="alphaDesc">{{ t('store.alphaDesc') }}</option>
            <option value="dateDesc">{{ t('store.dateDesc') }}</option>
            <option value="dateAsc">{{ t('store.dateAsc') }}</option>
          </select>
        </div>
      </div>

      <div class="products-grid">
        <router-link 
          :to="`/producto/${product.id}`" 
          class="product-card" 
          v-for="product in sortedProducts" 
          :key="product.id"
        >
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" loading="lazy">
            <span class="product-tag" v-if="product.tag">{{ product.tag }}</span>
            <div class="product-overlay">
              <button class="overlay-btn">{{ t('store.viewProduct') }}</button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-artist">{{ storeInfo.name }}</span>
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-footer">
              <span class="product-price">{{ formatPrice(product.price) }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale.js'
import { formatPrice } from '../store/locale.js'

const { t } = useLocale()

const route = useRoute()

// Información Mock de la Tienda
const storeInfo = ref({
  name: 'Cargando...',
  // Usamos una imagen artística como header. 
  // En producción esto vendría del API dependiendo del artista.
  coverImage: '/images/maquila.png' 
})

// Mock de Productos con fecha y precio para demostrar los filtros
const products = ref([
  { id: 10, name: 'Playera Tour 2026', price: 450, image: '/images/product1.png', tag: 'Nuevo', date: '2026-04-20' },
  { id: 11, name: 'Sudadera Clásica', price: 850, image: '/images/product2.png', tag: 'Agotado', date: '2026-03-15' },
  { id: 12, name: 'Gorra Bordada', price: 350, image: '/images/product3.png', tag: '', date: '2026-02-10' },
  { id: 13, name: 'Totebag Eco', price: 250, image: '/images/product4.png', tag: 'Popular', date: '2026-04-05' },
  { id: 14, name: 'Póster Firmado', price: 150, image: '/images/product1.png', tag: '', date: '2026-01-20' },
  { id: 15, name: 'Taza Oficial', price: 200, image: '/images/product2.png', tag: '', date: '2025-12-10' },
  { id: 16, name: 'Llavero Metálico', price: 100, image: '/images/product3.png', tag: '', date: '2026-04-10' },
  { id: 17, name: 'Vinilo Edición Limitada', price: 1200, image: '/images/product4.png', tag: 'Premium', date: '2026-04-22' }
])

const sortBy = ref('populares')

const sortedProducts = computed(() => {
  const list = [...products.value]
  switch (sortBy.value) {
    case 'priceAsc':
      return list.sort((a, b) => a.price - b.price)
    case 'priceDesc':
      return list.sort((a, b) => b.price - a.price)
    case 'alphaAsc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'alphaDesc':
      return list.sort((a, b) => b.name.localeCompare(a.name))
    case 'dateDesc':
      return list.sort((a, b) => new Date(b.date) - new Date(a.date))
    case 'dateAsc':
      return list.sort((a, b) => new Date(a.date) - new Date(b.date))
    default:
      return list // populares (orden original o algorítmico)
  }
})

const slugify = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

const allArtists = [
  'Caloncho', 'Andrés Obregón', 'Bruses', 'Juan Gabriel', 'XG', 'Vanessa Zamora',
  'Kevin Kaarl', 'Esteman', 'Joliette', 'Los Rumberos', 'Siamés', 'Kakkmadafakka',
  'María Centeno', 'Sofía Campos', 'Carla Morrison', 'La Isla Centeno', 'Bratty', 'The Blaze'
]

onMounted(() => {
  // Obtener el slug de la URL
  const slug = route.params.name || ''
  
  // Buscar el artista cuyo slug coincide
  const foundArtist = allArtists.find(a => slugify(a) === slug)
  
  storeInfo.value.name = foundArtist ? foundArtist : (slug ? slug : 'Tienda Oficial')
  
  // Usamos una imagen artística
  storeInfo.value.coverImage = '/images/maquila.png' 
  
  // Scrollear arriba
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.artist-store-view {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Header de 420px */
.store-hero {
  position: relative;
  height: 420px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 40px;
}

.store-hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
  z-index: 1;
}

.store-hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 0 20px;
}

.store-hero-content h1 {
  font-family: 'Nunito', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  margin: 0 0 8px 0;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.store-hero-content p {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  opacity: 0.9;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--secondary-color);
}

.store-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Controles de Filtrado */
.store-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
}

.results-count {
  font-family: 'Nunito Sans', sans-serif;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.results-count strong {
  color: var(--text-main);
  font-weight: 800;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-group label {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  color: var(--text-main);
}

.sort-select {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  background-color: white;
  cursor: pointer;
  outline: none;
  min-width: 240px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.sort-select:focus {
  border-color: var(--primary-color);
}

/* Grid de Productos (4 Columnas) */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

/* Re-utilizando estilos de la tarjeta de producto */
.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.04);
  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(0,0,0,0.03);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.1);
}

.product-image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--secondary-color);
  color: #111;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
}

.product-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(35, 118, 80, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.overlay-btn {
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 14px 28px;
  border-radius: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  transform: translateY(20px);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s, color 0.2s;
  cursor: pointer;
}

.product-card:hover .overlay-btn {
  transform: translateY(0);
}

.overlay-btn:hover {
  background: var(--secondary-color);
  color: #111;
}

.product-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-artist {
  font-family: 'Nunito Sans', sans-serif;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.product-name {
  font-family: 'Nunito', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0 0 16px 0;
  line-height: 1.4;
  transition: color 0.2s;
}

.product-card:hover .product-name {
  color: var(--primary-color);
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-main);
}

/* Responsividad */
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .store-hero h1 { font-size: 3.5rem; }
}

@media (max-width: 768px) {
  .store-hero { height: 320px; }
  .store-hero h1 { font-size: 2.5rem; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  
  .store-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .sort-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .product-name { font-size: 1.1rem; }
  .products-grid { grid-template-columns: 1fr; }
}
</style>

<template>
  <main class="product-view">
    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
      <router-link to="/" class="breadcrumb-link">Inicio</router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">{{ product.name }}</span>
    </div>

    <!-- Product Details -->
    <section class="product-details-section">
      <div class="product-grid">
        <!-- Image Gallery -->
        <div class="product-image-col">
          <div class="main-image-container">
            <img :src="product.image" :alt="product.name" class="main-image">
            <span class="product-tag" v-if="product.tag">{{ product.tag }}</span>
          </div>
        </div>

        <!-- Info & Controls -->
        <div class="product-info-col">
          <span class="product-artist">{{ product.artist }}</span>
          <h1 class="product-name-title">{{ product.name }}</h1>
          <p class="product-price-large">${{ fmt(product.price) }} MXN</p>
          
          <p class="product-description">
            {{ product.description || 'Playera oficial de alta calidad. 100% algodón pre-encogido, estampado en serigrafía de alta durabilidad. Corte regular unisex. Ideal para apoyar a tu artista favorito con el mejor estilo.' }}
          </p>

          <div class="product-options">
            <!-- Tallas -->
            <div class="option-group">
              <label class="option-label">Talla</label>
              <div class="size-selector">
                <button 
                  v-for="size in ['S', 'M', 'L', 'XL', 'XXL']" 
                  :key="size"
                  class="size-btn"
                  :class="{ active: selectedSize === size }"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Cantidad -->
            <div class="option-group">
              <label class="option-label">Cantidad</label>
              <div class="quantity-selector">
                <button class="qty-btn" @click="quantity > 1 ? quantity-- : null">-</button>
                <input type="number" class="qty-input" v-model.number="quantity" min="1">
                <button class="qty-btn" @click="quantity++">+</button>
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="product-actions">
            <button class="add-to-cart-large" @click="addToCart">
              Agregar al carrito
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
          
          <div class="product-perks">
            <div class="perk-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Envío seguro a todo México</span>
            </div>
            <div class="perk-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>Pagos 100% protegidos</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos Relacionados -->
    <section class="related-products-section">
      <div class="related-container">
        <h2 class="related-title">También podría gustarte</h2>
        <div class="related-grid">
          <router-link :to="`/producto/${relProduct.id}`" class="product-card" v-for="relProduct in relatedProducts" :key="relProduct.id">
            <div class="product-image-wrapper">
              <img :src="relProduct.image" :alt="relProduct.name" class="product-image" loading="lazy">
              <span class="product-tag" v-if="relProduct.tag">{{ relProduct.tag }}</span>
            </div>
            <div class="product-info">
              <span class="product-artist">{{ relProduct.artist }}</span>
              <h3 class="product-name">{{ relProduct.name }}</h3>
              <div class="product-footer">
                <span class="product-price">${{ fmt(relProduct.price) }} MXN</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { cartActions } from '../store/cart.js';

const route = useRoute();

// Estado
const selectedSize = ref('M');
const quantity = ref(1);

// Mock Data
const productsData = [
  { id: 1, name: 'Playera Clásica Solara', artist: 'Solara', price: 450, image: '/images/product1.png', tag: 'Nuevo' },
  { id: 2, name: 'Sudadera Tour 2026', artist: 'Los Amigos', price: 850, image: '/images/product2.png', tag: 'Agotado' },
  { id: 3, name: 'Gorra Bordada', artist: 'Solara', price: 350, image: '/images/product3.png', tag: '' },
  { id: 4, name: 'Totebag Eco', artist: 'Festival X', price: 250, image: '/images/product4.png', tag: 'Popular' }
];

const product = ref(productsData[0]);
const relatedProducts = ref([]);

const loadProduct = () => {
  const id = parseInt(route.params.id) || 1;
  const found = productsData.find(p => p.id === id);
  product.value = found || productsData[0];
  
  // Fake related products
  relatedProducts.value = productsData.filter(p => p.id !== product.value.id).slice(0, 4);
  
  // Reset scroll and state
  window.scrollTo(0, 0);
  selectedSize.value = 'M';
  quantity.value = 1;
};

onMounted(() => {
  loadProduct();
});

watch(() => route.params.id, () => {
  loadProduct();
});

const addToCart = () => {
  cartActions.addItem(product.value, selectedSize.value, quantity.value);
};

const fmt = (n) => n.toLocaleString('es-MX')
</script>

<style scoped>
.product-view {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

/* Breadcrumb */
.breadcrumb-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 40px 16px;
  width: 100%;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.breadcrumb-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--primary-color);
}

.breadcrumb-sep {
  margin: 0 8px;
  color: #ccc;
}

.breadcrumb-current {
  color: var(--text-main);
  font-weight: 600;
}

/* Product Details */
.product-details-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px 80px;
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}

.main-image-container {
  position: relative;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.05);
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.main-image-container:hover .main-image {
  transform: scale(1.05);
}

.product-tag {
  position: absolute;
  top: 24px;
  left: 24px;
  background: var(--secondary-color);
  color: #111;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 6px 16px;
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-info-col {
  display: flex;
  flex-direction: column;
}

.product-artist {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.product-name-title {
  font-family: 'Nunito', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: var(--text-main);
  line-height: 1.1;
  margin-bottom: 16px;
}

.product-price-large {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 24px;
}

.product-description {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 40px;
}

.product-options {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-label {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  color: var(--text-main);
  font-size: 1rem;
}

.size-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.size-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  background: white;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-btn:hover {
  border-color: #ccc;
}

.size-btn.active {
  border-color: var(--primary-color);
  background: var(--primary-color);
  color: white;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  width: fit-content;
  overflow: hidden;
}

.qty-btn {
  background: transparent;
  border: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-main);
  transition: background 0.2s;
}

.qty-btn:hover {
  background: #f0f0f0;
}

.qty-input {
  width: 50px;
  height: 48px;
  border: none;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-main);
  -moz-appearance: textfield;
}
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.product-actions {
  margin-bottom: 40px;
}

.add-to-cart-large {
  width: 100%;
  background: var(--secondary-color);
  color: #111;
  border: none;
  border-radius: 16px;
  padding: 20px;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 24px rgba(246, 178, 0, 0.3);
}

.add-to-cart-large:hover {
  background: #e5a600;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(246, 178, 0, 0.4);
}

.add-to-cart-large:active {
  transform: translateY(0);
}

.product-perks {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
}

.perk-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 600;
  font-size: 1rem;
}

.perk-item svg {
  color: var(--primary-color);
}

/* Relacionados */
.related-products-section {
  background: white;
  padding: 80px 0;
}

.related-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.related-title {
  font-family: 'Nunito', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 48px;
  color: var(--text-main);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.product-card {
  text-decoration: none;
  display: block;
  background: transparent;
  border-radius: 20px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.product-card:hover {
  transform: translateY(-8px);
}

.product-image-wrapper {
  background: #f8f9fa;
  border-radius: 20px;
  padding: 32px;
  aspect-ratio: 1/1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: background 0.3s;
}

.product-card:hover .product-image-wrapper {
  background: white;
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.product-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--secondary-color);
  color: #111;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 100px;
  text-transform: uppercase;
}

.product-info {
  padding: 0 8px;
  display: flex;
  flex-direction: column;
}

.product-artist {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  color: var(--primary-color);
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.product-name {
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--text-main);
  margin-bottom: 8px;
  line-height: 1.3;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.product-price {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text-main);
}

@media (max-width: 1024px) {
  .product-grid {
    gap: 40px;
  }
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .main-image-container {
    max-width: 600px;
    margin: 0 auto;
  }
  .product-name-title {
    font-size: 2.5rem;
  }
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .breadcrumb-container,
  .product-details-section,
  .related-container {
    padding-left: 24px;
    padding-right: 24px;
  }
  .product-name-title {
    font-size: 2rem;
  }
  .product-price-large {
    font-size: 1.5rem;
  }
  .add-to-cart-large {
    font-size: 1.1rem;
    padding: 16px;
  }
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>

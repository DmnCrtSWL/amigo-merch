<template>
  <main class="tiendas-view">
    <div class="header-banner tiendas-banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <h1>Nuestras Tiendas</h1>
        <p>Encuentra mercancía oficial de tus artistas favoritos</p>
      </div>
    </div>

    <div class="tiendas-container">
      <div class="tiendas-controls">
        <span class="results-count"><strong>{{ sortedArtists.length }}</strong> tiendas disponibles</span>
        <div class="filter-group">
          <label for="sort">Ordenar por:</label>
          <select id="sort" v-model="sortBy" class="sort-select">
            <option value="favorites">Populares</option>
            <option value="asc">Alfabético (A - Z)</option>
            <option value="desc">Alfabético (Z - A)</option>
          </select>
        </div>
      </div>

      <div class="artist-grid">
        <router-link :to="`/tienda/${encode(artist.name)}`" class="artist-card" v-for="(artist, index) in sortedArtists" :key="index">
          <div class="artist-image-wrapper">
            <img :src="artist.image" :alt="artist.name" class="artist-image" loading="lazy">
            <div class="artist-overlay">
              <button class="overlay-btn">Visitar Tienda</button>
            </div>
          </div>
          <h3 class="artist-name">{{ artist.name }}</h3>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const encode = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

const artists = [
  { name: 'Caloncho', image: '/images/artist1.png' },
  { name: 'Andrés Obregón', image: '/images/artist2.png' },
  { name: 'Bruses', image: '/images/artist1.png' },
  { name: 'Juan Gabriel', image: '/images/artist2.png' },
  { name: 'XG', image: '/images/artist1.png' },
  { name: 'Vanessa Zamora', image: '/images/artist2.png' },
  { name: 'Kevin Kaarl', image: '/images/artist1.png' },
  { name: 'Esteman', image: '/images/artist2.png' },
  { name: 'Joliette', image: '/images/artist1.png' },
  { name: 'Los Rumberos', image: '/images/artist2.png' },
  { name: 'Siamés', image: '/images/artist1.png' },
  { name: 'Kakkmadafakka', image: '/images/artist2.png' },
  { name: 'María Centeno', image: '/images/artist1.png' },
  { name: 'Sofía Campos', image: '/images/artist2.png' },
  { name: 'Carla Morrison', image: '/images/artist1.png' },
  { name: 'La Isla Centeno', image: '/images/artist2.png' },
  { name: 'Bratty', image: '/images/artist1.png' },
  { name: 'The Blaze', image: '/images/artist2.png' }
]

const sortBy = ref('favorites')

const sortedArtists = computed(() => {
  const list = [...artists]
  if (sortBy.value === 'asc') {
    return list.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'desc') {
    return list.sort((a, b) => b.name.localeCompare(a.name))
  }
  // 'favorites' retains the curated original order from the array
  return list
})
</script>

<style scoped>
.tiendas-view {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Header Banner */
.header-banner {
  position: relative;
  height: 250px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 40px;
}

.tiendas-banner {
  background-image: url('/images/concert_header.png');
}

.banner-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to right, rgba(35, 118, 80, 0.9), rgba(0,0,0,0.6));
}

.banner-content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 0 20px;
}

.banner-content h1 {
  font-family: 'Nunito', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 16px 0;
}

.banner-content p {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.tiendas-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Controles de Filtrado */
.tiendas-controls {
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

/* Grid de Artistas (4 Columnas) */
.artist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

/* Tarjeta de Artista */
.artist-card {
  text-align: center;
  cursor: pointer;
  group: artist;
  text-decoration: none;
  display: block;
}

.artist-image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  border: 4px solid white;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
}

.artist-card:hover .artist-image-wrapper {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 32px rgba(0,0,0,0.12);
}

.artist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.artist-card:hover .artist-image {
  transform: scale(1.1);
}

.artist-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(35, 118, 80, 0.7); /* Brand primary with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.artist-card:hover .artist-overlay {
  opacity: 1;
}

.overlay-btn {
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.artist-card:hover .overlay-btn {
  transform: translateY(0);
}

.artist-name {
  font-family: 'Nunito', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
  transition: color 0.2s ease;
}

.artist-card:hover .artist-name {
  color: var(--primary-color);
}

/* Responsividad */
@media (max-width: 1024px) {
  .artist-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .tiendas-controls {
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

  .artist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .tiendas-header h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .artist-name {
    font-size: 1.1rem;
  }
}
</style>

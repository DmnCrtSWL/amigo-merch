<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Productos</h1>
        <router-link to="/productos/nuevo"
          class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nuevo Producto
        </router-link>
      </div>

      <!-- Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

        <!-- Filter tabs + search -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-wrap gap-3">
          <!-- Status tabs -->
          <div class="flex items-center gap-1">
            <button v-for="tab in tabs" :key="tab.key" @click="filtroActivo = tab.key"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                filtroActivo === tab.key
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]">
              {{ tab.label }}
              <span class="ml-1 text-xs opacity-60">({{ conteo(tab.key) }})</span>
            </button>
          </div>
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="busqueda" type="text" placeholder="Buscar productos..."
              class="pl-9 pr-4 py-2 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10 w-56" />
          </div>
        </div>

        <!-- Table -->
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-5 py-3 text-left sm:px-6 w-14"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Img</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombre</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">SKU</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Precio</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Stock</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tienda</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Estado</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              <tr v-for="p in productosFiltrados" :key="p.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                <!-- Img -->
                <td class="px-5 py-3 sm:px-6">
                  <div class="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                    <img :src="p.imagen" :alt="p.nombre" class="w-full h-full object-cover" />
                  </div>
                </td>
                <!-- Nombre -->
                <td class="px-5 py-4 sm:px-6 min-w-[180px]">
                  <p class="font-semibold text-gray-800 text-theme-sm dark:text-white/90">{{ p.nombre }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ p.tipo }}</p>
                </td>
                <!-- SKU -->
                <td class="px-5 py-4 sm:px-6">
                  <span class="font-mono text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-1.5 py-0.5 rounded">{{ p.sku }}</span>
                </td>
                <!-- Precio -->
                <td class="px-5 py-4 sm:px-6">
                  <div>
                    <span v-if="p.precioOferta" class="block text-xs line-through text-gray-400">${{ p.precio }}</span>
                    <span class="font-semibold text-gray-800 dark:text-white/90 text-theme-sm">${{ p.precioOferta || p.precio }} MXN</span>
                  </div>
                </td>
                <!-- Stock -->
                <td class="px-5 py-4 sm:px-6">
                  <span :class="p.stock > 10 ? 'text-success-600 dark:text-success-500' : p.stock > 0 ? 'text-warning-600 dark:text-warning-400' : 'text-error-500'"
                    class="text-theme-sm font-medium">
                    {{ p.stock > 0 ? p.stock : 'Sin stock' }}
                  </span>
                </td>
                <!-- Tienda -->
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ p.tienda }}</span>
                </td>
                <!-- Estado -->
                <td class="px-5 py-4 sm:px-6">
                  <span :class="p.estado === 'Publicado' ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'"
                    class="rounded-full px-2.5 py-0.5 text-theme-xs font-medium">{{ p.estado }}</span>
                </td>
                <!-- Acciones -->
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex items-center gap-1">
                    <router-link :to="`/productos/${p.id}`" title="Editar"
                      class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-blue-light-50 hover:text-blue-light-500 dark:text-gray-400 dark:hover:bg-blue-light-500/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </router-link>
                    <button title="Duplicar" class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-brand-50 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-brand-500/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button @click="eliminar(p.id)" title="Eliminar"
                      class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-error-50 hover:text-error-500 dark:text-gray-400 dark:hover:bg-error-500/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="productosFiltrados.length === 0">
                <td colspan="8" class="px-5 py-12 text-center"><p class="text-sm text-gray-400 dark:text-gray-500">No hay productos en esta categoría.</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const filtroActivo = ref('todos');
const busqueda     = ref('');

const tabs = [
  { key: 'todos',      label: 'Todos'      },
  { key: 'Publicado',  label: 'Publicados' },
  { key: 'Borrador',   label: 'Borradores' },
];

const productos = ref([
  { id: 1, nombre: 'Camiseta Rock Classic', tipo: 'Variable',  sku: 'CAM-001', precio: 299,  precioOferta: null, stock: 45, tienda: 'Tienda Rock Central', estado: 'Publicado', imagen: '/images/product/product-01.jpg' },
  { id: 2, nombre: 'Gorra Tour 2025',       tipo: 'Simple',    sku: 'GOR-001', precio: 199,  precioOferta: null, stock: 12, tienda: 'Metal & Co.',          estado: 'Publicado', imagen: '/images/product/product-02.jpg' },
  { id: 3, nombre: 'Hoodie Vintage Logo',   tipo: 'Variable',  sku: 'HOO-001', precio: 799,  precioOferta: 650,  stock: 5,  tienda: 'Pop Merch Store',      estado: 'Publicado', imagen: '/images/product/product-03.jpg' },
  { id: 4, nombre: 'Calcetines Logo Pack',  tipo: 'Simple',    sku: 'CAL-001', precio: 99,   precioOferta: null, stock: 0,  tienda: 'Tienda Rock Central', estado: 'Publicado', imagen: '/images/product/product-04.jpg' },
  { id: 5, nombre: 'Camiseta Band Tee',     tipo: 'Variable',  sku: 'CAM-002', precio: 349,  precioOferta: null, stock: 28, tienda: 'Urban Beats',         estado: 'Borrador',  imagen: '/images/product/product-05.jpg' },
]);

const conteo = (key) => key === 'todos' ? productos.value.length : productos.value.filter(p => p.estado === key).length;

const productosFiltrados = computed(() => {
  let lista = filtroActivo.value === 'todos' ? productos.value : productos.value.filter(p => p.estado === filtroActivo.value);
  if (busqueda.value) lista = lista.filter(p => p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()));
  return lista;
});

const eliminar = (id) => {
  if (confirm('¿Eliminar este producto?')) productos.value = productos.value.filter(p => p.id !== id);
};
</script>

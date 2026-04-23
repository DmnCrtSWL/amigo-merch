<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Suscriptores</h1>
        <div class="flex items-center gap-2">
          <button @click="exportarCSV" class="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Exportar CSV
          </button>
        </div>
      </div>

      <!-- Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        
        <!-- Header with search -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ total }} suscriptores totales</span>
          </div>
          
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="busqueda" type="text" placeholder="Buscar suscriptores..."
              class="pl-9 pr-4 py-2 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10 w-64" />
          </div>
        </div>

        <!-- Table -->
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Email</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombre</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Fecha de Registro</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Fuente</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Estado</p></th>
                <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              <tr v-for="s in filtrados" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td class="px-5 py-4 sm:px-6">
                  <span class="font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ s.email }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ s.nombre || '—' }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ s.fecha }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ s.fuente }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span :class="s.estado === 'Activo' ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'"
                    class="rounded-full px-2.5 py-0.5 text-theme-xs font-medium">{{ s.estado }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex items-center gap-1">
                    <button title="Dar de baja" @click="toggleEstado(s.id)"
                      class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-warning-50 hover:text-warning-500 dark:text-gray-400 dark:hover:bg-warning-500/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                    </button>
                    <button title="Eliminar" @click="eliminar(s.id)"
                      class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-error-50 hover:text-error-500 dark:text-gray-400 dark:hover:bg-error-500/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filtrados.length === 0">
                <td colspan="6" class="px-5 py-12 text-center"><p class="text-sm text-gray-400 dark:text-gray-500">No se encontraron suscriptores.</p></td>
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

const busqueda = ref('');

const suscriptores = ref([
  { id: 1, email: 'alberto.m@gmail.com',  nombre: 'Alberto Moreno', fecha: '10 Abr 2025', fuente: 'Home Page',   estado: 'Activo' },
  { id: 2, email: 'sofia.v@outlook.com',  nombre: 'Sofía Vargas',   fecha: '12 Abr 2025', fuente: 'Store Page',  estado: 'Activo' },
  { id: 3, email: 'karla.perez@live.com', nombre: 'Karla Pérez',    fecha: '15 Abr 2025', fuente: 'Pop-up',      estado: 'Baja' },
  { id: 4, email: 'diego.h@gmail.com',    nombre: 'Diego Herrera',  fecha: '18 Abr 2025', fuente: 'Home Page',   estado: 'Activo' },
  { id: 5, email: 'm.reyes@yahoo.com',    nombre: 'Miguel Reyes',   fecha: '20 Abr 2025', fuente: 'Checkout',    estado: 'Activo' },
  { id: 6, email: 'val.cruz@gmail.com',   nombre: 'Valentina Cruz', fecha: '22 Abr 2025', fuente: 'Home Page',   estado: 'Activo' },
]);

const total = computed(() => suscriptores.value.length);

const filtrados = computed(() => {
  if (!busqueda.value) return suscriptores.value;
  const q = busqueda.value.toLowerCase();
  return suscriptores.value.filter(s => 
    s.email.toLowerCase().includes(q) || 
    (s.nombre && s.nombre.toLowerCase().includes(q))
  );
});

const toggleEstado = (id) => {
  const s = suscriptores.value.find(x => x.id === id);
  if (s) s.estado = s.estado === 'Activo' ? 'Baja' : 'Activo';
};

const eliminar = (id) => {
  if (confirm('¿Eliminar permanentemente a este suscriptor?')) {
    suscriptores.value = suscriptores.value.filter(s => s.id !== id);
  }
};

const exportarCSV = () => {
  alert('Generando descarga de CSV con la lista de suscriptores...');
};
</script>

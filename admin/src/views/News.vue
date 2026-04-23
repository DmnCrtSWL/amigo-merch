<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Newsletter</h1>
        <router-link to="/news/nueva" class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nueva
        </router-link>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="px-6 py-5">
          <p class="text-sm text-gray-500 dark:text-gray-400">Gestiona y programa tus envíos de newsletter.</p>
        </div>
        <div class="border-t border-gray-100 dark:border-gray-800">
          <div class="max-w-full overflow-x-auto custom-scrollbar">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Asunto</p></th>
                  <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Estado</p></th>
                  <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Fecha</p></th>
                  <th class="px-5 py-3 text-left sm:px-6"><p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr v-for="item in newsletters" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td class="px-5 py-4 sm:px-6">
                    <span class="font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ item.asunto }}</span>
                  </td>
                  <td class="px-5 py-4 sm:px-6">
                    <span :class="estadoClase(item.estado)" class="rounded-full px-2.5 py-0.5 text-theme-xs font-medium">{{ item.estado }}</span>
                  </td>
                  <td class="px-5 py-4 sm:px-6">
                    <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ item.fecha }}</span>
                  </td>
                  <td class="px-5 py-4 sm:px-6">
                    <div class="flex items-center gap-1">
                      <router-link :to="`/news/${item.id}`" title="Editar" class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-blue-light-50 hover:text-blue-light-500 dark:text-gray-400 dark:hover:bg-blue-light-500/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </router-link>
                      <button title="Eliminar" @click="eliminar(item.id)" class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-error-50 hover:text-error-500 dark:text-gray-400 dark:hover:bg-error-500/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="newsletters.length === 0">
                  <td colspan="4" class="px-5 py-12 text-center"><p class="text-sm text-gray-400 dark:text-gray-500">No hay newsletters. Crea la primera.</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const newsletters = ref([
  { id: 1, asunto: 'Lanzamiento de temporada verano 2025', estado: 'Enviado',    fecha: '10 Abr 2025' },
  { id: 2, asunto: 'Nuevos productos en tienda',           estado: 'Borrador',   fecha: '18 Abr 2025' },
  { id: 3, asunto: 'Evento especial · Mayo CDMX',          estado: 'Programado', fecha: '01 May 2025' },
]);

const estadoClase = (e) => ({
  'Enviado':    'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  'Borrador':   'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  'Programado': 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400',
}[e] ?? '');

const eliminar = (id) => {
  if (confirm('¿Eliminar este newsletter?')) newsletters.value = newsletters.value.filter(n => n.id !== id);
};
</script>

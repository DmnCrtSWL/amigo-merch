<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Pedidos</h1>
        <span class="text-sm text-gray-400 dark:text-gray-500">{{ total }} pedidos</span>
      </div>

      <!-- Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="border-t border-gray-100 dark:border-gray-800">
          <PedidosTable :pedidos="paginados" @select="irAlDetalle" />
        </div>

        <!-- Paginación -->
        <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {{ desde + 1 }}–{{ Math.min(desde + porPagina, total) }} de {{ total }}
          </p>
          <div class="flex items-center gap-1">
            <button
              @click="pagina--"
              :disabled="pagina === 1"
              class="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <button
              v-for="p in paginas"
              :key="p"
              @click="pagina = p"
              :class="[
                'flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                p === pagina
                  ? 'bg-brand-500 text-white'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
            >{{ p }}</button>

            <button
              @click="pagina++"
              :disabled="pagina === totalPaginas"
              class="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import PedidosTable from '@/components/tables/PedidosTable.vue';

const router = useRouter();
const pagina    = ref(1);
const porPagina = 10;

// ── Mock data ─────────────────────────────────────────────────────────────
const estados  = ['Nuevo', 'En proceso', 'Completado', 'Fallido', 'Cancelado'];
const ciudades = ['CDMX', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Querétaro', 'Mérida'];
const clientes = [
  'Ana Ruiz','Carlos Méndez','Laura Torres','Diego Herrera','Sofía Vargas',
  'Miguel Reyes','Valentina Cruz','Andrés Leal','Camila Mora','Javier Ponce',
  'Elena Rios','Fernando Díaz','Isabella Soto','Rodrigo Núñez','Daniela Ortiz',
  'Emilio Vega','Mariana Fuentes','Tomás Gil','Natalia Romero','Pablo Acosta',
  'Lucía Flores','Sebastián Peña','Renata Castro','Óscar Moreno','Xiomara Rubio',
];
const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const fecha = (i) => {
  const d = new Date(2025, Math.floor(i / 2) % 12, (i % 28) + 1);
  return `${d.getDate().toString().padStart(2,'0')} ${meses[d.getMonth()]} ${d.getFullYear()}`;
};

const pedidos = Array.from({ length: 25 }, (_, i) => ({
  id:      i + 1,
  orden:   String(i + 1).padStart(6, '0'),
  cliente: clientes[i],
  fecha:   fecha(i),
  ciudad:  ciudades[i % ciudades.length],
  total:   Math.floor(Math.random() * 4500 + 299),
  estado:  estados[i % estados.length],
}));

// ── Paginación ─────────────────────────────────────────────────────────────
const total       = computed(() => pedidos.length);
const totalPaginas = computed(() => Math.ceil(total.value / porPagina));
const desde        = computed(() => (pagina.value - 1) * porPagina);
const paginados    = computed(() => pedidos.slice(desde.value, desde.value + porPagina));
const paginas      = computed(() => Array.from({ length: totalPaginas.value }, (_, i) => i + 1));

const irAlDetalle = (pedido) => router.push(`/pedidos/${pedido.id}`);
</script>

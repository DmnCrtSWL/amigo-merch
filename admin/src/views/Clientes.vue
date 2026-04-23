<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Clientes</h1>
        <span class="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ total }} clientes
        </span>
      </div>

      <!-- Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="px-6 py-5">
          <p class="text-sm text-gray-500 dark:text-gray-400">Haz clic en <strong class="font-medium text-gray-700 dark:text-gray-300">Ver</strong> para consultar el historial de órdenes de un cliente.</p>
        </div>
        <div class="border-t border-gray-100 dark:border-gray-800">
          <ClientesTable :clientes="paginados" />
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
import { ref, computed } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ClientesTable from '@/components/tables/ClientesTable.vue'

const pagina    = ref(1)
const porPagina = 10

// ── Mock data ────────────────────────────────────────────────────────────────
const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

function fmtFecha(d) {
  return `${d.getDate().toString().padStart(2,'0')} ${meses[d.getMonth()]} ${d.getFullYear()}`
}

function normalize(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function makeId(i) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let n = (i + 1) * 987654321
  return Array.from({ length: 6 }, () => {
    n = ((n * 1664525) + 1013904223) >>> 0
    return chars[n % chars.length]
  }).join('')
}

const nombres = [
  'Ana Ruiz',       'Carlos Méndez',   'Laura Torres',    'Diego Herrera',  'Sofía Vargas',
  'Miguel Reyes',   'Valentina Cruz',   'Andrés Leal',    'Camila Mora',    'Javier Ponce',
  'Elena Rios',     'Fernando Díaz',    'Isabella Soto',  'Rodrigo Núñez',  'Daniela Ortiz',
  'Emilio Vega',    'Mariana Fuentes',  'Tomás Gil',      'Natalia Romero', 'Pablo Acosta',
]

const clientes = nombres.map((nombre, i) => {
  const parts = nombre.split(' ')
  const email = `${normalize(parts[0])}.${normalize(parts[1] ?? '')}@ejemplo.mx`
  const alta  = new Date(2023, (i * 2) % 12, (i * 11 % 28) + 1)
  const numPedidos = (i % 7) + 1
  const ultima = new Date(alta)
  ultima.setDate(ultima.getDate() + numPedidos * 40 + 10)
  return {
    id: i + 1,
    cid: makeId(i),
    nombre,
    email,
    alta: fmtFecha(alta),
    ultimaCompra: fmtFecha(ultima),
    pedidos: numPedidos,
  }
})

const total        = computed(() => clientes.length)
const totalPaginas = computed(() => Math.ceil(total.value / porPagina))
const desde        = computed(() => (pagina.value - 1) * porPagina)
const paginados    = computed(() => clientes.slice(desde.value, desde.value + porPagina))
const paginas      = computed(() => Array.from({ length: totalPaginas.value }, (_, i) => i + 1))
</script>

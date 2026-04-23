<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6" v-if="cliente">

      <!-- Header -->
      <div class="flex items-center gap-3">
        <router-link
          to="/clientes"
          class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">{{ cliente.nombre }}</h1>
      </div>

      <!-- Two-column layout -->
      <div class="grid grid-cols-12 gap-5 items-start">

        <!-- ═══ LEFT: Perfil ═══ -->
        <div class="col-span-12 lg:col-span-8 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <h2 class="text-base font-semibold text-gray-800 dark:text-white/90">Información del Cliente</h2>
          </div>

          <div class="px-6 py-6 space-y-6">

            <!-- Avatar + nombre -->
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                <span class="text-xl font-bold text-brand-600 dark:text-brand-400">{{ initials(cliente.nombre) }}</span>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-800 dark:text-white/90">{{ cliente.nombre }}</p>
                <a :href="`mailto:${cliente.email}`" class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">{{ cliente.email }}</a>
              </div>
            </div>

            <div class="border-t border-gray-100 dark:border-gray-800" />

            <!-- Datos: ID, Alta, Última Compra, Pedidos -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">ID Cliente</p>
                <p class="font-mono font-bold text-brand-600 dark:text-brand-400 text-sm">{{ cliente.cid }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Alta</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ cliente.alta }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Última Compra</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ cliente.ultimaCompra }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Total Pedidos</p>
                <p class="text-sm font-bold text-gray-800 dark:text-white/90">{{ ordenes.length }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- ═══ RIGHT: Stats ═══ -->
        <div class="col-span-12 lg:col-span-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 class="text-base font-semibold text-gray-800 dark:text-white/90">Resumen</h2>
          </div>
          <div class="divide-y divide-gray-100 dark:divide-gray-800">
            <div class="px-5 py-4 flex items-center justify-between">
              <p class="text-sm text-gray-500 dark:text-gray-400">Total gastado</p>
              <p class="text-sm font-bold text-gray-800 dark:text-white/90">
                ${{ totalGastado.toLocaleString('es-MX') }} MXN
              </p>
            </div>
            <div class="px-5 py-4 flex items-center justify-between">
              <p class="text-sm text-gray-500 dark:text-gray-400">Promedio por orden</p>
              <p class="text-sm font-semibold text-gray-800 dark:text-white/90">
                ${{ promedioOrden.toLocaleString('es-MX') }} MXN
              </p>
            </div>
            <div class="px-5 py-4 flex items-center justify-between">
              <p class="text-sm text-gray-500 dark:text-gray-400">Pedidos completados</p>
              <p class="text-sm font-semibold text-success-600 dark:text-success-500">
                {{ completados }}
              </p>
            </div>
            <div class="px-5 py-4 flex items-center justify-between">
              <p class="text-sm text-gray-500 dark:text-gray-400">Última compra</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ cliente.ultimaCompra }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══ Órdenes Table ═══ -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-800 dark:text-white/90">Historial de Órdenes</h2>
          <span class="rounded-full bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400 text-xs font-semibold px-2.5 py-0.5">
            {{ ordenes.length }} {{ ordenes.length === 1 ? 'orden' : 'órdenes' }}
          </span>
        </div>
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400"># Orden</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Fecha</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Total</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Estado</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              <tr
                v-for="orden in ordenes"
                :key="orden.id"
                class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <td class="px-5 py-4 sm:px-6">
                  <span class="font-mono text-theme-sm font-semibold text-brand-600 dark:text-brand-400">
                    #{{ orden.orden }}
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ orden.fecha }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    ${{ orden.total.toLocaleString('es-MX') }} MXN
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span :class="estadoClase(orden.estado)" class="rounded-full px-2.5 py-0.5 text-theme-xs font-medium">
                    {{ orden.estado }}
                  </span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <router-link
                    :to="`/pedidos/${orden.pedidoId}`"
                    class="inline-flex items-center gap-1.5 text-theme-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    Ver pedido
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Not found -->
    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p class="text-lg font-medium text-gray-600 dark:text-gray-400">Cliente no encontrado.</p>
      <router-link to="/clientes" class="mt-4 text-sm text-brand-500 hover:text-brand-600">← Volver a Clientes</router-link>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'

const route = useRoute()

// ── Mock data ────────────────────────────────────────────────────────────────
const meses   = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const estados = ['Nuevo', 'En proceso', 'Completado', 'Fallido', 'Cancelado']

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

const todosClientes = nombres.map((nombre, i) => {
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
    numPedidos,
  }
})

const cliente = computed(() => todosClientes.find(c => c.id === Number(route.params.id)) ?? null)

const ordenes = computed(() => {
  if (!cliente.value) return []
  const { id, numPedidos } = cliente.value
  return Array.from({ length: numPedidos }, (_, j) => {
    const d = new Date(2024, (id + j * 3) % 12, ((id * 7 + j * 11) % 28) + 1)
    const total = 299 + ((id * 37 + j * 131) % 4200)
    const pedidoId = ((id * 3 + j * 7) % 25) + 1
    return {
      id:       j + 1,
      orden:    String(id * 10 + j + 1).padStart(6, '0'),
      fecha:    fmtFecha(d),
      total,
      estado:   estados[(id + j) % estados.length],
      pedidoId,
    }
  })
})

const totalGastado  = computed(() => ordenes.value.reduce((s, o) => s + o.total, 0))
const promedioOrden = computed(() => ordenes.value.length ? Math.round(totalGastado.value / ordenes.value.length) : 0)
const completados   = computed(() => ordenes.value.filter(o => o.estado === 'Completado').length)

const initials = (nombre) => nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()

const estadoClase = (estado) => {
  const mapa = {
    'Nuevo':      'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-400',
    'En proceso': 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400',
    'Completado': 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
    'Fallido':    'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500',
    'Cancelado':  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  }
  return mapa[estado] ?? mapa['Nuevo']
}
</script>

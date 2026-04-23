<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6" v-if="pedido">

      <!-- Header -->
      <div class="flex items-center gap-3">
        <router-link
          to="/pedidos"
          class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">
          Pedido <span class="text-brand-500 font-mono">#{{ pedido.orden }}</span>
        </h1>
      </div>

      <!-- Two-column layout -->
      <div class="grid grid-cols-12 gap-5 items-start">

        <!-- ═══ LEFT CARD: Datos del pedido ═══ -->
        <div class="col-span-12 lg:col-span-8 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <h2 class="text-base font-semibold text-gray-800 dark:text-white/90">Información del Pedido</h2>
          </div>

          <div class="px-6 py-6 space-y-6">

            <!-- Fila 1: # Orden, Cliente, Fecha, Total -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Orden</p>
                <p class="font-mono font-bold text-brand-600 dark:text-brand-400 text-sm">#{{ pedido.orden }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Cliente</p>
                <p class="font-medium text-gray-800 dark:text-white/90 text-sm">{{ pedido.cliente }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Fecha</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ pedido.fecha }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Total</p>
                <p class="font-bold text-gray-800 dark:text-white/90 text-sm">${{ pedido.total.toLocaleString('es-MX') }} MXN</p>
              </div>
            </div>

            <div class="border-t border-gray-100 dark:border-gray-800" />

            <!-- Fila 2: Estado, Correo, Teléfono, Ver Mapa -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <!-- Estado dropdown -->
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1.5">Estado</p>
                <div class="relative">
                  <select
                    v-model="pedido.estado"
                    class="w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent py-2 pl-3 pr-8 text-sm font-medium focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                    :class="estadoTextClase(pedido.estado)"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                    <option value="Fallido">Fallido</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                  <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Correo</p>
                <a :href="`mailto:${pedido.correo}`" class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 break-all">
                  {{ pedido.correo }}
                </a>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Teléfono</p>
                <a :href="`tel:${pedido.telefono}`" class="text-sm text-gray-700 dark:text-gray-300 hover:text-brand-500">
                  {{ pedido.telefono }}
                </a>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">Ubicación</p>
                <a
                  :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pedido.domicilio)}`"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Ver Mapa
                </a>
              </div>
            </div>

            <div class="border-t border-gray-100 dark:border-gray-800" />

            <!-- Fila 3: Domicilio completo -->
            <div>
              <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1.5">Domicilio de entrega</p>
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ pedido.domicilio }}</p>
            </div>

            <div class="border-t border-gray-100 dark:border-gray-800" />

            <!-- Notas del cliente -->
            <div>
              <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase mb-1.5 block">Notas del cliente</p>
              <div
                v-if="pedido.nota"
                class="w-full rounded-lg border border-warning-200 dark:border-warning-500/30 bg-warning-50 dark:bg-warning-500/10 px-4 py-3 text-sm text-warning-800 dark:text-warning-300 leading-relaxed"
              >
                {{ pedido.nota }}
              </div>
              <p v-else class="text-sm text-gray-400 dark:text-gray-500 italic">Sin notas.</p>
            </div>

          </div>
        </div>

        <!-- ═══ RIGHT CARD: Resumen de productos ═══ -->
        <div class="col-span-12 lg:col-span-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 class="text-base font-semibold text-gray-800 dark:text-white/90">Productos</h2>
            <span class="rounded-full bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400 text-xs font-semibold px-2.5 py-0.5">
              {{ totalItems }} artículos
            </span>
          </div>

          <!-- Lista de productos -->
          <div class="divide-y divide-gray-100 dark:divide-gray-800 max-h-80 overflow-y-auto custom-scrollbar">
            <div
              v-for="item in pedido.items"
              :key="item.id"
              class="flex gap-3 px-5 py-4"
            >
              <div class="w-14 h-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <img :src="item.imagen" :alt="item.nombre" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 dark:text-white/90 truncate">{{ item.nombre }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ item.variante }}</p>
                <div class="flex items-center justify-between mt-1.5">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Cant: {{ item.cantidad }}</span>
                  <span class="text-sm font-semibold text-gray-800 dark:text-white/90">
                    ${{ (item.precio * item.cantidad).toLocaleString('es-MX') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Totales -->
          <div class="px-5 py-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${{ subtotal.toLocaleString('es-MX') }} MXN</span>
            </div>
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Envío</span>
              <span v-if="pedido.envio === 0" class="text-success-600 dark:text-success-500 font-medium">Gratis</span>
              <span v-else>${{ pedido.envio.toLocaleString('es-MX') }} MXN</span>
            </div>
            <div class="border-t border-gray-100 dark:border-gray-800 pt-2.5 flex items-center justify-between">
              <span class="text-sm font-semibold text-gray-800 dark:text-white/90">Total</span>
              <span class="text-base font-bold text-brand-600 dark:text-brand-400">
                ${{ pedido.total.toLocaleString('es-MX') }} MXN
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Not found -->
    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p class="text-lg font-medium text-gray-600 dark:text-gray-400">Pedido no encontrado.</p>
      <router-link to="/pedidos" class="mt-4 text-sm text-brand-500 hover:text-brand-600">← Volver a Pedidos</router-link>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const route = useRoute();

// ── Mock data (en producción vendrá del backend) ─────────────────────────
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
const domicilios = [
  'Av. Insurgentes Sur 1602, Col. Crédito Constructor, Benito Juárez, CDMX 03940',
  'Av. Vallarta 3959, Fracc. Monraz, Guadalajara, Jalisco 44670',
  'Av. Constitución 2050 Ote., Centro, Monterrey, NL 64000',
  'Blvd. Atlixcáyotl 6201, Reserva Territorial Atlixcáyotl, Puebla 72190',
  'Blvd. Agua Caliente 10750, Aviación, Tijuana, B.C. 22014',
  'Av. Constituyentes 42, El Marqués, Querétaro 76240',
  'Paseo de Montejo 460, Centro, Mérida, Yucatán 97000',
];

const productosEjemplo = [
  [
    { id:1, nombre:'Camiseta Rock Classic', variante:'Talla L, Negro', imagen:'/images/product/product-01.jpg', precio:299, cantidad:2 },
    { id:2, nombre:'Gorra Tour 2025',       variante:'Única, Blanco',  imagen:'/images/product/product-02.jpg', precio:199, cantidad:1 },
  ],
  [
    { id:3, nombre:'Hoodie Vintage Logo',   variante:'Talla M, Gris',  imagen:'/images/product/product-03.jpg', precio:650, cantidad:1 },
  ],
  [
    { id:4, nombre:'Camiseta Band Tee',     variante:'Talla S, Azul',  imagen:'/images/product/product-04.jpg', precio:349, cantidad:3 },
    { id:5, nombre:'Calcetines Logo Pack',  variante:'Talla Única',    imagen:'/images/product/product-05.jpg', precio:99,  cantidad:2 },
  ],
];

const notas = [
  'Por favor dejar con el portero, no tocar el timbre.',
  'Entregar únicamente entre 10am y 2pm.',
  null,
  'Envolver para regalo, es un cumpleaños.',
  null,
  'Departamento 4B, segundo piso.',
  'Llamar al celular antes de llegar.',
];

const todos = Array.from({ length: 25 }, (_, i) => {
  const items  = productosEjemplo[i % productosEjemplo.length];
  const sub    = items.reduce((s, x) => s + x.precio * x.cantidad, 0);
  const envio  = sub > 999 ? 0 : 150;
  return {
    id:        i + 1,
    orden:     String(i + 1).padStart(6, '0'),
    cliente:   clientes[i],
    fecha:     fecha(i),
    ciudad:    ciudades[i % ciudades.length],
    estado:    estados[i % estados.length],
    correo:    `${clientes[i].split(' ')[0].toLowerCase()}@ejemplo.mx`,
    telefono:  `+52 55 ${(1000 + i * 37).toString().padStart(4,'0')} ${(1000 + i * 91).toString().padStart(4,'0')}`,
    domicilio: domicilios[i % domicilios.length],
    nota:      notas[i % notas.length],
    items,
    envio,
    total:     sub + envio,
  };
});

const pedido = computed(() => todos.find(p => p.id === Number(route.params.id)) ?? null);

const totalItems = computed(() => pedido.value?.items.reduce((s, x) => s + x.cantidad, 0) ?? 0);
const subtotal   = computed(() => pedido.value?.items.reduce((s, x) => s + x.precio * x.cantidad, 0) ?? 0);

const estadoTextClase = (estado) => {
  const m = {
    'Nuevo':      'text-blue-light-600 dark:text-blue-light-400',
    'En proceso': 'text-warning-600 dark:text-warning-400',
    'Completado': 'text-success-600 dark:text-success-500',
    'Fallido':    'text-error-600 dark:text-error-500',
    'Cancelado':  'text-gray-500 dark:text-gray-400',
  };
  return m[estado] ?? '';
};
</script>

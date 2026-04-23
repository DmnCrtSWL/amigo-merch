<template>
  <AdminLayout>
    <div class="space-y-4">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/productos" class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </router-link>
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Nuevo Producto</h1>
        </div>
        <div class="flex items-center gap-2">
          <button @click="guardar('Borrador')" class="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Guardar Borrador
          </button>
          <button @click="guardar('Publicado')" class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Publicar
          </button>
        </div>
      </div>

      <!-- Product Name -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-4">
        <input v-model="form.nombre" type="text" placeholder="Nombre del producto"
          class="w-full text-2xl font-bold text-gray-800 dark:text-white/90 bg-transparent border-0 focus:outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600" />
      </div>

      <!-- Two columns -->
      <div class="grid grid-cols-12 gap-5 items-start">

        <!-- ══ LEFT (main) ══════════════════════════════════ -->
        <div class="col-span-12 lg:col-span-8 space-y-5">

          <!-- Product Data Tabs -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Datos del producto</h2>
            </div>

            <!-- Tab Type -->
            <div class="flex items-center gap-1 px-6 pt-4">
              <select v-model="form.tipo" class="h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-300 px-3 focus:outline-none focus:border-brand-300">
                <option value="simple">Producto simple</option>
                <option value="variable">Producto variable</option>
                <option value="externo">Producto externo</option>
              </select>
            </div>

            <!-- Inner tabs -->
            <div class="flex border-b border-gray-100 dark:border-gray-800 px-6 mt-3 gap-0">
              <button v-for="t in productTabs" :key="t.key" @click="tabActivo = t.key"
                :class="['px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
                  tabActivo === t.key ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700']">
                {{ t.label }}
              </button>
            </div>

            <div class="px-6 py-6">

              <!-- General -->
              <div v-if="tabActivo === 'general'" class="grid grid-cols-2 gap-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Precio regular</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input v-model="form.precio" type="number" placeholder="0.00"
                      class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-7 pr-4 py-2.5 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10" />
                  </div>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Precio de oferta</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input v-model="form.precioOferta" type="number" placeholder="0.00"
                      class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent pl-7 pr-4 py-2.5 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10" />
                  </div>
                </div>
              </div>

              <!-- Inventario -->
              <div v-if="tabActivo === 'inventario'" class="space-y-5">
                <div class="grid grid-cols-2 gap-5">
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">SKU</label>
                    <input v-model="form.sku" type="text" placeholder="CAM-001"
                      class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10" />
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Cantidad en stock</label>
                    <input v-model="form.stock" type="number" placeholder="0"
                      class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10" />
                  </div>
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Estado de stock</label>
                  <select v-model="form.estadoStock" class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none">
                    <option value="instock">En stock</option>
                    <option value="outofstock">Sin stock</option>
                    <option value="onbackorder">Bajo pedido</option>
                  </select>
                </div>
              </div>

              <!-- Tallas / Atributos -->
              <div v-if="tabActivo === 'atributos'" class="space-y-4">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Tallas disponibles</p>
                  <button @click="addTalla" class="text-sm text-brand-500 hover:text-brand-600 font-medium">+ Agregar talla</button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div v-for="(talla, i) in form.tallas" :key="i"
                    class="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 bg-gray-50 dark:bg-gray-800">
                    <input v-model="form.tallas[i]" class="w-16 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none" />
                    <button @click="form.tallas.splice(i,1)" class="text-gray-400 hover:text-error-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <div v-if="form.tallas.length === 0" class="text-sm text-gray-400 italic">Sin tallas agregadas.</div>
                </div>
              </div>

              <!-- Envío -->
              <div v-if="tabActivo === 'envio'" class="grid grid-cols-2 gap-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Peso (kg)</label>
                  <input v-model="form.peso" type="number" placeholder="0.5"
                    class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Clase de envío</label>
                  <select v-model="form.claseEnvio" class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none">
                    <option value="">Sin clase</option>
                    <option value="ropa">Ropa</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          <!-- Descripción -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción</h2>
            </div>
            <div class="px-6 py-5">
              <textarea v-model="form.descripcion" rows="6" placeholder="Descripción completa del producto..."
                class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 resize-none" />
            </div>
          </div>

          <!-- Descripción corta -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción corta</h2>
            </div>
            <div class="px-6 py-5">
              <textarea v-model="form.descCorta" rows="3" placeholder="Resumen breve para listados y vista rápida..."
                class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-3 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 resize-none" />
            </div>
          </div>

        </div>

        <!-- ══ RIGHT (sidebar) ══════════════════════════════ -->
        <div class="col-span-12 lg:col-span-4 space-y-4">

          <!-- Publicar -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Publicar</h3>
            </div>
            <div class="px-5 py-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">Estado</span>
                <select v-model="form.estado" class="h-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-300 px-2 focus:outline-none">
                  <option value="Borrador">Borrador</option>
                  <option value="Publicado">Publicado</option>
                </select>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">Visibilidad</span>
                <select v-model="form.visibilidad" class="h-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-300 px-2 focus:outline-none">
                  <option value="publico">Público</option>
                  <option value="privado">Privado</option>
                  <option value="catalogo">Solo catálogo</option>
                </select>
              </div>
              <div class="border-t border-gray-100 dark:border-gray-800 pt-3 flex gap-2">
                <button @click="guardar('Borrador')" class="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Borrador
                </button>
                <button @click="guardar('Publicado')" class="flex-1 rounded-lg bg-brand-500 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
                  Publicar
                </button>
              </div>
            </div>
          </div>

          <!-- Imagen principal -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Imagen del producto</h3>
            </div>
            <div class="p-4">
              <div @click="$refs.imgPrincipal.click()" @dragover.prevent @drop.prevent="onDropImg"
                class="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 cursor-pointer hover:border-brand-400 hover:bg-brand-50 dark:hover:border-brand-600 dark:hover:bg-brand-500/5 transition-colors overflow-hidden">
                <img v-if="form.imagenPreview" :src="form.imagenPreview" class="w-full aspect-square object-cover" />
                <div v-else class="flex flex-col items-center justify-center py-10 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <p class="text-xs text-gray-400">Clic o arrastra imagen</p>
                </div>
                <input ref="imgPrincipal" type="file" accept="image/*" class="hidden" @change="onImgChange" />
              </div>
              <button v-if="form.imagenPreview" @click="form.imagenPreview = null; form.imagen = null"
                class="mt-2 w-full text-xs text-error-500 hover:text-error-600 text-center">Eliminar imagen</button>
            </div>
          </div>

          <!-- Galería -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Galería</h3>
            </div>
            <div class="p-4 space-y-3">
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(img, i) in form.galeria" :key="i" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img :src="img" class="w-full h-full object-cover" />
                  <button @click="form.galeria.splice(i,1)"
                    class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <button @click="$refs.imgGaleria.click()"
                  class="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-brand-400 hover:text-brand-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
              <input ref="imgGaleria" type="file" accept="image/*" multiple class="hidden" @change="onGaleriaChange" />
            </div>
          </div>

          <!-- Tienda -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tienda</h3>
            </div>
            <div class="px-5 py-4 space-y-2">
              <label v-for="tienda in tiendas" :key="tienda" class="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" :value="tienda" v-model="form.tienda"
                  class="w-4 h-4 rounded-full border-gray-300 text-brand-500 focus:ring-brand-500/20" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ tienda }}</span>
              </label>
            </div>
          </div>

          <!-- Etiquetas -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Etiquetas</h3>
            </div>
            <div class="px-5 py-4 space-y-3">
              <div class="flex flex-wrap gap-1.5">
                <span v-for="(tag, i) in form.etiquetas" :key="i"
                  class="flex items-center gap-1 rounded-full bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-400 text-xs font-medium px-2.5 py-0.5">
                  {{ tag }}
                  <button @click="form.etiquetas.splice(i,1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <input v-model="tagInput" @keydown.enter.prevent="addTag" type="text" placeholder="Nueva etiqueta..."
                  class="flex-1 h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10" />
                <button @click="addTag" class="h-9 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-brand-50 hover:text-brand-500 transition-colors">
                  +
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const router = useRouter();

const tabActivo = ref('general');
const tagInput  = ref('');

const productTabs = [
  { key: 'general',     label: 'General'     },
  { key: 'inventario',  label: 'Inventario'  },
  { key: 'atributos',   label: 'Tallas'      },
  { key: 'envio',       label: 'Envío'       },
];

const tiendas = ['Tienda Rock Central', 'Metal & Co.', 'Pop Merch Store', 'Urban Beats', 'Indie Threads'];

const form = reactive({
  nombre:       '',
  tipo:         'simple',
  precio:       '',
  precioOferta: '',
  sku:          '',
  stock:        '',
  estadoStock:  'instock',
  peso:         '',
  claseEnvio:   '',
  descripcion:  '',
  descCorta:    '',
  estado:       'Borrador',
  visibilidad:  'publico',
  imagen:       null,
  imagenPreview: null,
  galeria:      [],
  tienda:       '',
  etiquetas:    [],
  tallas:       ['XS', 'S', 'M', 'L', 'XL'],
});

const addTag = () => {
  const t = tagInput.value.trim();
  if (t && !form.etiquetas.includes(t)) form.etiquetas.push(t);
  tagInput.value = '';
};

const addTalla = () => form.tallas.push('Nueva');

const onImgChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  form.imagen = file;
  form.imagenPreview = URL.createObjectURL(file);
};

const onDropImg = (e) => {
  const file = e.dataTransfer.files[0];
  if (!file) return;
  form.imagen = file;
  form.imagenPreview = URL.createObjectURL(file);
};

const onGaleriaChange = (e) => {
  Array.from(e.target.files).forEach(f => form.galeria.push(URL.createObjectURL(f)));
  e.target.value = '';
};

const guardar = (estado) => {
  form.estado = estado;
  // TODO: enviar al backend
  router.push('/productos');
};
</script>

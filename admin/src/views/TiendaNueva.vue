<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center gap-3">
        <router-link
          to="/tiendas"
          class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Nueva Tienda</h1>
      </div>

      <!-- Form Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <form @submit.prevent="guardarTienda" class="divide-y divide-gray-100 dark:divide-gray-800">

          <!-- Body -->
          <div class="px-6 py-8">
            <div class="grid grid-cols-12 gap-6">

              <!-- Imagen (12 cols) -->
              <div class="col-span-12">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Imagen
                </label>
                <div
                  class="relative flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 px-5 py-12 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 dark:hover:border-brand-600 dark:hover:bg-brand-500/5 transition-colors"
                  @click="$refs.fileInput.click()"
                  @dragover.prevent
                  @drop.prevent="onDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onFileChange"
                  />
                  <!-- Preview -->
                  <div v-if="form.imagenPreview" class="mb-4">
                    <img :src="form.imagenPreview" class="mx-auto h-32 w-32 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shadow-theme-sm" />
                  </div>
                  <div v-else class="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {{ form.imagenPreview ? 'Haz clic para cambiar la imagen' : 'Haz clic o arrastra una imagen aquí' }}
                  </p>
                  <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">PNG, JPG, WebP — hasta 5 MB</p>
                </div>
              </div>

              <!-- Nombre (6 cols) -->
              <div class="col-span-12 sm:col-span-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.nombre"
                  type="text"
                  placeholder="Nombre de la tienda"
                  required
                  class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <!-- Estado (6 cols) -->
              <div class="col-span-12 sm:col-span-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Estado</label>
                <div class="flex items-center justify-between h-11 rounded-xl border border-gray-200 dark:border-gray-700 px-4">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ form.publico ? 'Público — visible para todos' : 'Privado — solo administradores' }}
                  </p>
                  <button
                    type="button"
                    @click="form.publico = !form.publico"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                      form.publico ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
                    ]"
                  >
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        form.publico ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4">
            <router-link
              to="/tiendas"
              class="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </router-link>
            <button
              type="submit"
              class="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
            >
              Guardar Tienda
            </button>
          </div>

        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import AdminLayout from "@/components/layout/AdminLayout.vue";

const router = useRouter();
const fileInput = ref(null);

const form = reactive({
  nombre: '',
  imagen: null,
  imagenPreview: null,
  publico: false,
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  form.imagen = file;
  form.imagenPreview = URL.createObjectURL(file);
};

const onDrop = (e) => {
  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  form.imagen = file;
  form.imagenPreview = URL.createObjectURL(file);
};

const guardarTienda = () => {
  if (!form.nombre.trim()) return;
  // TODO: enviar al backend
  router.push('/tiendas');
};
</script>

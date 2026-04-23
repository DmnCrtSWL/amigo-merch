<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center gap-3">
        <router-link
          to="/usuarios"
          class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Nuevo Usuario</h1>
      </div>

      <!-- Form Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <form @submit.prevent="guardar" class="divide-y divide-gray-100 dark:divide-gray-800">

          <div class="px-6 py-8">
            <div class="grid grid-cols-12 gap-6">

              <!-- Nombre -->
              <div class="col-span-12 sm:col-span-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.nombre"
                  type="text"
                  placeholder="Nombre completo"
                  required
                  class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <!-- Correo -->
              <div class="col-span-12 sm:col-span-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Correo <span class="text-error-500">*</span>
                </label>
                <input
                  v-model="form.correo"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  required
                  class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <!-- Rol -->
              <div class="col-span-12 sm:col-span-4">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Rol <span class="text-error-500">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model="form.rol"
                    required
                    class="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-10 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                  >
                    <option value="" disabled>Seleccionar rol</option>
                    <option value="Operativo">Operativo</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
              </div>

              <!-- Contraseña -->
              <div class="col-span-12 sm:col-span-4">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Contraseña <span class="text-error-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPass ? 'text' : 'password'"
                    placeholder="Mínimo 8 caracteres"
                    required
                    minlength="8"
                    class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 pr-11 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <button type="button" @click="showPass = !showPass" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <svg v-if="!showPass" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  </button>
                </div>
              </div>

              <!-- Confirmar Contraseña -->
              <div class="col-span-12 sm:col-span-4">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Confirmar Contraseña <span class="text-error-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.confirmar"
                    :type="showConfirm ? 'text' : 'password'"
                    placeholder="Repite la contraseña"
                    required
                    class="h-11 w-full rounded-lg border bg-transparent px-4 pr-11 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 transition-colors"
                    :class="passwordError
                      ? 'border-error-400 text-error-600 focus:border-error-400 focus:ring-error-400/10 dark:border-error-500 dark:text-error-400'
                      : 'border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800'"
                  />
                  <button type="button" @click="showConfirm = !showConfirm" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  </button>
                </div>
                <p v-if="passwordError" class="mt-1.5 text-xs text-error-500">Las contraseñas no coinciden.</p>
              </div>

            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4">
            <router-link
              to="/usuarios"
              class="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </router-link>
            <button
              type="submit"
              class="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
            >
              Guardar Usuario
            </button>
          </div>

        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const router = useRouter();
const showPass    = ref(false);
const showConfirm = ref(false);

const form = reactive({
  nombre:    '',
  correo:    '',
  rol:       '',
  password:  '',
  confirmar: '',
});

const passwordError = computed(() =>
  form.confirmar.length > 0 && form.password !== form.confirmar
);

const guardar = () => {
  if (passwordError.value) return;
  // TODO: enviar al backend
  router.push('/usuarios');
};
</script>

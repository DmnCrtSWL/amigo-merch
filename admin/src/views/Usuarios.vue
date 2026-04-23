<template>
  <AdminLayout>
    <div class="space-y-5 sm:space-y-6">

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Usuarios</h1>
        <router-link
          to="/usuarios/nuevo"
          class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nuevo Usuario
        </router-link>
      </div>

      <!-- Card -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="px-6 py-5">
          <p class="text-sm text-gray-500 dark:text-gray-400">Gestiona los usuarios registrados en la plataforma.</p>
        </div>
        <div class="border-t border-gray-100 dark:border-gray-800">
          <UsersTable
            :usuarios="usuarios"
            @ver="onVer"
            @editar="onEditar"
            @eliminar="onEliminar"
          />
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import UsersTable from '@/components/tables/UsersTable.vue';

const router = useRouter();

const generarId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const ids = new Set();
  let id;
  do {
    id = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (ids.has(id));
  ids.add(id);
  return id;
};

const usuarios = ref([
  { id: generarId(), nombre: 'Carlos Ramírez',   correo: 'carlos@arigomerch.mx',  fecha: '10 Ene 2025', rol: 'Admin'   },
  { id: generarId(), nombre: 'Laura González',   correo: 'laura@arigomerch.mx',   fecha: '15 Ene 2025', rol: 'Editor'  },
  { id: generarId(), nombre: 'Diego Hernández',  correo: 'diego@arigomerch.mx',   fecha: '02 Feb 2025', rol: 'Viewer'  },
  { id: generarId(), nombre: 'Sofía Torres',     correo: 'sofia@arigomerch.mx',   fecha: '18 Feb 2025', rol: 'Editor'  },
  { id: generarId(), nombre: 'Miguel Sánchez',   correo: 'miguel@arigomerch.mx',  fecha: '05 Mar 2025', rol: 'Viewer'  },
  { id: generarId(), nombre: 'Valentina López',  correo: 'vale@arigomerch.mx',    fecha: '21 Mar 2025', rol: 'Admin'   },
]);

const onVer     = (u) => router.push(`/usuarios/${u.id}`);
const onEditar  = (u) => router.push(`/usuarios/${u.id}/editar`);
const onEliminar = (u) => {
  if (confirm(`¿Eliminar a ${u.nombre}?`)) {
    usuarios.value = usuarios.value.filter(x => x.id !== u.id);
  }
};
</script>

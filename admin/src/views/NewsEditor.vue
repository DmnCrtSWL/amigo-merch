<template>
  <AdminLayout>
    <div class="space-y-4">

      <!-- Header -->
      <div class="flex items-center gap-3">
        <router-link to="/news" class="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white/90">Nueva Newsletter</h1>
      </div>

      <!-- Asunto -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-4">
        <label class="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">Asunto</label>
        <input v-model="asunto" type="text" placeholder="Escribe el asunto del correo..." class="w-full text-base font-medium text-gray-800 dark:text-white/90 bg-transparent border-0 focus:outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600" />
      </div>

      <!-- Editor + Panel -->
      <div class="flex gap-5 items-start">

        <!-- ── LEFT: Toolbar + Canvas ─────────────────────── -->
        <div class="flex-1 min-w-0 space-y-3">

          <!-- Toolbar -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-4 py-2.5 flex flex-wrap items-center gap-1">

            <!-- Format -->
            <select @change="setFormat($event.target.value)" class="h-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-300 px-2 focus:outline-none focus:border-brand-300 cursor-pointer">
              <option value="p">Párrafo</option>
              <option value="h1">Título 1</option>
              <option value="h2">Título 2</option>
              <option value="h3">Título 3</option>
            </select>

            <div class="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <!-- Bold / Italic / Underline -->
            <button v-for="btn in styleButtons" :key="btn.cmd" @mousedown.prevent="exec(btn.cmd)" :title="btn.label"
              class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-bold"
              v-html="btn.icon" />

            <div class="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <!-- Text Color -->
            <div class="relative">
              <button @mousedown.prevent="toggleColors" title="Color de texto"
                class="flex flex-col items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors gap-0.5">
                <span class="text-sm font-bold text-gray-700 dark:text-gray-300 leading-none">A</span>
                <span class="w-4 h-1 rounded-full" :style="{ background: currentColor }"></span>
              </button>
              <div v-if="showColors" class="absolute top-10 left-0 z-50 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-2 flex flex-wrap gap-1.5 w-36">
                <button v-for="c in colorPalette" :key="c.v" @mousedown.prevent="applyColor(c.v)" :title="c.n"
                  class="w-6 h-6 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                  :style="{ background: c.v, borderColor: currentColor === c.v ? '#237650' : 'transparent' }" />
              </div>
            </div>

            <div class="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <!-- Alignment -->
            <button v-for="a in alignButtons" :key="a.cmd" @mousedown.prevent="exec(a.cmd)" :title="a.label"
              class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              v-html="a.icon" />

            <div class="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <!-- Insert Image -->
            <button @mousedown.prevent="$refs.imgInput.click()" title="Insertar imagen"
              class="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </button>
            <input ref="imgInput" type="file" accept="image/*" class="hidden" @change="insertImage" />

            <!-- 1 / 2 Columns -->
            <button @mousedown.prevent="insertCols(1)" title="1 columna (por defecto)"
              class="flex items-center gap-1 h-8 px-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700">
              <span class="flex gap-0.5"><span class="w-5 h-4 bg-gray-400 rounded-sm"></span></span>1 col
            </button>
            <button @mousedown.prevent="insertCols(2)" title="2 columnas"
              class="flex items-center gap-1 h-8 px-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700">
              <span class="flex gap-0.5"><span class="w-2.5 h-4 bg-gray-400 rounded-sm"></span><span class="w-2.5 h-4 bg-gray-400 rounded-sm"></span></span>2 col
            </button>
          </div>

          <!-- Editor Canvas -->
          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-4">
            <div
              ref="editorEl"
              contenteditable="true"
              class="editor-canvas min-h-[520px] bg-white rounded-xl shadow-sm p-10 focus:outline-none"
              style="font-family: 'Nunito', sans-serif;"
              @click="showColors = false"
              @input="dirty = true"
            ></div>
          </div>
        </div>

        <!-- ── RIGHT: Panel ───────────────────────────────── -->
        <div class="w-64 flex-shrink-0 space-y-4">

          <!-- Templates -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Plantillas</h3>
            </div>
            <div class="p-3 grid grid-cols-2 gap-2">
              <button v-for="tpl in templates" :key="tpl.key" @click="applyTemplate(tpl)"
                class="flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 text-center cursor-pointer transition-all hover:border-brand-400 hover:shadow-sm"
                :class="activeTemplate === tpl.key ? 'border-brand-500' : 'border-gray-200 dark:border-gray-700'">
                <div class="w-full h-16 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center" v-html="tpl.thumb"></div>
                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ tpl.name }}</span>
              </button>
            </div>
          </div>

          <!-- Publicar -->
          <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Publicar</h3>
            </div>
            <div class="p-4 space-y-3">
              <button @click="enviarAhora" class="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Enviar Ahora
              </button>
              <div class="border-t border-gray-100 dark:border-gray-800 pt-3">
                <p class="text-xs text-gray-400 mb-2">Programar envío</p>
                <input type="datetime-local" v-model="scheduledAt"
                  class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:focus:border-brand-800" />
                <button @click="programar"
                  class="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Programar
                </button>
              </div>
            </div>
          </div>

          <!-- Guardar borrador -->
          <button @click="guardarBorrador" class="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Guardar borrador
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const router = useRouter();
const editorEl   = ref(null);
const asunto     = ref('');
const scheduledAt = ref('');
const showColors  = ref(false);
const currentColor = ref('#237650');
const activeTemplate = ref('blank');
const dirty = ref(false);

// ── Formatting ────────────────────────────────────────
const exec = (cmd) => { editorEl.value.focus(); document.execCommand(cmd, false, null); };

const setFormat = (tag) => {
  editorEl.value.focus();
  document.execCommand('formatBlock', false, tag);
};

const toggleColors = () => { showColors.value = !showColors.value; };

const applyColor = (color) => {
  currentColor.value = color;
  editorEl.value.focus();
  document.execCommand('foreColor', false, color);
  showColors.value = false;
};

const colorPalette = [
  { v: '#237650', n: 'Verde Marca' },
  { v: '#111827', n: 'Negro' },
  { v: '#6B7280', n: 'Gris' },
  { v: '#EF4444', n: 'Rojo' },
  { v: '#F59E0B', n: 'Naranja' },
  { v: '#3B82F6', n: 'Azul' },
  { v: '#8B5CF6', n: 'Morado' },
  { v: '#EC4899', n: 'Rosa' },
  { v: '#FFFFFF', n: 'Blanco' },
];

const styleButtons = [
  { cmd: 'bold',      label: 'Negrita',   icon: '<b>B</b>' },
  { cmd: 'italic',    label: 'Cursiva',   icon: '<i style="font-style:italic">I</i>' },
  { cmd: 'underline', label: 'Subrayado', icon: '<u>U</u>' },
];

const alignButtons = [
  { cmd: 'justifyLeft',   label: 'Izquierda', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>' },
  { cmd: 'justifyCenter', label: 'Centro',    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>' },
  { cmd: 'justifyRight',  label: 'Derecha',   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="7" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>' },
];

// ── Image ─────────────────────────────────────────────
const insertImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    editorEl.value.focus();
    document.execCommand('insertHTML', false, `<img src="${ev.target.result}" style="max-width:100%;border-radius:10px;margin:12px 0;display:block;" /><p><br></p>`);
  };
  reader.readAsDataURL(file);
  e.target.value = '';
};

// ── Columns ───────────────────────────────────────────
const insertCols = (n) => {
  if (n === 1) {
    // Reset to single full-width column
    const html = `<div style="display:block;width:100%;font-family:'Nunito',sans-serif;"><p>Escribe aquí...</p></div><p><br></p>`;
    editorEl.value.focus();
    document.execCommand('insertHTML', false, html);
  } else {
    const col = `<div style="flex:1;padding:8px 12px;min-width:0;font-family:'Nunito',sans-serif;"><p style="margin:0;">Texto de columna</p></div>`;
    const html = `<div style="display:flex;gap:16px;margin:16px 0;">${col.repeat(n)}</div><p><br></p>`;
    editorEl.value.focus();
    document.execCommand('insertHTML', false, html);
  }
};

// ── Templates ─────────────────────────────────────────
const tplStyles = 'font-family:Nunito,sans-serif;';

const templates = [
  {
    key: 'blank',
    name: 'En blanco',
    thumb: '<div style="padding:6px;"><div style="height:6px;background:#e5e7eb;border-radius:3px;margin-bottom:4px;width:70%"></div><div style="height:4px;background:#e5e7eb;border-radius:3px;margin-bottom:3px;width:90%"></div><div style="height:4px;background:#e5e7eb;border-radius:3px;width:80%"></div></div>',
    html: '<p><br></p>',
  },
  {
    key: 'anuncio',
    name: 'Anuncio',
    thumb: '<div style="padding:4px;text-align:center;"><div style="height:8px;background:#237650;border-radius:3px;margin-bottom:4px;width:80%;margin-left:auto;margin-right:auto"></div><div style="height:4px;background:#d1fae5;border-radius:3px;margin-bottom:6px;width:90%;margin-left:auto;margin-right:auto"></div><div style="background:#237650;border-radius:4px;height:12px;width:40%;margin:0 auto;"></div></div>',
    html: `<div style="${tplStyles}text-align:center;padding:32px 0;">
  <h1 style="color:#237650;font-size:2rem;font-weight:900;margin-bottom:8px;">¡Gran Anuncio!</h1>
  <p style="color:#555;font-size:1.1rem;margin-bottom:24px;">Aquí va el subtítulo o descripción breve.</p>
  <p style="color:#333;line-height:1.7;">Contenido principal del correo. Escribe aquí toda la información que quieres compartir con tus suscriptores.</p>
  <br>
  <a href="#" style="background:#237650;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">Ver más</a>
</div><p><br></p>`,
  },
  {
    key: 'catalogo',
    name: 'Catálogo',
    thumb: '<div style="padding:4px;"><div style="height:6px;background:#237650;border-radius:3px;margin-bottom:5px;width:60%;margin-left:auto;margin-right:auto"></div><div style="display:flex;gap:3px;"><div style="flex:1;background:#f3f4f6;border-radius:4px;height:28px;"></div><div style="flex:1;background:#f3f4f6;border-radius:4px;height:28px;"></div></div></div>',
    html: `<div style="${tplStyles}">
  <h2 style="color:#237650;font-size:1.5rem;font-weight:800;text-align:center;margin-bottom:24px;">Nuestros Productos</h2>
  <div style="display:flex;gap:24px;">
    <div style="flex:1;text-align:center;">
      <div style="background:#f3f4f6;border-radius:12px;height:140px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><span style="color:#9ca3af;font-size:0.9rem;">Imagen</span></div>
      <h3 style="font-weight:800;color:#111;margin-bottom:4px;">Producto 1</h3>
      <p style="color:#555;font-size:0.9rem;">Descripción breve del producto.</p>
      <p style="color:#237650;font-weight:700;">$299 MXN</p>
    </div>
    <div style="flex:1;text-align:center;">
      <div style="background:#f3f4f6;border-radius:12px;height:140px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><span style="color:#9ca3af;font-size:0.9rem;">Imagen</span></div>
      <h3 style="font-weight:800;color:#111;margin-bottom:4px;">Producto 2</h3>
      <p style="color:#555;font-size:0.9rem;">Descripción breve del producto.</p>
      <p style="color:#237650;font-weight:700;">$499 MXN</p>
    </div>
  </div>
</div><p><br></p>`,
  },
  {
    key: 'evento',
    name: 'Evento',
    thumb: '<div style="padding:4px;"><div style="background:linear-gradient(135deg,#237650,#1a5a3c);border-radius:6px;height:22px;margin-bottom:4px;display:flex;align-items:center;justify-content:center;"><div style="height:4px;background:rgba(255,255,255,0.6);border-radius:2px;width:50%;"></div></div><div style="height:4px;background:#e5e7eb;border-radius:3px;margin-bottom:3px;width:90%"></div><div style="background:#237650;border-radius:4px;height:10px;width:35%;margin:0 auto;"></div></div>',
    html: `<div style="${tplStyles}">
  <div style="background:linear-gradient(135deg,#237650,#1a5a3c);border-radius:12px;padding:40px 32px;text-align:center;margin-bottom:24px;">
    <h1 style="color:white;font-size:2.2rem;font-weight:900;margin-bottom:8px;">Nombre del Evento</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;">Sábado 10 de Mayo · CDMX</p>
  </div>
  <p style="color:#333;line-height:1.8;font-size:1rem;">Descripción del evento. Incluye toda la información relevante: lugar, hora, cómo llegar y por qué no te lo puedes perder.</p>
  <br>
  <div style="text-align:center;">
    <a href="#" style="background:#237650;color:white;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:1.1rem;display:inline-block;">¡Quiero ir!</a>
  </div>
</div><p><br></p>`,
  },
];

const applyTemplate = (tpl) => {
  activeTemplate.value = tpl.key;
  editorEl.value.innerHTML = tpl.html;
};

// ── Actions ───────────────────────────────────────────
const enviarAhora = () => alert('✅ Newsletter enviado (conectar con backend)');
const programar   = () => {
  if (!scheduledAt.value) { alert('Selecciona una fecha y hora.'); return; }
  alert(`📅 Programado para: ${new Date(scheduledAt.value).toLocaleString('es-MX')}`);
};
const guardarBorrador = () => alert('💾 Borrador guardado (conectar con backend)');

// Init with blank
onMounted(() => { editorEl.value.innerHTML = '<p><br></p>'; });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

.editor-canvas { font-family: 'Nunito', sans-serif !important; color: #1f2937; line-height: 1.7; }
.editor-canvas:focus { outline: none; }
.editor-canvas * { font-family: 'Nunito', sans-serif !important; }
.editor-canvas h1 { font-size: 2rem; font-weight: 900; margin: 0.5em 0; }
.editor-canvas h2 { font-size: 1.5rem; font-weight: 800; margin: 0.5em 0; }
.editor-canvas h3 { font-size: 1.25rem; font-weight: 700; margin: 0.5em 0; }
.editor-canvas p  { margin: 0.4em 0; }
.editor-canvas img { max-width: 100%; border-radius: 10px; }
.editor-canvas a  { color: #237650; }
</style>

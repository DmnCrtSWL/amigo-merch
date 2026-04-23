import { ref } from 'vue'

// ── Shared reactive language state ────────────────────────────────────────────
export const currentLang = ref('ESP')

// ── Currency config – update rates as needed ─────────────────────────────────
const CURRENCY = {
  ESP: { symbol: '$',  code: 'MXN', toMXN: 1,     markup: 1    },
  ENG: { symbol: '$',  code: 'USD', toMXN: 19.5,   markup: 1.15 },
  FRA: { symbol: '€',  code: 'EUR', toMXN: 21.5,   markup: 1.15 },
}

// ── Price formatter ───────────────────────────────────────────────────────────
// Receives a price in MXN, applies 15% markup then converts.
export function formatPrice(mxnPrice) {
  const cfg = CURRENCY[currentLang.value] ?? CURRENCY.ESP
  if (cfg.code === 'MXN') {
    return `$${mxnPrice.toLocaleString('es-MX')} MXN`
  }
  const converted = Math.ceil((mxnPrice * cfg.markup) / cfg.toMXN)
  return `${cfg.symbol}${converted.toLocaleString('en-US')} ${cfg.code}`
}

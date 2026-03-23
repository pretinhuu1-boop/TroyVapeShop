/**
 * =============================================
 *  ALPHA PHONE — SISTEMA DE ESTOQUE
 * =============================================
 *  Como usar:
 *  1. Edite os números abaixo para refletir o estoque real.
 *  2. Chave: "série-variante-storage-cor" (tudo em minúsculo, espaços → "-")
 *  3. Valor: quantidade em estoque (0 = esgotado)
 *  4. Se uma chave NÃO existir aqui, o produto aparece como "disponível" para consulta via WhatsApp.
 *  5. Atualize ESTOQUE_ATUALIZADO com a data de hoje ao editar.
 *
 *  Exemplos de chaves:
 *    "16-pro-256gb-black-titanium"        → iPhone 16 Pro / 256GB / Black Titanium
 *    "15-promax-512gb-natural-titanium"   → iPhone 15 Pro Max / 512GB / Natural Titanium
 *    "14-standard-128gb-midnight"         → iPhone 14 / 128GB / Midnight
 * =============================================
 */

window.ESTOQUE_ATUALIZADO = "19/03/2026";

window.ESTOQUE = {
  /* ===== iPHONE 16 ===== */
  "16-standard-128gb-black":         3,
  "16-standard-128gb-teal":          2,
  "16-standard-128gb-ultramarine":   1,
  "16-standard-128gb-pink":          2,
  "16-standard-256gb-black":         2,
  "16-standard-256gb-teal":          1,
  "16-standard-256gb-ultramarine":   0,  // esgotado
  "16-standard-512gb-black":         1,
  "16-standard-512gb-teal":          0,

  "16-plus-128gb-black":             1,
  "16-plus-128gb-teal":              0,
  "16-plus-256gb-black":             2,

  "16-pro-128gb-black-titanium":     1,
  "16-pro-128gb-white-titanium":     2,
  "16-pro-128gb-natural-titanium":   1,
  "16-pro-128gb-desert-titanium":    0,
  "16-pro-256gb-black-titanium":     2,
  "16-pro-256gb-white-titanium":     1,
  "16-pro-256gb-natural-titanium":   0,
  "16-pro-512gb-black-titanium":     1,
  "16-pro-1tb-black-titanium":       0,

  "16-promax-256gb-black-titanium":  1,
  "16-promax-256gb-white-titanium":  0,
  "16-promax-512gb-black-titanium":  1,
  "16-promax-1tb-black-titanium":    0,

  "16-air-128gb-black":              2,
  "16-air-128gb-white":              1,
  "16-air-256gb-black":              1,

  /* ===== iPHONE 15 ===== */
  "15-standard-128gb-black":         3,
  "15-standard-128gb-blue":          2,
  "15-standard-128gb-pink":          1,
  "15-standard-256gb-black":         2,
  "15-standard-256gb-blue":          1,
  "15-standard-512gb-black":         0,

  "15-plus-128gb-black":             2,
  "15-plus-128gb-blue":              1,

  "15-pro-128gb-natural-titanium":   1,
  "15-pro-128gb-blue-titanium":      0,
  "15-pro-128gb-black-titanium":     2,
  "15-pro-256gb-natural-titanium":   1,
  "15-pro-512gb-natural-titanium":   0,

  "15-promax-256gb-natural-titanium": 1,
  "15-promax-256gb-black-titanium":  0,
  "15-promax-512gb-natural-titanium": 0,

  /* ===== iPHONE 14 ===== */
  "14-standard-128gb-midnight":      4,
  "14-standard-128gb-starlight":     3,
  "14-standard-128gb-blue":          2,
  "14-standard-128gb-purple":        1,
  "14-standard-256gb-midnight":      2,
  "14-standard-512gb-midnight":      0,

  "14-plus-128gb-midnight":          2,
  "14-plus-128gb-starlight":         1,

  "14-pro-128gb-space-black":        1,
  "14-pro-256gb-space-black":        2,
  "14-pro-256gb-deep-purple":        1,
  "14-pro-512gb-space-black":        0,

  "14-promax-256gb-space-black":     1,
  "14-promax-512gb-space-black":     0,

  /* ===== iPHONE 13 ===== */
  "13-standard-128gb-midnight":      5,
  "13-standard-128gb-starlight":     3,
  "13-standard-128gb-blue":          4,
  "13-standard-128gb-pink":          2,
  "13-standard-256gb-midnight":      3,
  "13-standard-512gb-midnight":      1,

  "13-mini-128gb-midnight":          2,
  "13-mini-128gb-blue":              1,

  "13-pro-128gb-graphite":           2,
  "13-pro-128gb-sierra-blue":        1,
  "13-pro-256gb-graphite":           1,

  "13-promax-128gb-graphite":        1,
  "13-promax-256gb-graphite":        0,

  /* ===== iPHONE 12 ===== */
  "12-standard-64gb-black":          3,
  "12-standard-128gb-black":         4,
  "12-standard-128gb-blue":          2,
  "12-standard-128gb-green":         1,

  "12-mini-64gb-black":              2,
  "12-mini-128gb-black":             3,

  "12-pro-128gb-graphite":           1,
  "12-pro-256gb-graphite":           0,

  "12-promax-128gb-graphite":        1,
  "12-promax-256gb-graphite":        0,

  /* ===== iPHONE 17 (pré-venda / sob consulta) ===== */
  /* Deixe sem chave para aparecer como "Consultar via WhatsApp" */
};

/* ===== HELPERS ===== */

/**
 * Gera a chave padronizada para lookup no ESTOQUE.
 * @param {string|number} seriesKey - ex: "16"
 * @param {string} variantKey       - ex: "pro"
 * @param {string} storage          - ex: "256GB"
 * @param {string} colorName        - ex: "Black Titanium"
 */
window.estoqueKey = function(seriesKey, variantKey, storage, colorName) {
  return [
    String(seriesKey),
    String(variantKey),
    storage.toLowerCase().replace(/\s+/g, ''),
    colorName.toLowerCase().replace(/\s+/g, '-')
  ].join('-');
};

/**
 * Retorna quantidade em estoque.
 * Se a chave não existir, retorna Infinity (= sempre disponível / consultar).
 */
window.getEstoque = function(key) {
  if (key in window.ESTOQUE) return window.ESTOQUE[key];
  return Infinity; // não cadastrado → consultar via WhatsApp
};

/**
 * Verifica se alguma configuração da série tem estoque > 0.
 */
window.serieTemEstoque = function(seriesKey) {
  const prefix = String(seriesKey) + '-';
  for (const k in window.ESTOQUE) {
    if (k.startsWith(prefix) && window.ESTOQUE[k] > 0) return true;
  }
  // Se nenhuma chave da série existir no ESTOQUE, considera disponível
  const hasSomeKey = Object.keys(window.ESTOQUE).some(k => k.startsWith(prefix));
  return !hasSomeKey;
};

/**
 * Retorna o menor estoque de uma série (mínimo entre todas as configs cadastradas).
 * Retorna Infinity se nenhuma config cadastrada.
 */
window.serieMinEstoque = function(seriesKey) {
  const prefix = String(seriesKey) + '-';
  const vals = Object.entries(window.ESTOQUE)
    .filter(([k]) => k.startsWith(prefix))
    .map(([, v]) => v);
  if (vals.length === 0) return Infinity;
  return Math.min(...vals);
};

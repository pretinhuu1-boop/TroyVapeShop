/**
 * WhatsApp integration — TroyAgent
 * Centraliza o número e mensagens pré-formatadas para o WhatsApp.
 */

const WHATSAPP_NUMBER = '595975402915';

/**
 * Gera URL do WhatsApp com mensagem pré-formatada.
 * @param {string} [context] - Contexto opcional (nome do produto, página, etc.)
 * @returns {string} URL wa.me
 */
export function getWhatsAppURL(context) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!context) {
    return `${base}?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre os compostos da TAURA Research.')}`;
  }
  return `${base}?text=${encodeURIComponent(`Olá! Gostaria de mais informações sobre: ${context}`)}`;
}

export default getWhatsAppURL;

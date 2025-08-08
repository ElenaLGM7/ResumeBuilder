// === lang.js ===

import langData from './lang.json' assert { type: 'json' };

const defaultLang = localStorage.getItem('lang') || 'es';
let currentLang = defaultLang;

// Detectar y aplicar idioma
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const langSelector = document.getElementById('lang-select');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', (e) => {
      const selected = e.target.value;
      setLanguage(selected);
      localStorage.setItem('lang', selected);
    });
  }
});

// Aplicar traducción a todos los elementos con [data-i18n]
function setLanguage(lang) {
  currentLang = lang;
  const translations = langData[lang];

  if (!translations) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[key];
    if (text) {
      el.innerHTML = text;
    }
  });

  // Placeholder y títulos
  document.querySelectorAll('[data-placeholder]').forEach(el => {
    const key = el.getAttribute('data-placeholder');
    const text = translations[key];
    if (text) {
      el.setAttribute('placeholder', text);
    }
  });

  document.querySelectorAll('[data-title]').forEach(el => {
    const key = el.getAttribute('data-title');
    const text = translations[key];
    if (text) {
      el.setAttribute('title', text);
    }
  });

  // Actualizar idioma actual en HTML
  document.documentElement.setAttribute('lang', lang);
}

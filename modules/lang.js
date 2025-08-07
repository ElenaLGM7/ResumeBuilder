// modules/lang.js

let translations = {};
let currentLang = 'es'; // idioma por defecto

export async function loadTranslations() {
  const res = await fetch('./lang.json');
  translations = await res.json();
  applyTranslations();
}

export function changeLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
  }
}

function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      if (el.placeholder !== undefined && el.tagName === 'INPUT') {
        el.placeholder = translations[currentLang][key];
      } else {
        el.textContent = translations[currentLang][key];
      }
    }
  });
}

export function initLanguageSelector() {
  const saved = localStorage.getItem('lang');
  if (saved) {
    currentLang = saved;
  }
  loadTranslations();

  const selector = document.getElementById('lang-select');
  if (selector) {
    selector.value = currentLang;
    selector.addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });
  }
}

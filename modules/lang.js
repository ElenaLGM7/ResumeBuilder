import translations from './lang.json' assert { type: 'json' };

export function setLanguage(lang) {
  localStorage.setItem('language', lang);
  applyTranslations(lang);
}

export function getSavedLanguage() {
  return localStorage.getItem('language') || 'es';
}

export function applyTranslations(lang) {
  const t = translations[lang] || translations['es'];

  document.getElementById('app-title').textContent = t.title;
  document.getElementById('app-subtitle').textContent = t.subtitle;
  document.querySelector('label[for="name"]').textContent = t.name;
  document.querySelector('label[for="email"]').textContent = t.email;
  document.querySelector('label[for="phone"]').textContent = t.phone;
  document.querySelector('label[for="summary"]').textContent = t.summary;
  document.querySelector('label[for="experience"]').textContent = t.experience;
  document.querySelector('label[for="education"]').textContent = t.education;
  document.querySelector('label[for="skills"]').textContent = t.skills;
  document.getElementById('generate-btn').textContent = t.generate;
  document.getElementById('download-btn').textContent = t.download;
  document.getElementById('preview-title').textContent = t.preview;
  document.querySelector('footer').textContent = t.footer;
  document.querySelector('label[for="lang-select"]').textContent = t.language;
}

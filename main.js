import { setLanguage, applyTranslations } from './modules/lang.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resumeForm');
  const output = document.getElementById('cvOutput');
  const langSelect = document.getElementById('langSelect');

  // Persistir idioma seleccionado
  const savedLang = localStorage.getItem('lang') || 'es';
  langSelect.value = savedLang;
  setLanguage(savedLang).then(applyTranslations);

  // Cambiar idioma dinámicamente
  langSelect.addEventListener('change', async () => {
    const selectedLang = langSelect.value;
    localStorage.setItem('lang', selectedLang);
    await setLanguage(selectedLang);
    applyTranslations();
  });

  // Manejar envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const profession = document.getElementById('profession').value.trim();
    const summary = document.getElementById('summary').value.trim();
    const skills = document.getElementById('skills').value.trim().split(',');
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();

    output.innerHTML = `
      <h2 data-i18n="generated_title">Generated Resume</h2>
      <p><strong data-i18n="full_name">Full Name:</strong> ${fullName}</p>
      <p><strong data-i18n="profession">Profession:</strong> ${profession}</p>
      <p><strong data-i18n="summary">Summary:</strong> ${summary}</p>
      <p><strong data-i18n="skills">Skills:</strong></p>
      <ul>
        ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
      </ul>
      <p><strong data-i18n="experience">Experience:</strong></p>
      <p>${experience}</p>
      <p><strong data-i18n="education">Education:</strong></p>
      <p>${education}</p>
    `;

    applyTranslations(); // Volver a aplicar traducciones
    output.classList.remove('hidden');
    output.scrollIntoView({ behavior: 'smooth' });
  });
});

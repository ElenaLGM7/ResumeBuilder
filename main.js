import { lang } from './modules/lang.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resume-form');
  const preview = document.getElementById('resume-preview');
  const langSelect = document.getElementById('lang-select');
  const previewTitle = document.getElementById('preview-title');

  // Idioma actual
  let currentLang = localStorage.getItem('lang') || 'es';

  // Aplicar idioma actual
  const applyLanguage = () => {
    const texts = lang[currentLang];
    document.querySelector('header h1').textContent = texts.title;
    document.querySelector('header p').textContent = texts.subtitle;
    previewTitle.textContent = texts.preview;

    // Inputs
    form.fullname.previousElementSibling.textContent = texts.fullname;
    form.title.previousElementSibling.textContent = texts.title_label;
    form.summary.previousElementSibling.textContent = texts.summary;
    form.experience.previousElementSibling.textContent = texts.experience;
    form.education.previousElementSibling.textContent = texts.education;
    form.skills.previousElementSibling.textContent = texts.skills;

    // Botones
    document.getElementById('generate-btn').textContent = texts.generate;
    document.getElementById('download-btn').textContent = texts.download;
    document.getElementById('reset-btn').textContent = texts.reset;
  };

  // Cambiar idioma
  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    applyLanguage();
  });

  // Inicializar idioma
  langSelect.value = currentLang;
  applyLanguage();

  // Generar vista previa
  document.getElementById('generate-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
      fullname: form.fullname.value,
      title: form.title.value,
      summary: form.summary.value,
      experience: form.experience.value,
      education: form.education.value,
      skills: form.skills.value,
    };

    const texts = lang[currentLang];

    const resume = `
${data.fullname}
${data.title}

${texts.summary}:
${data.summary}

${texts.experience}:
${data.experience}

${texts.education}:
${data.education}

${texts.skills}:
${data.skills}
    `.trim();

    preview.textContent = resume;
  });

  // Descargar como .txt
  document.getElementById('download-btn').addEventListener('click', () => {
    const blob = new Blob([preview.textContent], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'curriculum.txt';
    a.click();
  });

  // Resetear
  document.getElementById('reset-btn').addEventListener('click', () => {
    form.reset();
    preview.textContent = '';
  });
});

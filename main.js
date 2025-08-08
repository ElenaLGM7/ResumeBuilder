// main.js
import translations from './modules/lang.js';

const elements = {
  title: document.getElementById('title'),
  formTitle: document.getElementById('formTitle'),
  previewTitle: document.getElementById('previewTitle'),
  fullNameLabel: document.getElementById('label-fullName'),
  emailLabel: document.getElementById('label-email'),
  phoneLabel: document.getElementById('label-phone'),
  linkedInLabel: document.getElementById('label-linkedIn'),
  githubLabel: document.getElementById('label-github'),
  skillsLabel: document.getElementById('label-skills'),
  educationLabel: document.getElementById('label-education'),
  experienceLabel: document.getElementById('label-experience'),

  langButtons: {
    es: document.getElementById('lang-es'),
    en: document.getElementById('lang-en'),
    gl: document.getElementById('lang-gl'),
  },

  form: document.getElementById('resume-form'),
  inputs: {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    linkedIn: document.getElementById('linkedIn'),
    github: document.getElementById('github'),
    skills: document.getElementById('skills'),
    education: document.getElementById('education'),
    experience: document.getElementById('experience'),
  },

  buttons: {
    generate: document.getElementById('generateBtn'),
    clear: document.getElementById('clearBtn'),
    export: document.getElementById('exportBtn'),
  },

  preview: document.getElementById('resumePreview'),
};

let currentLang = localStorage.getItem('lang') || 'es';

// Cambia idioma y actualiza texto
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  const t = translations[lang];

  elements.title.textContent = t.title;
  elements.formTitle.textContent = t.formTitle;
  elements.previewTitle.textContent = t.previewTitle;

  elements.fullNameLabel.textContent = t.fullName;
  elements.emailLabel.textContent = t.email;
  elements.phoneLabel.textContent = t.phone;
  elements.linkedInLabel.textContent = t.linkedIn;
  elements.githubLabel.textContent = t.github;
  elements.skillsLabel.textContent = t.skills;
  elements.educationLabel.textContent = t.education;
  elements.experienceLabel.textContent = t.experience;

  elements.buttons.generate.textContent = t.generateBtn;
  elements.buttons.clear.textContent = t.clearBtn;
  elements.buttons.export.textContent = t.exportBtn;
}

// Genera vista previa del CV formateado
function generatePreview() {
  const data = elements.inputs;

  const previewText = 
`${data.fullName.value || '[Nombre]'}
${data.email.value || '[Email]'}
${data.phone.value ? `${translations[currentLang].phone}: ${data.phone.value}` : ''}
${data.linkedIn.value ? `${translations[currentLang].linkedIn}: ${data.linkedIn.value}` : ''}
${data.github.value ? `${translations[currentLang].github}: ${data.github.value}` : ''}

${translations[currentLang].skills}:
${data.skills.value || '[Lista tus habilidades]'}

${translations[currentLang].education}:
${data.education.value || '[Tu educación]'}

${translations[currentLang].experience}:
${data.experience.value || '[Tu experiencia laboral]'}`;

  elements.preview.textContent = previewText.trim();
}

// Limpia formulario y vista previa
function clearForm() {
  elements.form.reset();
  elements.preview.textContent = '';
}

// Exporta texto de vista previa a archivo .txt
function exportToTxt() {
  const text = elements.preview.textContent;
  if (!text.trim()) {
    alert(translations[currentLang].alertNoPreview);
    return;
  }

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// Añade event listeners a botones y selección idioma
function addEventListeners() {
  Object.entries(elements.langButtons).forEach(([lang, btn]) => {
    btn.addEventListener('click', () => {
      setLanguage(lang);
      generatePreview(); // Actualizar preview texto idioma
    });
  });

  elements.buttons.generate.addEventListener('click', generatePreview);
  elements.buttons.clear.addEventListener('click', clearForm);
  elements.buttons.export.addEventListener('click', exportToTxt);
}

// Inicializa app
function init() {
  setLanguage(currentLang);
  addEventListeners();
}

init();

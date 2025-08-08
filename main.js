// main.js
import translations from './modules/lang.js';

const elements = {
  title: document.getElementById('title'),
  formTitle: document.getElementById('formTitle'),
  previewTitle: document.getElementById('previewTitle'),
  preview: document.getElementById('preview'),

  langButtons: document.querySelectorAll('nav button'),

  form: document.getElementById('resume-form'),

  labels: {
    fullName: document.getElementById('labelFullName'),
    email: document.getElementById('labelEmail'),
    phone: document.getElementById('labelPhone'),
    linkedIn: document.getElementById('labelLinkedIn'),
    github: document.getElementById('labelGitHub'),
    skills: document.getElementById('labelSkills'),
    education: document.getElementById('labelEducation'),
    experience: document.getElementById('labelExperience'),
  },

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

  generateBtn: document.getElementById('generateBtn'),
  clearBtn: document.getElementById('clearBtn'),
  exportBtn: document.getElementById('exportBtn'),
};

let currentLang = localStorage.getItem('lang') || 'es';

function translatePage(lang) {
  const t = translations[lang];
  elements.title.textContent = t.title;
  elements.formTitle.textContent = t.formTitle;
  elements.previewTitle.textContent = t.previewTitle;

  elements.labels.fullName.textContent = t.labels.fullName;
  elements.labels.email.textContent = t.labels.email;
  elements.labels.phone.textContent = t.labels.phone;
  elements.labels.linkedIn.textContent = t.labels.linkedIn;
  elements.labels.github.textContent = t.labels.github;
  elements.labels.skills.textContent = t.labels.skills;
  elements.labels.education.textContent = t.labels.education;
  elements.labels.experience.textContent = t.labels.experience;

  elements.generateBtn.textContent = t.buttons.generate;
  elements.clearBtn.textContent = t.buttons.clear;
  elements.exportBtn.textContent = t.buttons.export;

  // Update active button
  elements.langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function generatePreview() {
  const data = elements.inputs;
  let text = `${translations[currentLang].previewTitle}\n\n`;
  text += `${translations[currentLang].labels.fullName}: ${data.fullName.value}\n`;
  text += `${translations[currentLang].labels.email}: ${data.email.value}\n`;
  text += `${translations[currentLang].labels.phone}: ${data.phone.value}\n`;
  text += `${translations[currentLang].labels.linkedIn}: ${data.linkedIn.value}\n`;
  text += `${translations[currentLang].labels.github}: ${data.github.value}\n\n`;
  text += `${translations[currentLang].labels.skills}:\n${data.skills.value}\n\n`;
  text += `${translations[currentLang].labels.education}:\n${data.education.value}\n\n`;
  text += `${translations[currentLang].labels.experience}:\n${data.experience.value}\n`;

  elements.preview.textContent = text;
}

function clearForm() {
  elements.form.reset();
  elements.preview.textContent = '';
}

function exportTextFile() {
  const text = elements.preview.textContent;
  if (!text) {
    alert(translations[currentLang].alerts.nothingToExport);
    return;
  }
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

elements.langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem('lang', currentLang);
    translatePage(currentLang);
    generatePreview();
  });
});

elements.generateBtn.addEventListener('click', e => {
  e.preventDefault();
  generatePreview();
});

elements.clearBtn.addEventListener('click', e => {
  e.preventDefault();
  clearForm();
});

elements.exportBtn.addEventListener('click', e => {
  e.preventDefault();
  exportTextFile();
});

// Inicializamos la página
translatePage(currentLang);
generatePreview();

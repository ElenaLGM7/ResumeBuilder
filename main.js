import langData from './modules/lang.js';

const elements = {
  languageSelect: document.getElementById('language-select'),
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  linkedIn: document.getElementById('linkedin'),
  github: document.getElementById('github'),
  skills: document.getElementById('skills'),
  education: document.getElementById('education'),
  experience: document.getElementById('experience'),
  preview: document.getElementById('preview'),
  generateBtn: document.getElementById('generate-btn'),
  clearBtn: document.getElementById('clear-btn'),
  exportBtn: document.getElementById('export-btn'),
  title: document.getElementById('title'),
  formTitle: document.getElementById('form-title'),
  previewTitle: document.getElementById('preview-title'),
};

let currentLang = localStorage.getItem('selectedLang') || 'en';

function setTextContentByLang() {
  const texts = langData[currentLang];
  elements.title.textContent = texts.title;
  elements.formTitle.textContent = texts.formTitle;
  elements.previewTitle.textContent = texts.previewTitle;

  // Labels
  document.querySelector('label[for="fullName"]').textContent = texts.fullName;
  document.querySelector('label[for="email"]').textContent = texts.email;
  document.querySelector('label[for="phone"]').textContent = texts.phone;
  document.querySelector('label[for="linkedin"]').textContent = texts.linkedIn;
  document.querySelector('label[for="github"]').textContent = texts.github;
  document.querySelector('label[for="skills"]').textContent = texts.skills;
  document.querySelector('label[for="education"]').textContent = texts.education;
  document.querySelector('label[for="experience"]').textContent = texts.experience;

  // Buttons
  elements.generateBtn.textContent = texts.generateBtn;
  elements.clearBtn.textContent = texts.clearBtn;
  elements.exportBtn.textContent = texts.exportBtn;
}

function saveDataToLocalStorage() {
  const data = {
    fullName: elements.fullName.value,
    email: elements.email.value,
    phone: elements.phone.value,
    linkedin: elements.linkedIn.value,
    github: elements.github.value,
    skills: elements.skills.value,
    education: elements.education.value,
    experience: elements.experience.value,
    lang: currentLang,
  };
  localStorage.setItem('resumeData', JSON.stringify(data));
  localStorage.setItem('selectedLang', currentLang);
}

function loadDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('resumeData'));
  if (data) {
    elements.fullName.value = data.fullName || '';
    elements.email.value = data.email || '';
    elements.phone.value = data.phone || '';
    elements.linkedIn.value = data.linkedin || '';
    elements.github.value = data.github || '';
    elements.skills.value = data.skills || '';
    elements.education.value = data.education || '';
    elements.experience.value = data.experience || '';
    if (data.lang) {
      currentLang = data.lang;
      elements.languageSelect.value = currentLang;
    }
  }
}

function generateResumeText() {
  const t = langData[currentLang];
  return `
${t.title}
${'-'.repeat(t.title.length)}

${t.fullName}: ${elements.fullName.value}
${t.email}: ${elements.email.value}
${t.phone}: ${elements.phone.value}
${t.linkedIn}: ${elements.linkedIn.value}
${t.github}: ${elements.github.value}

${t.skills}:
${elements.skills.value}

${t.education}:
${elements.education.value}

${t.experience}:
${elements.experience.value}
`;
}

function updatePreview() {
  elements.preview.textContent = generateResumeText();
}

function clearForm() {
  elements.fullName.value = '';
  elements.email.value = '';
  elements.phone.value = '';
  elements.linkedIn.value = '';
  elements.github.value = '';
  elements.skills.value = '';
  elements.education.value = '';
  elements.experience.value = '';
  updatePreview();
  saveDataToLocalStorage();
}

function exportToTxt() {
  const text = generateResumeText();
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'resume.txt';
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

elements.languageSelect.value = currentLang;
setTextContentByLang();
loadDataFromLocalStorage();
updatePreview();

elements.languageSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  setTextContentByLang();
  updatePreview();
  saveDataToLocalStorage();
});

[
  elements.fullName,
  elements.email,
  elements.phone,
  elements.linkedIn,
  elements.github,
  elements.skills,
  elements.education,
  elements.experience,
].forEach((input) => {
  input.addEventListener('input', () => {
    updatePreview();
    saveDataToLocalStorage();
  });
});

elements.generateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  updatePreview();
  saveDataToLocalStorage();
});

elements.clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm(langData[currentLang].confirmClear)) {
    clearForm();
  }
});

elements.exportBtn.addEventListener('click', (e) => {
  e.preventDefault();
  exportToTxt();
});

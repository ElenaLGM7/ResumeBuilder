import langData from './lang.json' assert { type: 'json' };

// Variables globales
let currentLang = localStorage.getItem('resumeLang') || 'es';
let currentTheme = localStorage.getItem('resumeTheme') || 'light';

// Referencias DOM
const elements = {
  title: document.querySelector('h1#title'),
  subtitle: document.querySelector('p#subtitle'),
  formTitle: document.querySelector('h2#form-title'),
  nameLabel: document.querySelector('label[for="name"]'),
  surnameLabel: document.querySelector('label[for="surname"]'),
  emailLabel: document.querySelector('label[for="email"]'),
  phoneLabel: document.querySelector('label[for="phone"]'),
  summaryLabel: document.querySelector('label[for="summary"]'),
  educationLabel: document.querySelector('label[for="education"]'),
  experienceLabel: document.querySelector('label[for="experience"]'),
  skillsLabel: document.querySelector('label[for="skills"]'),
  languagesLabel: document.querySelector('label[for="languages"]'),

  langSelect: document.querySelector('#select-lang'),
  themeSelect: document.querySelector('#theme-select'),
  templateSelect: document.querySelector('#select-template'),

  addSectionBtn: document.querySelector('#add-section-btn'),
  generateBtn: document.querySelector('#generate-btn'),
  downloadBtn: document.querySelector('#download-btn'),
  resetBtn: document.querySelector('#reset-btn'),

  previewArea: document.querySelector('#preview'),
  form: document.querySelector('form#resume-form'),

  sectionsContainer: document.querySelector('#dynamic-sections')
};

// Inicialización

function setTextLang(lang) {
  const text = langData[lang];
  if (!text) return;
  elements.title.textContent = text.title;
  elements.subtitle.textContent = text.subtitle;
  elements.formTitle.textContent = text['form-title'];
  elements.nameLabel.textContent = text.name;
  elements.surnameLabel.textContent = text.surname;
  elements.emailLabel.textContent = text.email;
  elements.phoneLabel.textContent = text.phone;
  elements.summaryLabel.textContent = text.summary;
  elements.educationLabel.textContent = text.education;
  elements.experienceLabel.textContent = text.experience;
  elements.skillsLabel.textContent = text.skills;
  elements.languagesLabel.textContent = text.languages;

  elements.addSectionBtn.textContent = text['add-section'];
  elements.generateBtn.textContent = text.generate;
  elements.downloadBtn.textContent = text.download;
  elements.resetBtn.textContent = text.reset;
  elements.langSelect.querySelector('option[value="es"]').textContent = "Español";
  elements.langSelect.querySelector('option[value="en"]').textContent = "English";
  elements.langSelect.querySelector('option[value="gl"]').textContent = "Galego";
  elements.themeSelect.querySelector('option[value="light"]').textContent = text.light;
  elements.themeSelect.querySelector('option[value="dark"]').textContent = text.dark;
  elements.templateSelect.querySelector('option[value="template1"]').textContent = text['select-template'];
  elements.langSelect.setAttribute('aria-label', text['select-lang']);
  elements.themeSelect.setAttribute('aria-label', text['theme-label']);
}

// Cambiar idioma
elements.langSelect.value = currentLang;
elements.langSelect.addEventListener('change', e => {
  currentLang = e.target.value;
  localStorage.setItem('resumeLang', currentLang);
  setTextLang(currentLang);
  renderPreview();
});

// Cambiar tema
elements.themeSelect.value = currentTheme;
elements.themeSelect.addEventListener('change', e => {
  currentTheme = e.target.value;
  localStorage.setItem('resumeTheme', currentTheme);
  document.body.setAttribute('data-theme', currentTheme);
});

// Añadir sección dinámica
elements.addSectionBtn.addEventListener('click', () => {
  // Añadir una nueva sección editable para experiencia o educación u otra
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'dynamic-section';

  const select = document.createElement('select');
  select.name = 'section-type';
  ['education', 'experience', 'skills', 'languages'].forEach(type => {
    const opt = document.createElement('option');
    opt.value = type;
    opt.textContent = langData[currentLang][type];
    select.appendChild(opt);
  });
  sectionDiv.appendChild(select);

  const textarea = document.createElement('textarea');
  textarea.name = 'section-content';
  textarea.rows = 3;
  textarea.placeholder = langData[currentLang]['add-section'] + '...';
  sectionDiv.appendChild(textarea);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '✖';
  removeBtn.title = 'Eliminar sección';
  removeBtn.addEventListener('click', () => {
    sectionDiv.remove();
    renderPreview();
  });
  sectionDiv.appendChild(removeBtn);

  elements.sectionsContainer.appendChild(sectionDiv);
});

// Render preview
function renderPreview() {
  const name = elements.form.name.value.trim();
  const surname = elements.form.surname.value.trim();
  const email = elements.form.email.value.trim();
  const phone = elements.form.phone.value.trim();
  const summary = elements.form.summary.value.trim();

  // Limpiamos preview
  elements.previewArea.innerHTML = '';

  const h1 = document.createElement('h1');
  h1.textContent = `${name} ${surname}`;
  elements.previewArea.appendChild(h1);

  const contactP = document.createElement('p');
  contactP.textContent = `${email} | ${phone}`;
  elements.previewArea.appendChild(contactP);

  if (summary) {
    const summaryH2 = document.createElement('h2');
    summaryH2.textContent = langData[currentLang].summary;
    elements.previewArea.appendChild(summaryH2);

    const summaryP = document.createElement('p');
    summaryP.textContent = summary;
    elements.previewArea.appendChild(summaryP);
  }

  // Agrupar secciones dinámicas por tipo
  const sections = {};
  const dynSections = elements.sectionsContainer.querySelectorAll('.dynamic-section');
  dynSections.forEach(div => {
    const type = div.querySelector('select').value;
    const content = div.querySelector('textarea').value.trim();
    if (!content) return;
    if (!sections[type]) sections[type] = [];
    sections[type].push(content);
  });

  Object.entries(sections).forEach(([type, contents]) => {
    const h2 = document.createElement('h2');
    h2.textContent = langData[currentLang][type];
    elements.previewArea.appendChild(h2);
    contents.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      elements.previewArea.appendChild(p);
    });
  });
}

// Actualizar preview al cambiar formulario
elements.form.addEventListener('input', renderPreview);
elements.sectionsContainer.addEventListener('input', renderPreview);

// Generar PDF
import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";

elements.generateBtn.addEventListener('click', () => {
  renderPreview(); // Aseguramos que preview esté actualizado
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Simple render de texto en PDF
  let y = 10;
  doc.setFontSize(22);
  doc.text(elements.previewArea.querySelector('h1').textContent, 10, y);
  y += 10;

  const contactText = elements.previewArea.querySelector('p').textContent;
  doc.setFontSize(12);
  doc.text(contactText, 10, y);
  y += 15;

  [...elements.previewArea.querySelectorAll('h2')].forEach(h2 => {
    doc.setFontSize(16);
    doc.text(h2.textContent, 10, y);
    y += 8;
    const nextElems = [];
    let nextSibling = h2.nextElementSibling;
    while(nextSibling && nextSibling.tagName.toLowerCase() === 'p') {
      nextElems.push(nextSibling);
      nextSibling = nextSibling.nextElementSibling;
    }
    doc.setFontSize(12);
    nextElems.forEach(p => {
      let lines = doc.splitTextToSize(p.textContent, 180);
      doc.text(lines, 10, y);
      y += lines.length * 7;
    });
    y += 5;
  });

  // Mostrar botón descargar y habilitarlo
  elements.downloadBtn.disabled = false;
  elements.downloadBtn.onclick = () => doc.save('curriculum.pdf');
});

// Descargar PDF (inicialmente deshabilitado)
elements.downloadBtn.disabled = true;

// Reset
elements.resetBtn.addEventListener('click', () => {
  elements.form.reset();
  elements.sectionsContainer.innerHTML = '';
  elements.previewArea.innerHTML = '';
  elements.downloadBtn.disabled = true;
  renderPreview();
});

// Inicialización
document.body.setAttribute('data-theme', currentTheme);
setTextLang(currentLang);
renderPreview();


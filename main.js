// main.js

import { getFormData } from './modules/form.js';
import { renderPreview } from './modules/preview.js';
import { downloadPDF } from './modules/pdf.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resume-form');
  const pdfBtn = document.getElementById('download-pdf');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    renderPreview(data);
  });

  pdfBtn.addEventListener('click', downloadPDF);
});

// modules/preview.js

export function renderPreview(data) {
  const previewDiv = document.getElementById('cv-preview');

  const content = `
  ${data.name}\n${data.email}\n\n
  ${data.summary}\n\n
  Experience:\n${data.experience}\n\n
  Education:\n${data.education}\n\n
  Skills:\n${data.skills}
  `;

  previewDiv.textContent = content;
}

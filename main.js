document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cvForm');
  const output = document.getElementById('cvOutput');
  const section = document.getElementById('cvSection');
  const downloadBtn = document.getElementById('downloadTxtBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const summary = document.getElementById('summary').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();

    const cv = `
📌 ${name}
📧 ${email}

📝 Resumen Profesional:
${summary}

💼 Experiencia Laboral:
${experience}

🎓 Educación:
${education}

🛠️ Habilidades:
${skills}
`;

    output.textContent = cv;
    section.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');
  });

  downloadBtn.addEventListener('click', () => {
    const cvText = output.innerText;
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Mi_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

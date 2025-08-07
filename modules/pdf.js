// modules/pdf.js

export function downloadPDF() {
  const element = document.getElementById('cv-preview');

  const options = {
    margin:       0.5,
    filename:     'mi-cv.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(options).from(element).save();
}

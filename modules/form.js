// modules/form.js

export function getFormData() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const summary = document.getElementById('summary').value.trim();
  const experience = document.getElementById('experience').value.trim();
  const education = document.getElementById('education').value.trim();
  const skills = document.getElementById('skills').value.trim();

  return {
    name,
    email,
    summary,
    experience,
    education,
    skills
  };
}

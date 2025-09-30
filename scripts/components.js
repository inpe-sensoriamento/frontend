
function includeHTML() {
  const elements = document.querySelectorAll('[include-html]');
  if (elements.length === 0) return;
  elements.forEach(el => {
    const file = el.getAttribute('include-html');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar ' + file);
        return response.text();
      })
      .then(data => {
        const fragment = document.createRange().createContextualFragment(data);
        el.parentNode.insertBefore(fragment, el);
        el.parentNode.removeChild(el);
        includeHTML();
      })
      .catch(err => {
        el.innerHTML = '<span style="color:red">' + err.message + '</span>';
      });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', includeHTML);
} else {
  includeHTML();
}
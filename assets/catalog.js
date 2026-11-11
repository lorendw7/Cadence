/* Local catalogue only. Filters do not store data or make network requests. */
'use strict';
(() => {
  const search = document.getElementById('search');
  const family = document.getElementById('family');
  const groups = [...document.querySelectorAll('[data-group]')];
  const cards = [...document.querySelectorAll('[data-asset]')];
  const count = document.getElementById('result-count');
  function filter() {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const group of groups) {
      let matches = 0;
      for (const card of group.querySelectorAll('[data-asset]')) {
        const text = (card.dataset.search + ' ' + group.dataset.group).toLowerCase();
        const show = (family.value === 'all' || family.value === group.id) && words.every(word => text.includes(word));
        card.hidden = !show;
        if (show) matches++;
      }
      group.hidden = matches === 0;
      visible += matches;
    }
    count.textContent = `${visible} of ${cards.length} assets shown`;
    document.getElementById('no-results').hidden = visible !== 0;
  }
  search.addEventListener('input', filter);
  family.addEventListener('change', filter);
  document.getElementById('clear').addEventListener('click', () => {
    search.value = '';
    family.value = 'all';
    filter();
    search.focus();
  });
  document.getElementById('filters').hidden = false;
  filter();
})();

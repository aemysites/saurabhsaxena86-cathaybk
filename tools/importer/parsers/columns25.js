/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main wrapper
  const wrap = element.querySelector('.cubre-m-anchor__wrap');
  if (!wrap) return;

  // Get the nav (left/center column)
  const nav = wrap.querySelector('.cubre-m-anchor__nav');
  // Get the button area (right column, if present)
  const kvBtn = wrap.querySelector('.cubre-m-anchor__kvBtn');

  // Prepare the first cell: a <ul> of nav items
  let navCell = '';
  if (nav) {
    const btns = nav.querySelectorAll('.cubre-m-anchor__btn');
    if (btns.length > 0) {
      const ul = document.createElement('ul');
      btns.forEach(btn => {
        const p = btn.querySelector('p');
        const li = document.createElement('li');
        if (p) {
          li.textContent = p.textContent.trim();
        } else {
          li.textContent = btn.textContent.trim();
        }
        ul.appendChild(li);
      });
      navCell = ul;
    }
  }

  // Prepare the second cell: the button/link (if any)
  let btnCell = '';
  if (kvBtn) {
    const btn = kvBtn.querySelector('a');
    if (btn) {
      btnCell = btn;
    }
  }

  // If only one column, add empty string for the second column
  const rowCells = btnCell ? [navCell, btnCell] : [navCell, ''];

  // Table header MUST match exactly
  const cells = [
    ['Columns (columns25)'],
    rowCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

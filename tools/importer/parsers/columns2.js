/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab buttons as columns
  const links = Array.from(element.querySelectorAll(':scope > .swiper-wrapper > a.cubre-m-tab__btn'));
  // Defensive: exit if none
  if (!links.length) return;

  // Prepare column content
  const colCells = links.map(link => {
    const p = link.querySelector('p');
    if (p) return p;
    return document.createTextNode(link.textContent.trim());
  });

  // The header must be a single string, so one-column header
  const headerRow = ['Columns (columns2)'];

  // Table has 2 rows: header (1 column), content row (N columns)
  const cells = [
    headerRow,
    colCells
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

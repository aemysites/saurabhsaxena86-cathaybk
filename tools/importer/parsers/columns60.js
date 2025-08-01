/* global WebImporter */
export default function parse(element, { document }) {
  // Get all .cubre-o-graphic__item blocks (these are the columns)
  const items = element.querySelectorAll('.cubre-o-graphic__item');
  if (!items.length) return;

  // Header row: single cell with the exact text
  const headerRow = ['Columns block (columns60)'];

  // Content row: one cell per column (each .cubre-o-graphic__item)
  const contentRow = Array.from(items);

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the wrapper containing the columns
  const wrap = element.querySelector('.cubre-o-block__wrap');
  if (!wrap) return;
  // Each cubre-o-card__item is a column
  const columnItems = Array.from(wrap.querySelectorAll(':scope > .cubre-o-block__component > .cubre-o-card > .cubre-o-card__item'));
  if (columnItems.length === 0) return;
  // Table header as per spec
  const headerRow = ['Columns block (columns48)'];
  // Table row: each column as a cell, referencing the actual DOM nodes
  const cellsRow = columnItems.map((col) => col);
  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);
  // Replace the element in the DOM
  element.replaceWith(table);
}

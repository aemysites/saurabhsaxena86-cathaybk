/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main form box container with columns
  const formBox = element.querySelector('.cubre-o-formBox');
  if (!formBox) return;
  // Each child .cubre-o-formBox__item is a column
  const items = Array.from(formBox.querySelectorAll(':scope > .cubre-o-formBox__item'));
  if (!items.length) return;

  // Block header row: one cell, matching exactly the example (and always only one cell)
  const headerRow = ['Columns (columns66)'];
  // Second row: as many columns as items
  const contentRow = items;

  // Compose table: header row (1 col), content row (n cols)
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // Replace the original element with the new block
  element.replaceWith(table);
}

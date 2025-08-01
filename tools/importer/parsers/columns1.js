/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column, exactly as in example
  const header = ['Columns (columns1)'];

  // Find the container of columns
  const graphic = element.querySelector('.cubre-o-graphic');
  if (!graphic) return;

  // Get all immediate column items
  const items = Array.from(graphic.querySelectorAll(':scope > .cubre-o-graphic__item'));
  if (!items.length) return;

  // For each column, get its main content
  const cells = items.map(item => {
    const main = item.querySelector('.cubre-m-simpleGraphic');
    return main || item;
  });

  // The structure: header row is always a single cell (even with multiple columns in the content row)
  const tableArr = [
    header,
    cells,
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}

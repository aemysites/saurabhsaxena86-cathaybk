/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row is a single cell, as required
  const headerRow = ['Columns block (columns55)'];

  // Find the main graphic block
  const horGraphic = element.querySelector(':scope > .cubre-m-horGraphic');
  if (!horGraphic) return;

  // Get the two main columns: image and content
  const picDiv = horGraphic.querySelector(':scope > .cubre-m-horGraphic__pic');
  const contentDiv = horGraphic.querySelector(':scope > .cubre-m-horGraphic__content');

  // Left cell: image (or empty)
  let leftCell = '';
  if (picDiv) {
    const img = picDiv.querySelector('img');
    if (img) leftCell = img;
  }

  // Right cell: the first ordered list, or all content if missing
  let rightCell = '';
  if (contentDiv) {
    const ol = contentDiv.querySelector('ol');
    if (ol && ol.children.length > 0) {
      rightCell = ol;
    } else {
      rightCell = contentDiv;
    }
  }

  // Table structure: header (1 cell), content row (2 cells)
  const rows = [
    headerRow,
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

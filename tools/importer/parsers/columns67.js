/* global WebImporter */
export default function parse(element, { document }) {
  // Find the content columns
  let wrap = element.querySelector('.cubre-m-horGraphic__wrap');
  let leftContent = null;
  let rightContent = null;

  if (wrap) {
    leftContent = wrap.querySelector('.cubre-m-horGraphic__content');
    rightContent = wrap.querySelector('.cubre-m-horGraphic__pic');
  } else {
    const divs = element.querySelectorAll(':scope > div');
    if (divs.length >= 2) {
      leftContent = divs[0];
      rightContent = divs[1];
    }
  }

  // Always ensure we have 2 columns, using an empty string if missing
  const columnsRow = [leftContent || '', rightContent || ''];

  // Header row is a single cell, as in the example
  const headerRow = ['Columns (columns67)'];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}

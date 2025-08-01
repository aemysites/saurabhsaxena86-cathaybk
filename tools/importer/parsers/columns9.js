/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main slider containing the columns
  const slider = element.querySelector('.cubre-m-linkGroup__slider');
  if (!slider) return;

  // Get all direct column items from the slider
  const items = slider.querySelectorAll(':scope > .swiper-wrapper > .cubre-m-linkGroup__item');
  if (!items.length) return;

  // Prepare an array for the columns content (reference original DOM nodes)
  const columns = Array.from(items);
  const colCount = columns.length;

  // The header row MUST have the same number of columns as the columns row,
  // with only the first cell containing the block name, others empty strings.
  const headerRow = ['Columns (columns9)', ...Array(colCount - 1).fill('')];
  // Content row: one cell for each column
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

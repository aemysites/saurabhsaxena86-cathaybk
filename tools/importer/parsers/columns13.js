/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Exactly one column with the block name, as required
  const headerRow = ['Columns (columns13)'];

  // Find all flipBox items (columns of the block)
  const flipBoxWrap = element.querySelector('.cubre-m-flipBox__wrap');
  if (!flipBoxWrap) return;
  const flipItems = Array.from(flipBoxWrap.querySelectorAll(':scope > .cubre-m-flipBox__item'));
  if (flipItems.length === 0) return;

  // The content row: as many columns as flipItems
  const contentRow = flipItems;

  // Compose the block table as per the spec: header row (1 col), content row (N cols)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

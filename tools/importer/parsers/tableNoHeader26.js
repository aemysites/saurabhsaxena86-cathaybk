/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header)'];
  const cells = [headerRow];

  // Get all the table items
  const itemEls = element.querySelectorAll(':scope > .cubre-o-table > .cubre-o-table__item');

  itemEls.forEach((itemEl) => {
    // Reference the title element (do not clone)
    const titleEl = itemEl.querySelector('.cubre-a-rateName__ch');
    // Reference the table element (do not clone)
    const tableEl = itemEl.querySelector('.cubre-m-rateTable');
    const cellItems = [];
    if (titleEl) {
      cellItems.push(titleEl);
    }
    if (tableEl) {
      // Remove thead (so the block has no header row)
      const thead = tableEl.querySelector('thead');
      if (thead) {
        thead.remove();
      }
      cellItems.push(tableEl);
    }
    // Only add row if there's something meaningful
    if (cellItems.length > 0) {
      cells.push([cellItems]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

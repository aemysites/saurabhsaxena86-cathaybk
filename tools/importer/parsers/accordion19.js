/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table with the header
  const cells = [
    ['Accordion (accordion19)']
  ];

  // Select all direct accordion items
  const items = element.querySelectorAll('.cubre-m-collapse__item');
  items.forEach((item) => {
    // Title cell: clickable title (reference the actual <a>)
    const title = item.querySelector('.cubre-m-collapse__title');
    // Content cell
    let contentCell = '';
    const contentWrapper = item.querySelector('.cubre-m-collapse__content');
    if (contentWrapper) {
      // Within .cubre-m-collapse__content, use the first child div (which is .cubre-o-textContent)
      // If .cubre-o-textContent exists, use it; else fallback to the whole contentWrapper
      const textContent = contentWrapper.querySelector('.cubre-o-textContent') || contentWrapper;
      contentCell = textContent;
    }
    cells.push([title, contentCell]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header as specified
  const headerRow = ['Accordion (accordion27)'];
  const rows = [headerRow];

  // All accordion items are li elements with .cubre-m-collapse__item
  const items = element.querySelectorAll(':scope > ol > li.cubre-m-collapse__item');
  items.forEach((item) => {
    // Title: a.cubre-m-collapse__title (the clickable label)
    const title = item.querySelector(':scope > a.cubre-m-collapse__title');
    // Content: div.cubre-m-collapse__content (revealed on expand)
    const content = item.querySelector(':scope > div.cubre-m-collapse__content');
    // Defensive: if either is missing, skip this row
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table block and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

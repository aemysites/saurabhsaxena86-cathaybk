/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the rows: first row is the block name header
  const rows = [['Accordion (accordion57)']];
  // Find all accordion items
  const items = element.querySelectorAll('li.cubre-m-collapse__item');
  items.forEach((item) => {
    // Title is always the first .cubre-m-collapse__title under this item
    const title = item.querySelector('.cubre-m-collapse__title');
    // Content is the first .cubre-m-collapse__content under this item
    const content = item.querySelector('.cubre-m-collapse__content');
    // If either is missing, skip this row (robust against malformed HTML)
    if (!title || !content) return;
    // Use the referenced elements directly, not cloned
    rows.push([title, content]);
  });
  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the old element with the table
  element.replaceWith(table);
}

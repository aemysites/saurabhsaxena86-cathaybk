/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the accordion block
  const headerRow = ['Accordion (accordion83)'];

  // Find the list of accordion items (should be <ol> or <ul>)
  const list = element.querySelector('ol, ul');
  if (!list) {
    // If there is no list, replace with just the header block
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Find all direct child list items (accordion entries)
  const items = Array.from(list.children).filter(li => li.matches('.cubre-m-collapse__item'));
  
  const rows = [headerRow];

  items.forEach(li => {
    // Title: clickable header, typically an <a>
    const title = li.querySelector('.cubre-m-collapse__title');
    // Content: the body, typically in a <div>
    const content = li.querySelector('.cubre-m-collapse__content');
    // Defensive: Only add row if both present
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the instructions and example
  const headerRow = ['Accordion (accordion22)'];

  // Find the <ol class="cubre-m-collapse"> containing accordion items
  const accordionList = element.querySelector('ol.cubre-m-collapse');
  if (!accordionList) return;

  // Each <li> is an accordion item
  const items = Array.from(accordionList.children).filter(child => child.tagName === 'LI');
  const rows = [headerRow];

  items.forEach(li => {
    // Title: the first <a.cubre-m-collapse__title> inside this <li>
    const title = li.querySelector('a.cubre-m-collapse__title');
    // Content: the <div.cubre-m-collapse__content> inside this <li> (contains the content, including all paragraphs/lists)
    const content = li.querySelector('div.cubre-m-collapse__content');
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table using the specified API
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as specified
  const headerRow = ['Accordion (accordion78)'];

  // Find all accordion items (li.cubre-m-collapse__item) in the direct ol child
  const items = Array.from(element.querySelectorAll(':scope > ol > li.cubre-m-collapse__item'));

  // Prepare table rows for each accordion item
  const rows = items.map((li) => {
    // Title: use the actual <a> element (not just text) for semantics (links, formatting, etc)
    const titleEl = li.querySelector(':scope > a.cubre-m-collapse__title');
    // If missing, fallback to blank
    const titleCell = titleEl || '';
    
    // Content: use the div container (keeps tables, lists, and all markup)
    const contentEl = li.querySelector(':scope > div.cubre-m-collapse__content');
    // If missing, fallback to blank
    const contentCell = contentEl || '';

    return [titleCell, contentCell];
  });

  // Assemble the cells for the block table
  const cells = [headerRow, ...rows];

  // Create the accordion table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

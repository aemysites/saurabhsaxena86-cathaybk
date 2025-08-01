/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [['Cards (cards23)']];

  // Select all card items (one per card)
  const items = element.querySelectorAll('.cubre-o-iconEssay__item');
  
  items.forEach((item) => {
    // First cell: Icon container (may be empty, but keep it for structure)
    const icon = item.querySelector('.cubre-m-iconEssay__icon');

    // Second cell: Collect all textual content (title, desc, note)
    const cellContent = [];

    // Title (wrapped in <strong> for semantic heading)
    const title = item.querySelector('.cubre-m-iconEssay__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      cellContent.push(strong);
    }

    // Description (all paragraphs from .cubre-o-textContent)
    const descContent = item.querySelectorAll('.cubre-m-iconEssay__desc .cubre-o-textContent p');
    if (descContent.length > 0) {
      // Add a <br> if title exists
      if (cellContent.length > 0) {
        cellContent.push(document.createElement('br'));
      }
      descContent.forEach((p, i) => {
        cellContent.push(p);
        if (i < descContent.length - 1) {
          cellContent.push(document.createElement('br'));
        }
      });
    }

    // Note (from .cubre-m-iconEssay__note), if present
    const note = item.querySelector('.cubre-m-iconEssay__note');
    if (note && note.textContent.trim()) {
      if (cellContent.length > 0) {
        cellContent.push(document.createElement('br'));
      }
      // Use the full note element for any custom formatting
      cellContent.push(note);
    }

    // Add this card row to the table, always as an array of 2 elements
    rows.push([
      icon,
      cellContent
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

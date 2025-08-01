/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows
  const rows = [['Cards (cards21)']]; // Header row matches exactly

  // Select all card items
  const cardItems = element.querySelectorAll('.cubre-o-card__item');

  cardItems.forEach(cardItem => {
    // Get the image (first cell)
    const img = cardItem.querySelector('.cubre-m-card__pic img');
    // Get content div (second cell)
    const contentDiv = cardItem.querySelector('.cubre-m-card__content');
    // Build structured content for second cell
    const cellContent = document.createElement('div');

    // Title, if present
    const titleEl = contentDiv && contentDiv.querySelector('.cubre-m-card__title');
    if (titleEl && titleEl.textContent.trim()) {
      // Use strong to match structure, do not invent heading
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      cellContent.appendChild(strong);
    }

    // Description, if present
    const textDiv = contentDiv && contentDiv.querySelector('.cubre-m-card__text');
    if (textDiv) {
      // Insert <br> only if both title and text exist
      if (titleEl && titleEl.textContent.trim()) {
        cellContent.appendChild(document.createElement('br'));
      }
      // Move all childNodes from textDiv to cellContent (preserves spans, p, etc)
      while (textDiv.firstChild) {
        cellContent.appendChild(textDiv.firstChild);
      }
    }

    // Handle empty image gracefully
    rows.push([
      img || '',
      cellContent.childNodes.length > 0 ? cellContent : ''
    ]);
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

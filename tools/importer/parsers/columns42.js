/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as a single cell
  const cells = [
    ['Columns (columns42)'],
  ];

  // Defensive: Check for at least one card in the block
  const card = element.querySelector('.cubre-o-card');
  if (card) {
    const cardItem = card.querySelector('.cubre-o-card__item');
    if (cardItem) {
      const link = cardItem.querySelector('a.cubre-m-eventCard');
      if (link) {
        // First column: image
        let img = link.querySelector('.cubre-m-eventCard__pic img');
        let imageCell = img ? img : '';

        // Second column: title and date stacked
        const contentDiv = link.querySelector('.cubre-m-eventCard__content');
        const col2Content = [];
        if (contentDiv) {
          // Title
          const title = contentDiv.querySelector('.cubre-m-eventCard__title');
          if (title && title.textContent.trim()) {
            col2Content.push(title);
          }
          // Date
          const date = contentDiv.querySelector('.cubre-m-eventCard__date');
          if (date && date.textContent.trim()) {
            // If title present, add a line break
            if (col2Content.length > 0) {
              col2Content.push(document.createElement('br'));
            }
            col2Content.push(date);
          }
        }
        // Add a single row with two columns
        cells.push([
          imageCell,
          col2Content.length ? col2Content : '',
        ]);
      }
    }
  }

  // Create and replace with the columns table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

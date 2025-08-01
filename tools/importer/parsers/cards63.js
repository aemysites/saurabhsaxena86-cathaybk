/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matching the example, as a single cell
  const cells = [['Cards (cards63)']];

  // Get all card items in order
  const cardItems = element.querySelectorAll(':scope > .cubre-o-iconCard__item');

  cardItems.forEach((item) => {
    // Extract the image/icon (first column)
    const icon = item.querySelector('.cubre-m-iconEssay__icon img');

    // Extract the text content (second column)
    // Maintain structure: order is description (usually above), then title (heading style),
    // and preserve <br> tags
    const desc = item.querySelector('.cubre-m-iconEssay__desc');
    const title = item.querySelector('.cubre-m-iconEssay__title');
    
    // Compose the text content cell
    const textContent = document.createElement('div');
    if (desc && desc.textContent.trim()) {
      // Description (above title, as in screenshot)
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textContent.appendChild(p);
    }
    if (title && title.innerHTML.trim()) {
      // Title (bold, preserve <br>)
      const strong = document.createElement('strong');
      strong.innerHTML = title.innerHTML;
      textContent.appendChild(strong);
    }

    // Build the row: image/icon left cell, text content right cell
    cells.push([
      icon,
      textContent
    ]);
  });

  // Create and replace with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

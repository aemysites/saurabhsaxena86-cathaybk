/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the text cell for each card
  function buildTextCell(card) {
    const parts = [];
    // Title
    const title = card.querySelector('.cubre-m-iconEssay__title');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      parts.push(strong);
    }
    // Description
    const descWrap = card.querySelector('.cubre-m-iconEssay__desc');
    if (descWrap) {
      Array.from(descWrap.childNodes).forEach(node => {
        if (node.textContent && node.textContent.trim()) {
          const descDiv = document.createElement('div');
          descDiv.textContent = node.textContent.trim();
          parts.push(descDiv);
        }
      });
    }
    // CTAs (links)
    const ctas = card.querySelectorAll('.cubre-m-iconEssay__link > a');
    ctas.forEach(link => {
      // Only keep the link text and the href
      // Reference the link directly, not clone
      parts.push(link);
    });
    return parts;
  }

  // Get all the cards
  const cards = element.querySelectorAll('.cubre-o-iconEssay__item');
  const rows = [['Cards (cards58)']];

  cards.forEach(card => {
    // Icon: always present
    const iconWrap = card.querySelector('.cubre-m-iconEssay__icon');
    let icon = null;
    if (iconWrap) {
      icon = iconWrap.querySelector('img');
    }
    const textCell = buildTextCell(card);
    rows.push([
      icon,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

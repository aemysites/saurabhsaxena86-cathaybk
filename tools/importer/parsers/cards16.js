/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  // Find all card containers (must be direct children for safety, but allow for current markup)
  const cardContents = element.querySelectorAll('.cubre-m-horGraphicTab__content');
  cardContents.forEach(card => {
    // Image
    const img = card.querySelector('.cubre-m-horGraphic__pic img');
    // Text column - collect references to existing elements
    const contentEl = card.querySelector('.cubre-m-horGraphic__content');
    const textCellParts = [];
    if (contentEl) {
      // Title (strong)
      const titleEl = contentEl.querySelector('.cubre-m-horGraphic__title');
      if (titleEl && titleEl.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = titleEl.textContent.trim();
        textCellParts.push(strong);
        textCellParts.push(document.createElement('br'));
      }
      // Description
      const descEl = contentEl.querySelector('.cubre-m-horGraphic__text .cubre-o-textContent');
      if (descEl) {
        descEl.childNodes.forEach(node => {
          // Add nodes as-is to preserve <br> and text nodes
          textCellParts.push(node);
        });
        textCellParts.push(document.createElement('br'));
      }
      // CTA Button (as a link, using the existing a element)
      const btnEl = contentEl.querySelector('.cubre-m-horGraphic__btn a');
      if (btnEl) {
        textCellParts.push(btnEl);
      }
    }
    // Remove trailing <br> if present
    while (textCellParts.length && textCellParts[textCellParts.length-1].nodeName === 'BR') {
      textCellParts.pop();
    }
    rows.push([
      img,
      textCellParts.length === 1 ? textCellParts[0] : textCellParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

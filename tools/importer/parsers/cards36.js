/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards36)'];
  const cells = [headerRow];

  // Find all cards: robust approach
  let cardNodes = [];
  // Find puzzle items
  element.querySelectorAll('.cubre-o-puzzle__item').forEach(item => {
    item.querySelectorAll(':scope > .cubre-m-puzzle').forEach(card => {
      cardNodes.push(card);
    });
  });
  // Also allow direct children .cubre-m-puzzle (not inside .cubre-o-puzzle__item)
  element.querySelectorAll(':scope > .cubre-m-puzzle').forEach(card => {
    if (!cardNodes.includes(card)) cardNodes.push(card);
  });

  // For each card node, create a row: [image, content]
  cardNodes.forEach(card => {
    // ----- COLUMN 1: Image -----
    // Prefer .-pc (desktop) image, fallback to any image
    let img = card.querySelector('.cubre-m-puzzle__pic .cubre-m-puzzle__img.-pc') || card.querySelector('.cubre-m-puzzle__pic img');

    // ----- COLUMN 2: Content -----
    // We'll create a semantic content block using the referenced original nodes
    const contentNodes = [];
    // Title: strong
    const title = card.querySelector('.cubre-m-puzzle__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      contentNodes.push(strong);
    }
    // Description: include all meaningful content in .cubre-m-puzzle__text
    const desc = card.querySelector('.cubre-m-puzzle__text');
    if (desc) {
      Array.from(desc.childNodes).forEach(n => {
        if ((n.nodeType === 3 && n.textContent.trim()) || (n.nodeType === 1)) {
          contentNodes.push(n);
        }
      });
    }
    // Find main CTA(s): .cubre-m-puzzle__link a.cubre-a-iconLink
    const mainCta = card.querySelector('.cubre-m-puzzle__link a.cubre-a-iconLink');
    if (mainCta) {
      contentNodes.push(document.createElement('br'));
      contentNodes.push(mainCta);
    }
    // Find sub-link(s): .cubre-m-puzzle__subLink > a.cubre-a-iconLink, only if not already included
    const subCtas = card.querySelectorAll('.cubre-m-puzzle__subLink > a.cubre-a-iconLink');
    subCtas.forEach(link => {
      // Ensure it's not already appended (by reference)
      if (![...contentNodes].includes(link)) {
        contentNodes.push(document.createElement('br'));
        contentNodes.push(link);
      }
    });
    // Add the row to cells, image in first col, content in second
    cells.push([
      img || '',
      contentNodes.length === 1 ? contentNodes[0] : contentNodes
    ]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

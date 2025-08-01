/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Cards (cards52)'];
  const rows = [headerRow];

  // Select all card items
  const cardItems = element.querySelectorAll('.cubre-o-puzzle__item');
  cardItems.forEach((item) => {
    // Find the first image in the card (prefer .-pc, fallback to any img)
    let img = null;
    const pic = item.querySelector('.cubre-m-puzzle__pic');
    if (pic) {
      img = pic.querySelector('img.cubre-m-puzzle__img.-pc') || pic.querySelector('img');
    }

    // Compose the text cell: use all children of .cubre-m-puzzle__wrap for flexibility and completeness
    let textCell = [];
    const wrap = item.querySelector('.cubre-m-puzzle__wrap');
    if (wrap) {
      // For each child node (order is important)
      Array.from(wrap.children).forEach((node, idx) => {
        // Title should be <strong>, others as-is
        if (node.classList.contains('cubre-m-puzzle__title')) {
          const strong = document.createElement('strong');
          strong.textContent = node.textContent.trim();
          textCell.push(strong);
        } else if (node.classList.contains('cubre-m-puzzle__text')) {
          // Keep all children (could be divs, spans, text, etc.)
          Array.from(node.childNodes).forEach((descNode) => {
            textCell.push(descNode);
          });
        } else {
          // Any other node, push as-is
          textCell.push(node);
        }
        // Add a <br> between title and description if both exist
        if (idx === 0 && wrap.children.length > 1) {
          textCell.push(document.createElement('br'));
        }
      });
    } else {
      // Fallback to all text in the card if no proper structure
      textCell = [document.createTextNode(item.textContent.trim())];
    }

    rows.push([
      img,
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

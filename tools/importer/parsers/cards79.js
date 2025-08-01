/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as per the block name in the prompt
  const rows = [['Cards (cards79)']];

  // Find all card items (direct children of swiper-wrapper)
  const cardNodes = element.querySelectorAll('.cubre-o-compare__item');

  cardNodes.forEach(card => {
    // Image/Icon cell: Use the first <img> in the detail link, if present
    let img = null;
    const iconImg = card.querySelector('.cubre-m-compareCard__link img');
    if (iconImg) {
      img = iconImg;
    }

    // Text Cell: Collect all relevant card text and features
    const cellContent = [];

    // Title (small text at the top)
    const smallTitle = card.querySelector('.cubre-m-compareCard__text');
    if (smallTitle && smallTitle.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = smallTitle.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }
    // Big Title
    const bigTitle = card.querySelector('.cubre-m-compareCard__title');
    if (bigTitle && bigTitle.textContent.trim()) {
      const h4 = document.createElement('h4');
      h4.textContent = bigTitle.textContent.trim();
      cellContent.push(h4);
    }
    // Subtitle
    const subTitle = card.querySelector('.cubre-m-compareCard__subTitle');
    if (subTitle && subTitle.innerHTML.trim()) {
      // Use the existing <p> or text content
      Array.from(subTitle.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          cellContent.push(node);
        }
      });
    }
    // Feature list: Use the actual DOM element (preserves formatting & icons)
    const featureList = card.querySelector('.cubre-m-compareCard__feature');
    if (featureList) {
      cellContent.push(featureList);
    }
    // Actions: Links and Buttons
    const actionDiv = card.querySelector('.cubre-m-compareCard__action');
    if (actionDiv) {
      // Find all anchor tags within this div (detail and main action)
      const links = actionDiv.querySelectorAll('a');
      if (links.length > 0) {
        cellContent.push(document.createElement('br'));
        const linkNodes = Array.from(links).map(a => a);
        // Place all links/buttons, separated by a space
        linkNodes.forEach((a, idx) => {
          if (idx > 0) cellContent.push(document.createTextNode(' '));
          cellContent.push(a);
        });
      }
    }

    rows.push([
      img ? img : '',
      cellContent.length === 1 ? cellContent[0] : cellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

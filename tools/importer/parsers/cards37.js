/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find all cards
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  // Find the .swiper-wrapper (contains all cards)
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;
  
  const cardItems = swiperWrapper.querySelectorAll(':scope > .cubre-o-slideCard__item');
  cardItems.forEach((cardItem) => {
    // First cell: image (mandatory)
    let imgCell = null;
    const img = cardItem.querySelector('.cubre-m-collapseCard__pic img');
    if (img) {
      imgCell = img;
    }
    
    // Second cell: text content
    const contentDiv = cardItem.querySelector('.cubre-m-collapseCard__content');
    const textCell = document.createElement('div');
    if (contentDiv) {
      // Title as <strong>
      const title = contentDiv.querySelector('.cubre-m-collapseCard__title');
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCell.appendChild(strong);
      }
      // Description block: preserve paragraphs/lists as is
      const textBlock = contentDiv.querySelector('.cubre-o-textContent');
      if (textBlock) {
        // Move all children (p, ol, etc)
        Array.from(textBlock.childNodes).forEach((node) => {
          // Don't re-add empty or whitespace-only <p> nodes
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'p' && !node.textContent.trim()) {
            return;
          }
          textCell.appendChild(node);
        });
      }
      // If there is a subLink (CTA), add it at the end if not empty
      const subLink = contentDiv.querySelector('.cubre-m-collapseCard__subLink');
      if (subLink && subLink.textContent.trim()) {
        textCell.appendChild(subLink);
      }
    }
    // Each row: [image, text content]
    rows.push([imgCell, textCell]);
  });
  
  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

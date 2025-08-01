/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards50)'];
  const rows = [headerRow];

  // Find all card items
  const cardItems = element.querySelectorAll('.cubre-o-iconEssay__item');

  cardItems.forEach(item => {
    // 1. IMAGE/ICON CELL
    let imgCell = '';
    const iconDiv = item.querySelector('.cubre-m-iconEssay__icon');
    if (iconDiv) {
      const img = iconDiv.querySelector('img');
      if (img) imgCell = img; // Reference the img element directly
    }

    // 2. TEXT CELL
    // Title
    const titleDiv = item.querySelector('.cubre-m-iconEssay__title');
    let titleEl = null;
    if (titleDiv && titleDiv.textContent.trim()) {
      titleEl = document.createElement('strong');
      titleEl.textContent = titleDiv.textContent.trim();
    }
    // Description
    let descEl = null;
    const descDiv = item.querySelector('.cubre-m-iconEssay__desc .cubre-o-textContent');
    if (descDiv && descDiv.textContent.trim()) {
      descEl = document.createElement('div');
      descEl.textContent = descDiv.textContent.trim();
    }
    // CTA link
    let ctaEl = null;
    const ctaLink = item.querySelector('.cubre-m-iconEssay__link a');
    if (ctaLink) {
      // Only use the text content from the span inside the link, ignore img icons
      const ctaSpan = ctaLink.querySelector('.cubre-a-iconLink__text');
      let linkText = ctaSpan ? ctaSpan.textContent.trim() : ctaLink.textContent.trim();
      if (linkText && ctaLink.href) {
        ctaEl = document.createElement('a');
        ctaEl.href = ctaLink.href;
        ctaEl.target = ctaLink.target;
        ctaEl.rel = ctaLink.rel;
        ctaEl.textContent = linkText;
      }
    }
    // Compose the text cell: match example with strong, then description, then CTA (each on its own line, if present)
    const cellContent = [];
    if (titleEl) cellContent.push(titleEl);
    if (descEl) {
      if (cellContent.length) cellContent.push(document.createElement('br'));
      cellContent.push(descEl);
    }
    if (ctaEl) {
      if (cellContent.length) cellContent.push(document.createElement('br'));
      cellContent.push(ctaEl);
    }
    // If only one content, use it directly (as per guidelines)
    const textCell = cellContent.length === 1 ? cellContent[0] : cellContent;
    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

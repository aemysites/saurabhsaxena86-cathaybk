/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards70)'];
  const rows = [headerRow];
  // Select all cards
  const items = element.querySelectorAll(':scope > div.cubre-o-slideCard__item');
  items.forEach(item => {
    // Image in first column
    const img = item.querySelector('.cubre-m-collapseCard__pic img');
    // Title (as strong)
    let titleEl = null;
    const titleLink = item.querySelector('.cubre-m-collapseCard__title');
    if (titleLink && titleLink.textContent.trim()) {
      titleEl = document.createElement('strong');
      titleEl.textContent = titleLink.textContent.trim();
    }
    // Description (may be missing)
    let descEl = null;
    const descDiv = item.querySelector('.cubre-m-collapseCard__text .cubre-o-textContent');
    if (descDiv && descDiv.textContent.trim()) {
      descEl = document.createElement('div');
      descEl.textContent = descDiv.textContent.trim();
    }
    // CTA (call-to-action link), if any
    let ctaEl = null;
    const ctaLink = item.querySelector('.cubre-m-collapseCard__link a.cubre-a-iconLink');
    if (ctaLink) {
      const ctaText = ctaLink.querySelector('.cubre-a-iconLink__text');
      if (ctaText && ctaText.textContent.trim()) {
        ctaEl = document.createElement('a');
        ctaEl.href = ctaLink.getAttribute('href') || '#';
        ctaEl.textContent = ctaText.textContent.trim();
        // Only set target and rel if present
        const target = ctaLink.getAttribute('target');
        if (target) ctaEl.setAttribute('target', target);
        const rel = ctaLink.getAttribute('rel');
        if (rel) ctaEl.setAttribute('rel', rel);
      }
    }
    // Compose second cell content, keep all in order, skip unnecessary <br> if missing
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    if (descEl) {
      if (textCell.length) textCell.push(document.createElement('br'));
      textCell.push(descEl);
    }
    if (ctaEl) {
      if (textCell.length) textCell.push(document.createElement('br'));
      textCell.push(ctaEl);
    }
    rows.push([
      img || '',
      textCell.length ? textCell : ''
    ]);
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

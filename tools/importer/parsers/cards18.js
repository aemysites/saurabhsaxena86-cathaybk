/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card container
  const container = element.querySelector('.cubre-o-compare');
  if (!container) return;
  const cardItems = container.querySelectorAll('.cubre-o-compare__item');

  // Prepare rows for the block table
  // Fix: Header row should be a single column
  const rows = [];
  rows.push(['Cards (cards18)']);

  cardItems.forEach((item) => {
    // Icon cell: the first <img> from the 注意事項 link, or a span if none
    let icon = null;
    const iconLink = item.querySelector('.cubre-m-compareCard__link .cubre-a-iconLink');
    if (iconLink) {
      const imgs = iconLink.querySelectorAll('img');
      if (imgs.length > 0) icon = imgs[0];
    }
    if (!icon) {
      icon = document.createElement('span');
    }

    // Text cell: include all card content in correct semantic structure
    const card = item.querySelector('.cubre-m-compareCard');
    const textCellParts = [];

    // Subtitle (small text above title, if any)
    const subtitle = card.querySelector('.cubre-m-compareCard__text');
    if (subtitle && subtitle.textContent.trim()) {
      const subtitleEl = document.createElement('div');
      subtitleEl.textContent = subtitle.textContent.trim();
      textCellParts.push(subtitleEl);
    }
    // Title (main heading)
    const title = card.querySelector('.cubre-m-compareCard__title');
    if (title && title.textContent.trim()) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = title.textContent.trim();
      textCellParts.push(titleEl);
    }
    // Features (list)
    const featureItems = card.querySelectorAll('.cubre-m-feature__item');
    if (featureItems.length) {
      const ul = document.createElement('ul');
      featureItems.forEach((fi) => {
        const featText = fi.textContent.trim();
        if (featText) {
          const li = document.createElement('li');
          li.textContent = featText;
          ul.appendChild(li);
        }
      });
      textCellParts.push(ul);
    }
    // Note (if any)
    const note = card.querySelector('.cubre-m-compareCard__note');
    if (note) {
      textCellParts.push(note);
    }
    // 注意事項 (always as a link, with the <span> text)
    if (iconLink) {
      const noticeA = document.createElement('a');
      noticeA.href = iconLink.getAttribute('href') || '#';
      const noticeTxt = iconLink.querySelector('.cubre-a-iconLink__text');
      if (noticeTxt) {
        noticeA.textContent = noticeTxt.textContent.trim();
        textCellParts.push(noticeA);
      }
    }
    // Call-to-action button (if any)
    const cta = card.querySelector('.cubre-m-compareCard__action .cubre-m-button');
    if (cta) {
      textCellParts.push(cta);
    }

    // Fallback: if text cell is empty, add all card text
    if (textCellParts.length === 0) {
      textCellParts.push(card.textContent.trim());
    }

    // Each card row must be a two-column array
    rows.push([[icon, textCellParts]]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

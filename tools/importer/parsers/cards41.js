/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Cards (cards41)'];
  const cells = [headerRow];

  // Select all card blocks (each .cubre-o-table__item.currency)
  const cardItems = element.querySelectorAll('.cubre-o-table__item.currency');

  cardItems.forEach(card => {
    // --- COLUMN 1: IMAGE ---
    let img = '';
    // Flexible: get first <img> inside the card
    const imgEl = card.querySelector('img');
    if (imgEl) img = imgEl;

    // --- COLUMN 2: TEXT CONTENT ---
    const textParts = [];
    // Title (currency name)
    const titleEl = card.querySelector('.cubre-m-currency__name');
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      textParts.push(strong);
    }
    // Each row in the rates table (as description lines)
    const rateTable = card.querySelector('table.cubre-m-rateTable');
    if (rateTable) {
      const rows = rateTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const tds = row.querySelectorAll('td');
        if (tds.length === 3) {
          const label = tds[0].textContent.trim();
          const buy = tds[1].textContent.trim();
          const sell = tds[2].textContent.trim();
          if (label) {
            const desc = document.createElement('div');
            desc.textContent = `${label}: 買進 ${buy} / 賣出 ${sell}`;
            textParts.push(desc);
          }
        }
      });
    }
    // CTA(s) if present
    const action = card.querySelector('.cubre-m-currency__action a');
    if (action) {
      const ctaTextSpan = action.querySelector('.cubre-a-iconLink__text');
      let ctaText = '';
      if (ctaTextSpan && ctaTextSpan.textContent.trim()) {
        ctaText = ctaTextSpan.textContent.trim();
      } else if (action.textContent.trim()) {
        ctaText = action.textContent.trim();
      }
      if (ctaText) {
        const cta = document.createElement('a');
        cta.href = action.getAttribute('href') || '#';
        cta.textContent = ctaText;
        // Add CTA in a block (div)
        const ctaDiv = document.createElement('div');
        ctaDiv.appendChild(cta);
        textParts.push(ctaDiv);
      }
    }
    // Guard: if no title/desc/cta, include all text just in case
    if (textParts.length === 0) {
      const fallback = document.createElement('div');
      fallback.textContent = card.textContent.trim();
      textParts.push(fallback);
    }
    cells.push([
      img,
      textParts
    ]);
  });

  // Replace original element with new table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

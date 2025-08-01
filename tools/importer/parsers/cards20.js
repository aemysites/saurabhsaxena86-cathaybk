/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: exactly as in the example
  const rows = [["Cards (cards20)"]];

  // Find all card items
  const items = element.querySelectorAll(':scope .cubre-o-table__item');

  items.forEach((item) => {
    // Extract image (first <img> in the card)
    const img = item.querySelector('img');

    // Extract title (currency name)
    const nameDiv = item.querySelector('.cubre-m-currency__name');
    let title = '';
    if (nameDiv && nameDiv.textContent) {
      title = nameDiv.textContent.trim();
    }
    const strong = document.createElement('strong');
    strong.textContent = title;

    // Extract all text content from the currency rates table (tbody rows)
    const table = item.querySelector('table');
    const contentFragments = [];
    if (table) {
      const rowsTbody = table.querySelectorAll('tbody tr');
      rowsTbody.forEach((tr) => {
        // Collect text from all cells in this row
        let cellTexts = [];
        tr.querySelectorAll('td').forEach((td) => {
          // Get all text content (including inside divs)
          cellTexts.push(td.textContent.trim());
        });
        if (cellTexts.join(' ').replace(/\s+/g, '')) {
          // only add if not empty, preserve spaces between cells
          const div = document.createElement('div');
          div.textContent = cellTexts.join(' ');
          contentFragments.push(div);
        }
      });
    }

    // Extract CTA/link (歷史走勢) if present
    let cta = null;
    const ctaLink = item.querySelector('.cubre-m-currency__action a');
    if (ctaLink) {
      // Use the text of the link
      const linkText = Array.from(ctaLink.childNodes)
        .filter(n => n.nodeType === 3 || n.nodeType === 1)
        .map(n => n.nodeType === 3 ? n.textContent : n.textContent)
        .join('')
        .trim();
      if (linkText) {
        cta = document.createElement('a');
        cta.textContent = linkText;
        cta.href = ctaLink.getAttribute('href') || '#';
      }
    }

    // Compose text content: strong (title), then all rates, then CTA (if present)
    const textCell = document.createElement('div');
    textCell.appendChild(strong);
    contentFragments.forEach((el) => textCell.appendChild(el));
    if (cta) {
      const ctaDiv = document.createElement('div');
      ctaDiv.appendChild(cta);
      textCell.appendChild(ctaDiv);
    }

    // Add the row: [img, textCell]
    rows.push([
      img || '',
      textCell
    ]);
  });

  // Create final table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

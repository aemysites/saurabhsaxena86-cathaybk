/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: Must match the example exactly
  const headerRow = ['Cards (cards5)'];
  const rows = [];

  // Find all card elements (cubre-m-puzzle)
  const puzzleBlocks = element.querySelectorAll('.cubre-m-puzzle');

  puzzleBlocks.forEach(card => {
    // Filter out controls (such as __more, __less)
    if (
      card.className.includes('__more') ||
      card.className.includes('__less')
    ) return;

    // IMAGE: Prefer .-pc, then .-mb, then any .cubre-m-puzzle__img
    let img = card.querySelector('.cubre-m-puzzle__img.-pc') || card.querySelector('.cubre-m-puzzle__img.-mb') || card.querySelector('.cubre-m-puzzle__img');

    // TEXTUAL CONTENT: Build the title, description, and CTA as elements for semantic meaning
    const contentParts = [];

    // Title (strong)
    const titleEl = card.querySelector('.cubre-m-puzzle__title');
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      contentParts.push(strong);
    }

    // Description (as <p>), prefer .cubre-m-puzzle__text > .cubre-o-textContent, fallback to .cubre-m-puzzle__text
    let descText = '';
    const descEl = card.querySelector('.cubre-m-puzzle__text .cubre-o-textContent, .cubre-m-puzzle__text');
    if (descEl && descEl.textContent.trim()) {
      descText = descEl.textContent.trim();
      if (descText) {
        const p = document.createElement('p');
        p.textContent = descText;
        contentParts.push(p);
      }
    }

    // CTA/button (as <a>), with only visible link text
    const ctaLink = card.querySelector('.cubre-m-puzzle__link a');
    if (ctaLink) {
      const a = ctaLink; // reference the existing <a> element directly
      // Remove any img children (icon), keep only text
      a.querySelectorAll('img').forEach(img => img.remove());
      // If the link text is wrapped in a span, flatten it for clarity
      const span = a.querySelector('span');
      if (span && span.textContent.trim()) {
        a.innerHTML = span.textContent.trim();
      } else {
        a.innerHTML = a.textContent.trim();
      }
      contentParts.push(a);
    }

    // Add row if there's any content
    if (img || contentParts.length) {
      rows.push([img, contentParts]);
    }
  });

  // Compose final table structure, using referenced elements (not clones)
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

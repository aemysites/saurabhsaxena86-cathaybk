/* global WebImporter */
export default function parse(element, { document }) {
  // Header must match exactly
  const headerRow = ['Cards (cards10)'];
  const rows = [];

  // Get all card groupings (each .cubre-o-puzzle__item)
  const itemNodes = element.querySelectorAll('.cubre-o-puzzle__item');
  itemNodes.forEach(itemNode => {
    // Each .cubre-m-puzzle is a card (may be multiple in an item)
    const puzzleNodes = itemNode.querySelectorAll('.cubre-m-puzzle');
    puzzleNodes.forEach(puzzle => {
      // --- IMAGE CELL ---
      let img = null;
      // Prefer -pc image, fallback to any
      const imgs = puzzle.querySelectorAll('.cubre-m-puzzle__pic img');
      if (imgs.length) {
        img = imgs[0]; // Use first (usually -pc)
      }

      // --- TEXT CELL ---
      // Create a container for all the text content
      const textCell = document.createElement('div');
      // Title (strong)
      const title = puzzle.querySelector('.cubre-m-puzzle__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCell.appendChild(strong);
      }
      // Description: collect all content inside .cubre-m-puzzle__text (including lists & brs)
      const desc = puzzle.querySelector('.cubre-m-puzzle__text');
      if (desc) {
        Array.from(desc.childNodes).forEach(node => {
          // Retain structure (text, br, p, ol, etc.)
          textCell.appendChild(node.cloneNode(true));
        });
      }
      // --- CTA(s) ---
      // Main links in .cubre-m-puzzle__link
      const linkContainers = puzzle.querySelectorAll('.cubre-m-puzzle__link, .cubre-m-puzzle__subLink');
      linkContainers.forEach(container => {
        // Find all direct a.cubre-a-iconLink children
        container.querySelectorAll('a.cubre-a-iconLink').forEach(link => {
          // Make a new <a> referencing the existing link
          const a = document.createElement('a');
          a.href = link.getAttribute('href') || '';
          if (link.hasAttribute('target')) a.target = link.getAttribute('target');
          // Extract main label text (prefer .cubre-a-iconLink__text, fallback to link.textContent)
          let label = '';
          const txtSpan = link.querySelector('.cubre-a-iconLink__text');
          if (txtSpan && txtSpan.textContent.trim()) label = txtSpan.textContent.trim();
          else label = link.textContent.trim();
          a.textContent = label;
          textCell.appendChild(document.createElement('br'));
          textCell.appendChild(a);
        });
      });
      // Only add rows if one of the cells has content
      if (img || textCell.textContent.trim() || textCell.querySelector('a')) {
        rows.push([img, textCell]);
      }
    });
  });
  // Compose and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

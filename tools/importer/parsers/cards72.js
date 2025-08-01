/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get immediate children matching selector
  function directChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the puzzle block root (defensive)
  const puzzleRoot = element.querySelector('.cubre-o-puzzle') || element;
  // Find all direct card containers
  const itemDivs = directChildren(puzzleRoot, '.cubre-o-puzzle__item');

  // Table header
  const cells = [['Cards (cards72)']];

  itemDivs.forEach(item => {
    // Only process .cubre-m-puzzle children (sometimes more than one per item)
    const puzzles = directChildren(item, '.cubre-m-puzzle');
    puzzles.forEach(puzzle => {
      // --- Image column ---
      let img = null;
      const picDiv = puzzle.querySelector('.cubre-m-puzzle__pic');
      if (picDiv) {
        // Prefer .-pc image, fallback to first img
        img = picDiv.querySelector('img.cubre-m-puzzle__img.-pc') || picDiv.querySelector('img');
      }
      // --- Text column ---
      const contentDiv = puzzle.querySelector('.cubre-m-puzzle__content');
      const wrapDiv = contentDiv ? contentDiv.querySelector('.cubre-m-puzzle__wrap') : null;
      const textCell = document.createElement('div');
      // Title
      const title = wrapDiv ? wrapDiv.querySelector('.cubre-m-puzzle__title') : null;
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCell.appendChild(strong);
      }
      // Description (list)
      const textOuter = wrapDiv ? wrapDiv.querySelector('.cubre-m-puzzle__text') : null;
      if (textOuter) {
        // Look for ol.ul or li
        const list = textOuter.querySelector('ol,ul');
        if (list) {
          textCell.appendChild(list);
        } else if(textOuter.textContent.trim()) {
          // fallback to plain text content if present
          const desc = document.createElement('div');
          desc.textContent = textOuter.textContent.trim();
          textCell.appendChild(desc);
        }
      }
      // If no title or description found, skip row
      if (!(img || textCell.childNodes.length)) return;
      // Add card row (always 2 columns)
      cells.push([
        img || '',
        textCell.childNodes.length ? textCell : ''
      ]);
    });
  });

  // Only replace if we have at least a header and one card
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}

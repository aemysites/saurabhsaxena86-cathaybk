/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards64)'];

  // Get all card items
  const cardItems = element.querySelectorAll('.cubre-o-iconEssay__item');

  // Process all cards
  const rows = Array.from(cardItems).map((card) => {
    // Left column: the image (icon)
    const iconDiv = card.querySelector('.cubre-m-iconEssay__icon');
    let img = iconDiv ? iconDiv.querySelector('img') : null;
    // Only reference the real img (not clone)

    // Right column: title (bold/heading), then description
    const titleDiv = card.querySelector('.cubre-m-iconEssay__title');
    const descDiv = card.querySelector('.cubre-m-iconEssay__desc');

    // Prepare text cell contents
    const textCell = [];
    if (titleDiv && titleDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      textCell.push(strong);
    }
    if (descDiv && descDiv.textContent.trim()) {
      if (textCell.length) textCell.push(document.createElement('br'));
      textCell.push(document.createTextNode(descDiv.textContent.trim()));
    }
    return [img, textCell];
  });

  // Compose the final table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

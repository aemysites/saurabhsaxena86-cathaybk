/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly as specified
  const headerRow = ['Columns block (columns77)'];

  // Get main horizontal graphic wrap
  const wrap = element.querySelector('.cubre-m-horGraphic__wrap');
  let leftCell = null;
  let rightCellContent = [];

  if (wrap) {
    // Left column: the pic (graphic/illustration)
    const leftPic = wrap.querySelector('.cubre-m-horGraphic__pic');
    if (leftPic) leftCell = leftPic;

    // Right column: textual content (title, text, step link)
    const rightContent = wrap.querySelector('.cubre-m-horGraphic__content');
    if (rightContent) rightCellContent.push(rightContent);
  }

  // Find major button (outside wrap, but part of right column in structure)
  const btnRow = element.querySelector('.cubre-m-horGraphic__btn');
  if (btnRow) {
    // Try to extract just the button/link, not the whole btnRow div
    const majorBtn = btnRow.querySelector('a, button');
    if (majorBtn) rightCellContent.push(majorBtn);
    else rightCellContent.push(btnRow);
  }

  // Edge case fallback
  if (!leftCell && !rightCellContent.length) {
    leftCell = element;
    rightCellContent = [];
  }

  // The second row: two columns
  const columnsRow = [leftCell, rightCellContent.length > 1 ? rightCellContent : rightCellContent[0]];
  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

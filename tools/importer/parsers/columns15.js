/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main wrap (side-by-side content)
  const wrap = element.querySelector('.cubre-m-horGraphic__wrap');
  if (!wrap) return;

  // Get the left and right columns
  const pic = wrap.querySelector('.cubre-m-horGraphic__pic');
  const content = wrap.querySelector('.cubre-m-horGraphic__content');

  // Compose the table: header row is a single cell; second row is two columns
  const headerRow = ['Columns block (columns15)'];
  const contentRow = [pic || document.createElement('div'), content || document.createElement('div')];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

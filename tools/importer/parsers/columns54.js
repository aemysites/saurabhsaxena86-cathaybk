/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cubre-m-footer__wrap > .cubre-o-footer
  const wrap = element.querySelector(':scope > .cubre-m-footer__wrap');
  let leftCol = null;
  let rightCol = null;
  if (wrap) {
    const footer = wrap.querySelector(':scope > .cubre-o-footer');
    if (footer) {
      leftCol = footer.querySelector(':scope > .cubre-o-footer__related') || document.createElement('div');
      rightCol = footer.querySelector(':scope > .cubre-o-footer__social') || document.createElement('div');
    }
  }
  // Fallback: if left or right col not found, use empty divs
  if (!leftCol) {
    leftCol = document.createElement('div');
  }
  if (!rightCol) {
    rightCol = document.createElement('div');
  }
  // Compose the correct table structure: header (1 col), then content row (2 cols)
  const cells = [
    ['Columns block (columns54)'],
    [leftCol, rightCol],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

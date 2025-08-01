/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant content containers in the footer
  const wrap = element.querySelector('.cubre-m-footer__wrap');
  if (!wrap) return;

  // Get the links cell elements
  let linksCellContent = [];
  const linksWrap = wrap.querySelector('.cubre-m-footer__link .cubre-o-commonLinks');
  if (linksWrap) {
    // Get all links in order
    linksCellContent = Array.from(linksWrap.querySelectorAll('.cubre-o-commonLinks__item a'));
  }

  // Get the copyright cell content
  let copyrightCellContent = [];
  const copyrightWrap = wrap.querySelector('.cubre-m-footer__copyright');
  if (copyrightWrap) {
    const p = copyrightWrap.querySelector('p');
    if (p) {
      copyrightCellContent = [p];
    } else {
      copyrightCellContent = [copyrightWrap];
    }
  }

  // As in the markdown example: header is a single column, followed by a row with two columns
  const cells = [
    ['Columns block (columns61)'],
    [linksCellContent, copyrightCellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

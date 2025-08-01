/* global WebImporter */
export default function parse(element, { document }) {
  // Left column: image
  let leftCol = null;
  const pic = element.querySelector('.cubre-m-product__pic');
  if (pic) leftCol = pic;

  // Right column: features, title, text, link, button
  const rightCol = document.createElement('div');
  const sel = [
    '.cubre-m-product__feature',
    '.cubre-m-product__title',
    '.cubre-m-product__text',
    '.cubre-m-product__link',
    '.cubre-m-product__btn',
  ];
  sel.forEach(selector => {
    const el = element.querySelector(selector);
    if (el) rightCol.appendChild(el);
  });

  // Construct table: header row (1 cell), content row (2 cells)
  const cells = [
    ['Columns (columns81)'],
    [leftCol || '', rightCol.childNodes.length ? rightCol : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

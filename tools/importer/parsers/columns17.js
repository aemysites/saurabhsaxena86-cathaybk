/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row: single cell as required by guidelines
  const headerRow = ['Columns block (columns17)'];

  // Find main product section
  const product = element.querySelector('.cubre-m-product');
  if (!product) return;

  // LEFT COLUMN: find the product image
  const leftPic = product.querySelector('.cubre-m-product__pic');

  // RIGHT COLUMN: prepare text/title/feature/link and button
  const content = product.querySelector('.cubre-m-product__content');
  const btn = product.querySelector('.cubre-m-product__btn');

  // Compose cells:
  // Row 1: [image, main content]
  // Row 2: [empty, button]
  const cells = [
    headerRow,
    [leftPic || '', content || ''],
    ['', btn || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find left column: product image
  const imgWrapper = element.querySelector('.cubre-m-product__pic');
  let leftColContent = [];
  if (imgWrapper) leftColContent.push(imgWrapper);

  // Find right column: product title, text, and buttons
  const contentWrapper = element.querySelector('.cubre-m-product__content');
  let rightColContent = [];
  if (contentWrapper) {
    const frag = document.createElement('div');
    // Title
    const title = contentWrapper.querySelector('.cubre-m-product__title');
    if (title) frag.appendChild(title);
    // Text
    const text = contentWrapper.querySelector('.cubre-m-product__text');
    if (text) frag.appendChild(text);
    // Buttons
    const btns = contentWrapper.querySelector('.cubre-m-product__btn');
    if (btns) frag.appendChild(btns);
    if (frag.childNodes.length > 0) rightColContent.push(frag);
  }

  // Build table rows
  const cells = [
    ['Columns block (columns53)'],
    [leftColContent.length ? leftColContent : '', rightColContent.length ? rightColContent : '']
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

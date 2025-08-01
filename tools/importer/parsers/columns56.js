/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns for visual layout: left (image), right (content)
  // 1. Left column: image
  const leftCol = [];
  const picDiv = element.querySelector('.cubre-m-product__pic');
  if (picDiv) {
    const img = picDiv.querySelector('img');
    if (img) leftCol.push(img);
  }
  
  // 2. Right column: all content blocks (title, list, buttons)
  const rightCol = [];
  const contentDiv = element.querySelector('.cubre-m-product__content');
  if (contentDiv) {
    // Push title
    const title = contentDiv.querySelector('.cubre-m-product__title');
    if (title) rightCol.push(title);
    // Push text (list)
    const text = contentDiv.querySelector('.cubre-m-product__text');
    if (text) rightCol.push(text);
    // Push buttons
    const btn = contentDiv.querySelector('.cubre-m-product__btn');
    if (btn) rightCol.push(btn);
  }

  // Header row with EXACTLY one cell
  const headerRow = ['Columns block (columns56)'];

  // Content row with as many columns as needed for visual layout (here 2)
  const contentRow = [leftCol, rightCol];

  // Build table
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(block);
}

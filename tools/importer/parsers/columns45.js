/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Columns block (columns45)'];

  // Find left column: the image
  let leftCol = '';
  const imgContainer = element.querySelector('.cubre-m-horGraphic__pic');
  if (imgContainer) {
    const img = imgContainer.querySelector('img');
    if (img) leftCol = img;
  }

  // Find right column: main text block
  let rightCol = '';
  const contentContainer = element.querySelector('.cubre-m-horGraphic__content');
  if (contentContainer) {
    // Try to find the most inner actual text content
    let theText = contentContainer.querySelector('.cubre-o-textContent');
    if (!theText) theText = contentContainer.querySelector('.cubre-m-horGraphic__text');
    if (!theText) theText = contentContainer;
    rightCol = theText;
  }

  // Build table as in the markdown: two columns in the content row
  const cells = [headerRow, [leftCol, rightCol]];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

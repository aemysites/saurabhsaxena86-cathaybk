/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main block (assume only one .cubre-o-block__component for top, so element is the block)
  // This block should be split into two columns: left (text/steps) and right (image)

  // 1. Find the left column: text content
  let leftContent = null;
  const textContainer = element.querySelector('.cubre-m-horGraphic__content');
  if (textContainer) {
    // Try to get just the relevant content (the text panel with steps)
    const textWrap = textContainer.querySelector('.cubre-m-horGraphic__text');
    leftContent = textWrap ? textWrap : textContainer;
  } else {
    // Fallback: grab the first text-like div
    const firstDiv = element.querySelector(':scope > div');
    leftContent = firstDiv ? firstDiv : document.createTextNode('');
  }

  // 2. Find the right column: the image
  let rightContent = null;
  const imgContainer = element.querySelector('.cubre-m-horGraphic__pic');
  if (imgContainer) {
    const img = imgContainer.querySelector('img');
    rightContent = img ? img : imgContainer;
  } else {
    // Fallback: look for first img in block
    const img = element.querySelector('img');
    rightContent = img ? img : document.createTextNode('');
  }

  // 3. Table header is exactly: 'Columns (columns65)'
  const cells = [
    ['Columns (columns65)'],
    [leftContent, rightContent]
  ];

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

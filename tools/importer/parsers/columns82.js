/* global WebImporter */
export default function parse(element, { document }) {
  // Left column: image
  const leftPic = element.querySelector('.cubre-m-product__pic');
  let leftImg = null;
  if (leftPic) {
    leftImg = leftPic.querySelector('img');
  }

  // Right column: all product content except for buttons
  const rightCol = element.querySelector('.cubre-m-product__content');
  const rightContentArr = [];
  if (rightCol) {
    // Only content, not the button
    rightCol.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        rightContentArr.push(node);
      }
    });
  }

  // Button: goes in its own row, right cell only
  const btnDiv = element.querySelector('.cubre-m-product__btn');

  // Compose table cells according to the markdown structure
  const cells = [
    ['Columns (columns82)'],
    [leftImg, rightContentArr],
    [null, btnDiv]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

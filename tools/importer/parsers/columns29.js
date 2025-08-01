/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row: must be a single cell
  const headerRow = ['Columns (columns29)'];

  // Get main content container
  const wrap = element.querySelector('.cubre-o-block__wrap');
  if (!wrap) return;
  const component = wrap.querySelector('.cubre-o-block__component');
  if (!component) return;
  const horGraphic = component.querySelector('.cubre-m-horGraphic');
  if (!horGraphic) return;

  // LEFT COLUMN: all text/links content
  const leftColParts = [];
  // Title
  const title = horGraphic.querySelector('.cubre-m-horGraphic__title');
  if (title) leftColParts.push(title);
  // Description/content
  const textContent = horGraphic.querySelector('.cubre-m-horGraphic__text');
  if (textContent) leftColParts.push(textContent);
  // Action link (icon link, if present)
  let actionLink = element.querySelector('a.cubre-a-iconLink');
  if (actionLink) leftColParts.push(actionLink);

  // RIGHT COLUMN: illustration/pic
  let rightCol = '';
  const pic = horGraphic.querySelector('.cubre-m-horGraphic__pic');
  if (pic && pic.children.length) {
    rightCol = pic;
  } else {
    const bg = horGraphic.querySelector('.cubre-m-horGraphic__bg');
    if (bg) {
      let bgImg = bg.querySelector('img');
      if (bgImg) rightCol = bgImg;
    }
  }

  // Compose content row: must be a two-element array
  const contentRow = [leftColParts, rightCol];

  // Compose table rows as per requirements
  const tableCells = [
    headerRow,    // single header cell
    contentRow    // columns for content
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}

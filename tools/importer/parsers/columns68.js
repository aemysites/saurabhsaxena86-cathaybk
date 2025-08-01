/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main flip box wrapper
  const flipBox = element.querySelector('.cubre-m-flipBox');
  if (!flipBox) return;

  // Get desktop background image
  let bgImg = null;
  const bgContainer = flipBox.querySelector('.cubre-m-flipBox__bg');
  if (bgContainer) {
    bgImg = bgContainer.querySelector('img.-pc') || bgContainer.querySelector('img');
  }

  // Get all columns (flip cards)
  const columnItems = Array.from(flipBox.querySelectorAll(':scope > .cubre-m-flipBox__wrap > .cubre-m-flipBox__item'));

  // Build the content cells, first cell gets the bgImg (if any) prepended
  const columns = columnItems.map((item, idx) => {
    const flipCardBack = item.querySelector('.cubre-m-flipCard__back');
    if (!flipCardBack) return '';
    const title = flipCardBack.querySelector('.cubre-m-flipCard__title');
    const textWrap = flipCardBack.querySelector('.cubre-m-flipCard__text');
    const subLink = flipCardBack.querySelector('.cubre-m-flipCard__subLink');
    const actionLinkWrap = item.querySelector('.cubre-m-flipCard__link');
    const content = [];
    // Prepend bg image to ONLY the first column cell
    if (idx === 0 && bgImg) {
      content.push(bgImg);
    }
    if (title) content.push(title);
    if (textWrap) content.push(textWrap);
    if (subLink && subLink.children.length > 0) {
      content.push(...Array.from(subLink.children));
    }
    if (actionLinkWrap && actionLinkWrap.children.length > 0) {
      content.push(...Array.from(actionLinkWrap.children));
    }
    return content.length === 1 ? content[0] : content;
  });

  // Structure: header row (one column), then a row with all columns
  const headerRow = ['Columns (columns68)'];
  const contentRow = columns;
  const rows = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

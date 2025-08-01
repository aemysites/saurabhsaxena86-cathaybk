/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children representing columns (cubre-m-cube__item)
  const items = Array.from(element.querySelectorAll(':scope > div.cubre-m-cube__item'));
  if (items.length === 0) return;

  // For each item, build a single cell content that matches the visual structure
  const cellsRow = items.map(item => {
    const frag = document.createElement('div');
    // Icon (img)
    const iconDiv = item.querySelector(':scope > .cubre-m-cube__icon');
    if (iconDiv && iconDiv.firstElementChild) {
      frag.appendChild(iconDiv.firstElementChild);
    }
    // Title
    const titleDiv = item.querySelector(':scope > .cubre-m-cube__title');
    if (titleDiv) {
      const title = document.createElement('div');
      title.textContent = titleDiv.textContent;
      frag.appendChild(title);
    }
    // Text
    const textDiv = item.querySelector(':scope > .cubre-m-cube__text');
    if (textDiv) {
      const text = document.createElement('div');
      text.textContent = textDiv.textContent;
      frag.appendChild(text);
    }
    return frag;
  });

  // Compose table: header row exactly as required, then just the columns row
  const cells = [
    ['Columns (columns69)'],
    cellsRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

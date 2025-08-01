/* global WebImporter */
export default function parse(element, { document }) {
  // Find the popup containing the card steps
  const popup = element.querySelector('.cubre-m-popup');
  if (!popup) return;
  const stepsList = popup.querySelector('ol, ul');
  if (!stepsList) return;

  // Compose table rows: Header first
  const rows = [['Cards (cards3)']];

  // Each card: .cubre-m-insideStep__item (li)
  stepsList.querySelectorAll('li').forEach((li) => {
    // First cell: the icon/img (reference, do not clone)
    let iconImg = null;
    const iconDiv = li.querySelector('.cubre-m-insideStep__icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Second cell: create a wrapper div, reference title and description if present
    const textContent = [];
    const title = li.querySelector('.cubre-m-insideStep__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textContent.push(strong);
    }
    const desc = li.querySelector('.cubre-m-insideStep__text');
    if (desc && desc.textContent.trim()) {
      if (textContent.length > 0) {
        textContent.push(document.createElement('br'));
      }
      textContent.push(document.createTextNode(desc.textContent.trim()));
    }
    // Fallback: if nothing found, use all text from li
    if (textContent.length === 0) {
      const txt = li.textContent.trim();
      if (txt) textContent.push(txt);
    }

    rows.push([
      iconImg,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Build and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

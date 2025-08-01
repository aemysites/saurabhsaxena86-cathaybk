/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards47)'];
  const rows = [headerRow];

  // Select all card items
  const items = element.querySelectorAll('.cubre-o-graphic__item');
  items.forEach(item => {
    // Image cell: try finding image inside .cubre-m-simpleGraphic__pic or fallback to any <img>
    let img = item.querySelector('.cubre-m-simpleGraphic__pic img') || item.querySelector('img');

    // Text cell: collect title, description, and all CTA links
    const textParts = [];
    const data = item.querySelector('.cubre-m-simpleGraphic__data');
    if (data) {
      // 1. Title (strong)
      const title = data.querySelector('.cubre-m-simpleGraphic__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.innerHTML = title.innerHTML;
        textParts.push(strong);
        textParts.push(document.createElement('br'));
      }
      // 2. Description: inner text or html of .cubre-m-simpleGraphic__text or its .cubre-o-textContent child
      const textWrap = data.querySelector('.cubre-m-simpleGraphic__text');
      if (textWrap) {
        if (textWrap.querySelector('.cubre-o-textContent')) {
          // Use the content element directly
          const desc = textWrap.querySelector('.cubre-o-textContent');
          textParts.push(desc);
        } else {
          // Use the textWrap itself (covers fallback situations)
          textParts.push(textWrap);
        }
        textParts.push(document.createElement('br'));
      }
      // 3. CTAs (one or many): links inside .cubre-m-simpleGraphic__link
      data.querySelectorAll('.cubre-m-simpleGraphic__link').forEach(linkBlock => {
        linkBlock.querySelectorAll('a').forEach(a => {
          textParts.push(a);
          textParts.push(document.createElement('br'));
        });
      });
      // Remove trailing <br>
      if (textParts.length && textParts[textParts.length - 1].tagName === 'BR') {
        textParts.pop();
      }
    } else {
      // Fallback: if the structure is not as expected, capture all text
      if (item.textContent.trim()) {
        textParts.push(document.createTextNode(item.textContent.trim()));
      }
    }
    rows.push([
      img || '',
      textParts.length === 1 ? textParts[0] : textParts
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

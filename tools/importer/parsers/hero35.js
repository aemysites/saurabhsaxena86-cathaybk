/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: resolve relative src to absolute URL
  function toAbsoluteUrl(src) {
    const a = document.createElement('a');
    a.href = src;
    return a.href;
  }

  // Table header row: exactly as in the spec
  const headerRow = ['Hero (hero35)'];

  // Background image: prefer desktop, fallback to mobile, prefer first if neither marked
  let bgImg = null;
  const bgDiv = element.querySelector('.cubre-m-kv__bg');
  if (bgDiv) {
    let img = bgDiv.querySelector('img.cubre-m-kv__img.-pc') || bgDiv.querySelector('img.cubre-m-kv__img.-mb') || bgDiv.querySelector('img');
    if (img) {
      // Reference the existing image element, but ensure src is absolute
      // If src is not absolute, set it
      if (img.getAttribute('src') && !/^https?:\/\//i.test(img.getAttribute('src'))) {
        img.setAttribute('src', toAbsoluteUrl(img.getAttribute('src')));
      }
      bgImg = img;
    }
  }
  const bgImgRow = [bgImg || '']; // empty string if no image

  // Content row: Title, Subheading (as in HTML, using heading and paragraph semantics)
  const wrapDiv = element.querySelector('.cubre-m-kv__wrap');
  const content = [];
  if (wrapDiv) {
    // Title (Heading)
    const titleDiv = wrapDiv.querySelector('.cubre-m-kv__title .cubre-a-kvTitle');
    if (titleDiv && titleDiv.textContent.trim()) {
      // Use existing element and change tag to h1 for strong heading semantics
      let h1;
      if (titleDiv.tagName.toLowerCase() === 'h1') {
        h1 = titleDiv;
      } else {
        h1 = document.createElement('h1');
        h1.textContent = titleDiv.textContent.trim();
      }
      content.push(h1);
    }
    // Subheading (optional)
    const subDiv = wrapDiv.querySelector('.cubre-m-kv__subTitle .cubre-a-kvTitle.-sub');
    if (subDiv && subDiv.textContent.trim()) {
      // Use existing element and change tag to p for subheading
      let p;
      if (subDiv.tagName.toLowerCase() === 'p') {
        p = subDiv;
      } else {
        p = document.createElement('p');
        p.textContent = subDiv.textContent.trim();
      }
      content.push(p);
    }
  }
  const contentRow = [content.length ? content : ''];

  // Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

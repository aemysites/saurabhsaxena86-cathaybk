/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: resolve relative URLs to absolute
  function resolveUrl(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.href;
  }

  // 1. Header row exactly as block name
  const headerRow = ['Hero (hero11)'];

  // 2. Background image row: use the first .cubre-m-productKv__img (preferably -pc, fallback to -mb)
  let bgImg = null;
  const bgDiv = element.querySelector('.cubre-m-productKv__bg');
  if (bgDiv) {
    // Prefer the .-pc image, fallback to .-mb image
    bgImg = bgDiv.querySelector('.cubre-m-productKv__img.-pc') || bgDiv.querySelector('.cubre-m-productKv__img.-mb');
    if (bgImg) {
      // Convert relative src to absolute for export
      bgImg.src = resolveUrl(bgImg.getAttribute('src'));
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: headline, subheadline, CTA button, feature icons/text, illustration
  const contentArr = [];
  const wrapDiv = element.querySelector('.cubre-m-productKv__wrap');
  if (wrapDiv) {
    // Title: .cubre-m-productKv__title .cubre-a-kvTitle
    const titleP = wrapDiv.querySelector('.cubre-m-productKv__title .cubre-a-kvTitle');
    if (titleP) {
      // Use a heading element for semantic meaning
      const h1 = document.createElement('h1');
      h1.innerHTML = titleP.innerHTML;
      contentArr.push(h1);
    }
    // Subheading: .cubre-m-productKv__subTitle .cubre-a-kvTitle.-sub
    const subP = wrapDiv.querySelector('.cubre-m-productKv__subTitle .cubre-a-kvTitle.-sub');
    if (subP) {
      const h2 = document.createElement('h2');
      h2.innerHTML = subP.innerHTML;
      contentArr.push(h2);
    }
    // CTA button: .cubre-m-productKv__btn a
    const ctaA = wrapDiv.querySelector('.cubre-m-productKv__btn a');
    if (ctaA) {
      // Only reference the existing element, do not clone.
      // Remove any nested <p>: flatten their text
      Array.from(ctaA.querySelectorAll('p')).forEach(p => {
        const t = document.createTextNode(p.textContent);
        p.parentNode.replaceChild(t, p);
      });
      const btnP = document.createElement('p');
      btnP.appendChild(ctaA);
      contentArr.push(btnP);
    }
    // Feature list: .cubre-m-productKv__feature (contains icons and labels)
    const featureDiv = wrapDiv.querySelector('.cubre-m-productKv__feature');
    if (featureDiv) {
      contentArr.push(featureDiv);
    }
    // Right illustration: .cubre-m-productKv__pic
    const picDiv = wrapDiv.querySelector('.cubre-m-productKv__pic');
    if (picDiv) {
      contentArr.push(picDiv);
    }
  }
  const contentRow = [contentArr.length ? contentArr : ''];

  // Build the table as required (1 col, 3 rows)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

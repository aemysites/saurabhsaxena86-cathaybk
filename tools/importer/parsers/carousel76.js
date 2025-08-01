/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child
  function getDirectChild(el, selector) {
    return Array.from(el.children).find(child => child.matches(selector));
  }
  // Find the picture step slider
  const pictureStep = element.querySelector('.cubre-m-pictureStep');
  if (!pictureStep) return;
  const swiperWrapper = pictureStep.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;
  const slideItems = Array.from(swiperWrapper.querySelectorAll('.cubre-m-pictureStep__item'));
  const rows = [
    ['Carousel (carousel76)'],
  ];
  slideItems.forEach(item => {
    // Image (mandatory)
    let imgCell = '';
    const picDiv = getDirectChild(item, '.cubre-m-pictureStep__pic');
    if (picDiv) {
      const img = picDiv.querySelector('img');
      if (img) imgCell = img;
    }
    // Second cell: text content (title, description)
    const textCell = [];
    const titleDiv = getDirectChild(item, '.cubre-m-pictureStep__title');
    if (titleDiv) {
      const p = titleDiv.querySelector('p');
      if (p && p.textContent && p.textContent.trim()) {
        const h2 = document.createElement('h2');
        h2.textContent = p.textContent.trim();
        textCell.push(h2);
      }
    }
    const descDiv = getDirectChild(item, '.cubre-m-pictureStep__text');
    if (descDiv && descDiv.textContent && descDiv.textContent.trim()) {
      // Make a <p> and preserve <br> if present
      const p = document.createElement('p');
      p.innerHTML = descDiv.innerHTML;
      textCell.push(p);
    }
    rows.push([
      imgCell,
      textCell.length > 0 ? textCell : ''
    ]);
  });
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

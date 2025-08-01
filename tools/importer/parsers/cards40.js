/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards container (swiper-wrapper)
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // Get all card items
  const cardItems = Array.from(swiperWrapper.querySelectorAll(':scope > .cubre-o-card__item'));

  // Table header row, as per spec
  const cells = [
    ['Cards (cards40)']
  ];

  cardItems.forEach((item) => {
    const main = item.querySelector('.cubre-m-card__main');
    if (!main) return;

    // Image cell
    let imgCell = null;
    const img = main.querySelector('.cubre-m-card__pic img');
    if (img) imgCell = img;

    // Text cell: title (strong), description, CTA (link)
    const content = main.querySelector('.cubre-m-card__content');
    const contentEls = [];
    // Title
    if (content) {
      const title = content.querySelector('.cubre-m-card__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        contentEls.push(strong);
        contentEls.push(document.createElement('br'));
      }
      // Description
      const desc = content.querySelector('.cubre-m-card__text');
      if (desc) {
        // Use all child nodes (to preserve spans, etc)
        Array.from(desc.childNodes).forEach((node) => {
          // If node is a text node or an element, reference as-is
          contentEls.push(node);
        });
      }
    }

    // CTA button (link)
    const btnLink = main.querySelector('.cubre-m-card__btn a');
    if (btnLink) {
      // Add a <br> for spacing
      contentEls.push(document.createElement('br'));
      contentEls.push(btnLink);
    }

    // Remove leading/trailing <br>
    while (contentEls.length && contentEls[0].tagName === 'BR') contentEls.shift();
    while (contentEls.length && contentEls[contentEls.length - 1].tagName === 'BR') contentEls.pop();

    // Push the row to the table
    cells.push([
      imgCell,
      contentEls
    ]);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

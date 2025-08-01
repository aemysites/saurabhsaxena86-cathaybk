/* global WebImporter */
export default function parse(element, { document }) {
  // Extract tab labels
  const nav = element.querySelector('.cubre-m-horGraphicTab__nav .swiper-wrapper');
  const tabLinks = nav ? Array.from(nav.children) : [];
  const tabLabels = tabLinks.map(link => {
    const p = link.querySelector('p');
    return p ? p.textContent.trim() : link.textContent.trim();
  });

  // Extract tab contents
  const tabContentsContainer = element.querySelector('.cubre-m-horGraphicTab__container');
  const tabContentBlocks = tabContentsContainer ? Array.from(tabContentsContainer.querySelectorAll(':scope > .cubre-m-horGraphicTab__content')) : [];
  // Remove is-active class for all tab content blocks
  tabContentBlocks.forEach(tc => tc.classList.remove('is-active'));

  // Structure table as:
  // Row 1: [ 'Tabs (tabs6)' ]
  // Row 2: [ tab1, tab2, ... ]
  // Row 3: [ content1, content2, ... ]
  const cells = [];
  cells.push(['Tabs (tabs6)']);
  cells.push(tabLabels);
  cells.push(tabContentBlocks);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

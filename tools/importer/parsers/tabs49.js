/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab labels
  const navWrapper = element.querySelector('.cubre-m-horGraphicTab__nav .swiper-wrapper');
  let tabLabels = [];
  if (navWrapper) {
    tabLabels = Array.from(navWrapper.children)
      .map(a => {
        const p = a.querySelector('p');
        return p ? p.textContent.trim() : a.textContent.trim();
      });
  }

  // Find tab contents
  const contentContainer = element.querySelector('.cubre-m-horGraphicTab__container');
  let tabContents = [];
  if (contentContainer) {
    tabContents = Array.from(contentContainer.children);
  }

  // Build header row with two columns, as in the example
  const headerRow = ['Tabs (tabs49)', ''];

  // Build rows: each is [tab label, tab content element]
  const rows = [];
  const numRows = Math.max(tabLabels.length, tabContents.length);
  for (let i = 0; i < numRows; i++) {
    const label = tabLabels[i] || `Tab ${i+1}`;
    const content = tabContents[i] || '';
    rows.push([label, content]);
  }

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

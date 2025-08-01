/* global WebImporter */
export default function parse(element, { document }) {
  // Block header (must match the markdown example exactly)
  const headerRow = ['Tabs (tabs71)'];

  // Get the tab labels from the nav
  let tabLabels = [];
  const nav = element.querySelector('.cubre-m-horGraphicTab__nav .swiper-wrapper');
  if (nav) {
    tabLabels = Array.from(nav.querySelectorAll('a.cubre-m-horGraphicTab__btn')).map(a => {
      const p = a.querySelector('p');
      return p ? p.textContent.trim() : a.textContent.trim();
    });
  }

  // Get the tab content containers (in order)
  const tabContentNodes = element.querySelectorAll('.cubre-m-horGraphicTab__container > .cubre-m-horGraphicTab__content');
  // Defensive: Only as many as exist in both
  const numTabs = Math.min(tabLabels.length, tabContentNodes.length);

  // Build the table: header, tab label row, then each [label, content] row
  const rows = [];
  // 1. Header row (single column)
  rows.push(headerRow);
  // 2. Tab label row (one cell per tab)
  rows.push(tabLabels.slice(0, numTabs));
  // 3. Each tab gets a row with [tabLabel, tabContent]
  for (let i = 0; i < numTabs; i++) {
    rows.push([
      tabLabels[i],
      tabContentNodes[i]
    ]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

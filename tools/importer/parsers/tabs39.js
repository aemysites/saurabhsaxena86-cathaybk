/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block component
  const component = element.querySelector('.cubre-o-block__component');
  if (!component) return;

  // Get the tab nav (list of tab labels)
  const tabNav = component.querySelector('.cubre-m-tab__nav .swiper-wrapper');
  const tabBtns = tabNav ? Array.from(tabNav.querySelectorAll('.cubre-m-tab__btn')) : [];
  // Get all tab content containers (one per tab)
  const tabContents = Array.from(component.querySelectorAll(':scope > .cubre-m-tab__content'));

  // Defensive check: number of tabs and contents should match
  if (!tabBtns.length || tabBtns.length !== tabContents.length) return;

  // Build table rows: header, then one row per tab (label, content)
  const cells = [];
  // Header row: block name in a single cell
  cells.push(['Tabs (tabs39)']);
  // For each tab, a row: [label, content]
  for (let i = 0; i < tabBtns.length; i++) {
    // Get label text
    const btn = tabBtns[i];
    const p = btn.querySelector('p');
    const label = p ? p.textContent.trim() : btn.textContent.trim();
    // Get tab content element
    const content = tabContents[i];
    cells.push([label, content]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

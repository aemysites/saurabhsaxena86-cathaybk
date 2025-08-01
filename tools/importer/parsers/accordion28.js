/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header, must match exactly as specified
  const headerRow = ['Accordion (accordion28)'];

  // Find the OL container - must be the immediate FAQ/collapse list
  const collapseList = element.querySelector('ol.cubre-m-collapse, ol.cubre-m-collapse.-tab');
  if (!collapseList) return;

  // Prepare the rows array
  const rows = [headerRow];

  // Find all LI items that are direct children (scope) of the OL
  const items = collapseList.querySelectorAll(':scope > li.cubre-m-collapse__item');
  items.forEach((item) => {
    // TITLE CELL: should reference the actual title element from the DOM
    let titleCell = '';
    const titleAnchor = item.querySelector(':scope > a.cubre-m-collapse__title');
    if (titleAnchor) {
      // this might contain various elements (usually a <p> with data-item-text)
      // keep the actual element reference, not a clone
      if (titleAnchor.childNodes.length === 1) {
        // Only one node (usually <p>)
        titleCell = titleAnchor.firstChild;
      } else if (titleAnchor.childNodes.length > 1) {
        titleCell = Array.from(titleAnchor.childNodes);
      } else {
        // fallback to the anchor itself
        titleCell = titleAnchor;
      }
    }

    // CONTENT CELL: The entire content wrapper should be kept, referencing existing DOM elements
    let contentCell = '';
    // content is typically in: div.cubre-m-collapse__content
    const contentWrapper = item.querySelector(':scope > div.cubre-m-collapse__content');
    if (contentWrapper) {
      // The content is typically a single .cubre-o-block or other blocks inside
      // It's safer to reference the main content container directly
      if (contentWrapper.childNodes.length === 1) {
        contentCell = contentWrapper.firstChild;
      } else if (contentWrapper.childNodes.length > 1) {
        contentCell = Array.from(contentWrapper.childNodes);
      } else {
        // fallback to the wrapper itself
        contentCell = contentWrapper;
      }
    }
    // Add the row (always 2 columns: Title, Content)
    rows.push([titleCell, contentCell]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

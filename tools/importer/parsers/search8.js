/* global WebImporter */
export default function parse(element, { document }) {
  // The header must match exactly
  const headerRow = ['Search'];

  // Collect all direct children of the block to preserve headings, field, and labels
  // This will capture everything including visible text (such as headings) and the form
  const directChildren = Array.from(element.childNodes).filter(
    (node) => {
      // keep non-empty text and all elements
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return true;
    }
  );

  // Prepare the query index link as required in the block
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.live/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Combine all block content with the required query index link
  // This ensures all text and structure from the HTML is present
  const contentRow = [[...directChildren, link]];

  const rows = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the correct table
  const table = element.querySelector('table.cubre-m-elasticTable');
  if (!table) return;

  // Extract column headers (as an array of strings)
  const headerThs = Array.from(table.querySelectorAll('thead > tr > th'));
  const tableHeaderRow = headerThs.map(th => th.textContent.trim());

  // Extract table body rows
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const tableRows = rows.map(row => {
    const tds = Array.from(row.querySelectorAll('td'));
    return tds.map(td => {
      // Build a content array for the cell
      const fragment = document.createDocumentFragment();
      Array.from(td.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            fragment.append(document.createTextNode(node.textContent));
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          fragment.append(node);
        }
      });
      if (fragment.childNodes.length === 1) {
        return fragment.firstChild;
      } else if (fragment.childNodes.length > 1) {
        return Array.from(fragment.childNodes);
      } else {
        return '';
      }
    });
  });

  // Compose the final table
  // 1. Block header row (single column)
  // 2. Column header row (as a single cell row containing the header array)
  // 3+. Data rows
  const cells = [
    ['Table (striped, bordered)'],
    [tableHeaderRow],
    ...tableRows
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

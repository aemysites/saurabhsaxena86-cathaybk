/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table block wrapper
  const component = element.querySelector('.cubre-o-block__component') || element;

  // Prefer the first .cubre-m-scrollTable__head table, else fallback to the first table
  let table = component.querySelector('.cubre-m-scrollTable__head table');
  if (!table) table = component.querySelector('table');
  if (!table) return;

  // Extract all rows and build the table structure
  const rows = Array.from(table.querySelectorAll('tr'));
  const tableRows = rows.map(row => {
    // For each cell (th/td), extract the deepest meaningful text
    return Array.from(row.children).map(cell => {
      // Use textContent of the first div descendant if available, else cell.textContent
      const div = cell.querySelector('div');
      if (div) {
        return div.textContent.trim();
      }
      return cell.textContent.trim();
    });
  });

  // Compose a native table element with this data, referencing only what is needed
  const t = document.createElement('table');
  const tbody = document.createElement('tbody');
  t.appendChild(tbody);
  tableRows.forEach(rowArr => {
    const tr = document.createElement('tr');
    rowArr.forEach((cellText, i) => {
      const cellEl = document.createElement(i === 0 ? 'th' : 'td');
      cellEl.textContent = cellText;
      tr.appendChild(cellEl);
    });
    tbody.appendChild(tr);
  });

  // Compose the block table as required
  const cells = [
    ['Table (striped)'], // exact header as in the example
    [t]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

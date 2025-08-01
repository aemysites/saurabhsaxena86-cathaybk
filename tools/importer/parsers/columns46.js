/* global WebImporter */
export default function parse(element, { document }) {
  // To match the example, header row is 1 cell, then a second row with 3 columns (since that's in the provided HTML)
  // Header row: single cell table
  const headerRow = ['Columns block (columns46)'];

  // Get all direct <a> children (each represents a column)
  const columns = Array.from(element.querySelectorAll(':scope > a'));

  // Defensive: If there are less than 2 columns, pad so second row has at least 2 columns (to match the example)
  // But in the provided HTML, there are 3 columns, so just proceed
  // Each cell: use the inner <p> if exists, else the <a> itself
  const columnCells = columns.map(a => {
    const p = a.querySelector('p');
    return p ? p : a;
  });

  // The header row must be a single cell, the next row as many columns as found in the HTML
  const tableData = [
    headerRow,
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}

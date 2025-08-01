/* global WebImporter */
export default function parse(element, { document }) {
  // Get the three tab content blocks (each will be a column)
  const tabContents = Array.from(element.querySelectorAll('.cubre-m-horGraphicTab__content'));

  // For each tab: left = image, right = content
  // We want: column1: all content from first tab, column2: all content from second tab, column3: all content from third tab
  // But, group image and content together as in the HTML, matching the intent and the visual output of the example
  const columns = tabContents.map(tab => {
    // For resilience, grab the whole .cubre-m-horGraphic (which contains both image & content)
    const graphic = tab.querySelector('.cubre-m-horGraphic');
    // If missing (shouldn't happen), fallback to full tab content
    return graphic || tab;
  });

  const headerRow = ['Columns (columns73)'];
  // The table should have a header row with one column, and a data row with three columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}

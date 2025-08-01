/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const header = ['Columns (columns51)'];

  // Extract the title (e.g., "據點類型")
  const titleDiv = element.querySelector('.cubre-o-formRow__title');
  let titleText = '';
  if (titleDiv) {
    titleText = titleDiv.textContent.trim();
  }

  // Extract all label texts for the radios
  const labelNodes = Array.from(element.querySelectorAll('.cubre-a-radio__label'));

  // Build a <ul> with all radio label texts
  let ul = null;
  if (labelNodes.length) {
    ul = document.createElement('ul');
    labelNodes.forEach(label => {
      const li = document.createElement('li');
      li.textContent = label.textContent.trim();
      ul.appendChild(li);
    });
  }

  // Compose the column content as: title + list
  const colContent = document.createElement('div');
  if (titleText) {
    const p = document.createElement('p');
    p.textContent = titleText;
    colContent.appendChild(p);
  }
  if (ul) {
    colContent.appendChild(ul);
  }

  // Build table: one header row, one content row, one column
  const cells = [
    header,
    [colContent]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

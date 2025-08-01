/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row for the block
  const headerRow = ['Hero (hero34)'];

  // Row 2: The background image(s)
  // The desktop image is the prominent one; reference it directly if it exists
  const pcImg = element.querySelector('.cubre-m-marketGraphic__img.-pc');
  const bgImageCell = [pcImg ? pcImg : ''];

  // Row 3: Hero text content (headline, subheading, CTA)
  // This HTML block does not contain text, so leave the row empty
  const textRow = [''];

  const cells = [
    headerRow,
    bgImageCell,
    textRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
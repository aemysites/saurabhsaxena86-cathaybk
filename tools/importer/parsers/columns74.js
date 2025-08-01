/* global WebImporter */
export default function parse(element, { document }) {
  // Get the inner block that contains the columns content
  const blockWrap = element.querySelector('.cubre-o-block__wrap');
  if (!blockWrap) return;
  const comp = blockWrap.querySelector('.cubre-o-block__component');
  if (!comp) return;
  const app = comp.querySelector('.cubre-m-appDownload');
  if (!app) return;

  // Left column: app illustration image ('.cubre-m-appDownload__pic')
  const leftCol = app.querySelector('.cubre-m-appDownload__pic');
  // Center column: title, text, and button ('.cubre-m-appDownload__content' + '.cubre-m-appDownload__btn')
  const centerColWrapper = document.createElement('div');
  const content = app.querySelector('.cubre-m-appDownload__content');
  if (content) centerColWrapper.appendChild(content);
  const btn = app.querySelector('.cubre-m-appDownload__btn');
  if (btn) centerColWrapper.appendChild(btn);
  // Right column: qr codes ('.cubre-m-appDownload__code')
  const rightCol = app.querySelector('.cubre-m-appDownload__code');

  // Compose table as per the Columns block (columns74) spec
  // Header row must be a single cell
  const headerRow = ['Columns block (columns74)'];
  // Content row must have one cell per column (3 columns)
  const contentRow = [leftCol, centerColWrapper, rightCol];
  const cells = [headerRow, contentRow];

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all primary content blocks that represent a table or group of table data
  function getPrimaryBlocks(el) {
    // 1. Try to get all .cubre-o-table__item blocks (these are the main data groupings)
    const items = Array.from(el.querySelectorAll('.cubre-o-table__item'));
    if (items.length) return items;
    // 2. If not found, fallback to visible tables inside .cubre-o-rateCard__content or just <table>
    const tables = Array.from(el.querySelectorAll('.cubre-o-rateCard__content > table, table'));
    if (tables.length) return tables;
    // 3. If still not found, try large content groupings (like .cubre-o-rateCard, .cubre-o-block for notices)
    const blocks = Array.from(el.querySelectorAll('.cubre-o-rateCard, .cubre-o-block, .cubre-m-notice, .cubre-o-assist, .cubre-o-inquireBox, .cubre-o-filter__info, .cubre-o-filter__box'));
    if (blocks.length) return blocks;
    // 4. As a last resort, use the element itself
    return [el];
  }

  // Compose the table cells: header + one row for each content block
  const cells = [['Table']];
  const blocks = getPrimaryBlocks(element);
  blocks.forEach(block => {
    // Only add if block has visible text or meaningful content
    const hasContent = (block.textContent && block.textContent.trim().length > 0) || block.querySelector('img, table, ul, ol, input, select, p, div');
    if (hasContent) {
      cells.push([block]);
    }
  });
  // Only replace if data rows exist
  if (cells.length > 1) {
    const tableBlock = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(tableBlock);
  } else {
    element.remove();
  }
}

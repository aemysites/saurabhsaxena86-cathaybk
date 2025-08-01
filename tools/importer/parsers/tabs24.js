/* global WebImporter */
export default function parse(element, { document }) {
  // Compose rows for the tab block
  const rows = [];
  // Header row: single cell, will add colspan=2 after table is created
  rows.push(['Tabs (tabs24)']);

  // Parse each .smart_say as a tab
  const smartSayBlocks = Array.from(element.querySelectorAll('.smart_say'));
  smartSayBlocks.forEach((sayBlock) => {
    const p = sayBlock.querySelector('.say > p');
    let label = '';
    let contentNodes = [];
    if (p) {
      // The label is the first span
      const span = p.querySelector('span');
      if (span) {
        label = span.textContent.trim();
      } else {
        label = 'Tab';
      }
      // Content: everything after first span and first br
      let skippedSpan = false;
      let skippedBr = false;
      p.childNodes.forEach((node) => {
        if (!skippedSpan && node.nodeType === 1 && node.tagName === 'SPAN') {
          skippedSpan = true;
          return;
        }
        if (!skippedBr && node.nodeType === 1 && node.tagName === 'BR') {
          skippedBr = true;
          return;
        }
        contentNodes.push(node);
      });
      if (contentNodes.length === 0) contentNodes = [''];
    } else {
      label = 'Tab';
      contentNodes = [''];
    }
    rows.push([label, contentNodes]);
  });

  // Add iframe as a tab if present
  const iframe = element.querySelector('.smart_box iframe');
  if (iframe) {
    let label = '聊天';
    let content = '';
    const src = iframe.getAttribute('src');
    if (src && src.trim()) {
      const a = document.createElement('a');
      a.href = src;
      a.textContent = src;
      content = a;
    }
    rows.push([label, content]);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Ensure the first th has colspan=2 for correct header spanning
  const th = table.querySelector('th');
  if (th) th.setAttribute('colspan', '2');

  element.replaceWith(table);
}

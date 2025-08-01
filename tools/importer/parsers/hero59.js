/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const headerRow = ['Hero (hero59)'];

  // --- Background image row ---
  // Use the first .cubre-m-kv__img for background (prefer -pc, else any)
  let bgImg = null;
  const bgDiv = element.querySelector('.cubre-m-kv__bg');
  if (bgDiv) {
    bgImg = bgDiv.querySelector('img.cubre-m-kv__img.-pc') || bgDiv.querySelector('img.cubre-m-kv__img');
    if (bgImg && bgImg.src && !bgImg.src.match(/^https?:/)) {
      const a = document.createElement('a');
      a.href = bgImg.src;
      bgImg.src = a.href;
    }
  }

  // --- Content row: all text and CTAs, referencing existing elements ---
  // The .cubre-m-kv__box contains all text, headings, subtitle, and CTA buttons
  let contentCell = '';
  const box = element.querySelector('.cubre-m-kv__box');
  if (box) {
    contentCell = box;
  }

  // Compose table rows as per specification: header, background, content
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

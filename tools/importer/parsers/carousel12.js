/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Carousel (carousel12)'];
  const rows = [headerRow];

  // Each immediate child div of the wrapper is a slide
  const slides = Array.from(element.querySelectorAll(':scope > div'));

  slides.forEach((slide) => {
    // Get the image element (if any)
    const picDiv = slide.querySelector('.cubre-m-pictureStep__pic');
    const img = picDiv ? picDiv.querySelector('img') : null;

    // Gather all textual content in the right order, including notes
    const textCellParts = [];
    // Title (as heading)
    const titleDiv = slide.querySelector('.cubre-m-pictureStep__title');
    if (titleDiv && titleDiv.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.textContent = titleDiv.textContent.trim();
      textCellParts.push(h2);
    }
    // Description (main text)
    const descDiv = slide.querySelector('.cubre-m-pictureStep__text');
    if (descDiv && descDiv.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = descDiv.textContent.trim();
      textCellParts.push(p);
    }
    // Notes or additional paragraphs
    const noteDiv = slide.querySelector('.cubre-m-pictureStep__note');
    if (noteDiv) {
      // Include all children (usually <p> with <br> or text)
      Array.from(noteDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          textCellParts.push(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textCellParts.push(p);
        }
      });
    }
    rows.push([img, textCellParts]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

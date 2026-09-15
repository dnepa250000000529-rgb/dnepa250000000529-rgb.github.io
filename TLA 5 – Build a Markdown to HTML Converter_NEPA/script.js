// Regex Markdown Converter Function
function convertMarkdown(markdown) {
  let html = markdown;

  // 1. Headings (###, ##, #) - Order matters (largest to smallest)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 2. Images: ![alt](url) -> MUST run before Links to avoid matching ![alt] as a link
  html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />');

  // 3. Links: [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

  // 4. Bold: **text** or __text__
  html = html.replace(/(\*\*|__)(.*?)\1/gim, '<strong>$2</strong>');

  // 5. Italic: *text* or _text_
  html = html.replace(/(\*|_)(.*?)\1/gim, '<em>$2</em>');

  // 6. Blockquotes: > text
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

  return html;
}

// DOM Event Handling
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function updatePreview() {
  const markdownText = editor.value;
  preview.innerHTML = convertMarkdown(markdownText);
}

// Initial default text and event listener
editor.value = `# Welcome to the Markdown Converter

## Subsection Example
### Smaller Heading

Here is **bold text** and *italic text*.

> This is a blockquote.

Check out [freeCodeCamp](https://www.freecodecamp.org) or see an image below:

![Placeholder Image](https://via.placeholder.com/150)
`;

updatePreview();
editor.addEventListener('input', updatePreview);

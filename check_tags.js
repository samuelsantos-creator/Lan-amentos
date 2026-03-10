const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const tags = ['div', 'script', 'style', 'button', 'input', 'section', 'header', 'footer', 'nav', 'h1', 'h2', 'h3', 'h4', 'p', 'span', 'i', 'b', 'strong', 'ul', 'li', 'a'];
const counts = {};

tags.forEach(tag => {
    const open = (content.match(new RegExp('<' + tag + '[\\s>]', 'gi')) || []).length;
    const close = (content.match(new RegExp('</' + tag + '>', 'gi')) || []).length;
    if (open !== close) {
        counts[tag] = { open, close };
    }
});

if (Object.keys(counts).length > 0) {
    console.log('Tag imbalance found:');
    console.log(JSON.stringify(counts, null, 2));
} else {
    console.log('All tracked tags are balanced.');
}

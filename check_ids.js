const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const ids = content.match(/id="[^"]*"/g);
if (ids) {
    const counts = {};
    ids.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
    });
    const duplicates = Object.keys(counts).filter(id => counts[id] > 1);
    if (duplicates.length > 0) {
        console.log('Duplicate IDs found:');
        duplicates.forEach(id => console.log(`${id}: ${counts[id]}`));
    } else {
        console.log('No duplicate IDs found.');
    }
} else {
    console.log('No IDs found.');
}

const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const funcs = content.match(/function\s+([a-zA-Z0-9_]+)\s*\(/g);
if (funcs) {
    const names = funcs.map(f => f.replace('function ', '').replace('(', '').trim());
    const counts = {};
    names.forEach(name => {
        counts[name] = (counts[name] || 0) + 1;
    });
    const duplicates = Object.keys(counts).filter(name => counts[name] > 1);
    if (duplicates.length > 0) {
        console.log('Duplicate function names found:');
        duplicates.forEach(name => console.log(`${name}: ${counts[name]}`));
    } else {
        console.log('No duplicate function names found.');
    }
} else {
    console.log('No functions found.');
}

const fs = require('fs');
const path = require('path');

const seedPath = path.resolve(__dirname, '..', 'courses_seed.sql');
let content = fs.readFileSync(seedPath, 'utf8');

// Regex to find INSERT VALUES and remove the 3rd and 4th fields
// ('curriculum', 'Title', 'Instructor', 'Price', ... ) -> ('curriculum', 'Title', ... )
// Note: We need to be careful with quotes and commas.

const lines = content.split('\n');
const cleanedLines = lines.map(line => {
  if (line.trim().startsWith("('curriculum',") || line.trim().startsWith("('tech',")) {
    // This is a values row
    // Match the first two strings, then skip two, then keep the rest
    // A simple split might fail if titles have commas, so we need to be more careful.
    
    // Using a simple state machine or a more robust regex
    // This regex looks for: ( 'type', 'title', 'instructor', 'price', ... )
    const match = line.match(/^(\s*\(\s*'[^']+'\s*,\s*'[^']+'\s*),\s*'[^']+'\s*,\s*'[^']+'\s*,(.*)$/);
    if (match) {
      return match[1] + ',' + match[2];
    }
  }
  return line;
});

fs.writeFileSync(seedPath, cleanedLines.join('\n'));
console.log('Successfully cleaned courses_seed.sql values.');

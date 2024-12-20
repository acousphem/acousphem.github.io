// src/utils/parseBib.js
import fs from 'fs';
import bibtexParse from 'bibtex-parser-js';

export function parseBibFile(filePath) {
  const bibContent = fs.readFileSync(filePath, 'utf8');
  const parsedData = bibtexParse.toJSON(bibContent);
  
  //console.log("Parsed BibTeX Data:", parsedData[parsedData.length - 1]); // Agrega este log para revisar el contenido

  parsedData.forEach((entry) => {
    if (entry.entryTags && entry.entryTags.AUTHOR) {
      if (entry.entryTags.AUTHOR.includes(',')) {
        const authors = entry.entryTags.AUTHOR.split(' and ');
        entry.entryTags.AUTHOR = authors.map((author) => {
          const authorParts = author.split(',');
          return `${authorParts[1]} ${authorParts[0]}`;
        }).join(', ');
      } else {
        entry.entryTags.AUTHOR = entry.entryTags.AUTHOR.replaceAll(' and ', ', ');
      }
    }
  });

  return parsedData;
}

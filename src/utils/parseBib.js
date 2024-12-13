// src/utils/parseBib.js
import fs from 'fs';
import bibtexParse from 'bibtex-parser-js';

export function parseBibFile(filePath) {
  const bibContent = fs.readFileSync(filePath, 'utf8');
  const parsedData = bibtexParse.toJSON(bibContent);
  
  //console.log("Parsed BibTeX Data:", parsedData); // Agrega este log para revisar el contenido

  return parsedData;
}

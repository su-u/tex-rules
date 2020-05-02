import { readFile, writeAstToJson } from '@/util/file';
import { requireCaption } from '@/rules/requireCaption';

import * as fs from 'fs';

import { latexParser } from 'latex-utensils';
const texString = fs.readFileSync('./tex/uno.tex', { encoding: 'utf-8' });
const ast = latexParser.parse(texString);
console.log(JSON.stringify(ast, undefined, '  '));

writeAstToJson(ast);

const main = () => {
  const lines = file('./tex/uno.tex');
  requireCaption(lines);
};

// main();

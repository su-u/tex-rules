import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst } from '@/util/tex';
// import { requireCaption } from '@/rules/requireCaption';

const main = () => {
  const texString = readFile('./tex/uno.tex');
  const ast = TexToAst(texString);
  writeAstToJson(ast);
  // requireCaption(lines);
};

main();

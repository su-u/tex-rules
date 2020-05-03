import { readFile } from './file';
import { getDocument, TexToAst } from './tex';

export const texToDocumentAst = (filePath: string): any => {
  const texString = readFile(filePath);
  const ast = TexToAst(texString);
  return getDocument(ast);
};

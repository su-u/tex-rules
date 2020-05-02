import { latexParser } from 'latex-utensils';

export const TexToAst = (text: string): any => {
  const ast = latexParser.parse(text);
  console.log(JSON.stringify(ast, undefined, 2));
  return ast;
};

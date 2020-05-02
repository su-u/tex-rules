import { latexParser } from 'latex-utensils';

export const TexToAst = (text: string): any => {
  const ast = latexParser.parse(text);
  return ast;
};

export const getDocument = (ast: any): any => {
  return ast.content.find(
    (element: any) => element.kind === 'env' && element.name === 'document',
  );
};

import * as fs from 'fs';

export const readFile = (filePath: string): string[] => {
  const text = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return text.toString().split('\n');
};

export const writeAstToJson = (ast: any): void => {
  fs.writeFile('outDir/out.json', JSON.stringify(ast, undefined, 2), err => {
    if (err) {
    } else {
    }
  });
};

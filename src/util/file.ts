import * as fs from 'fs';

export const readFile = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
  } catch( e ) {
    console.error('ファイルが開けませんでした。');
    process.exit(1);
  }
};

export const writeAstToJson = (filePath: string, ast: any): void => {
  fs.writeFile(filePath, JSON.stringify(ast, undefined, 2), err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
};

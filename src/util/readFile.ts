import * as fs from 'fs';

export const readFile = (filePath: string): string[] => {
  const text = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return text.toString().split('\n');
};

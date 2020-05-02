import { readFile } from '@/util/readFile';
import { requireCaption } from '@/rules/requireCaption';

const main = () => {
  const lines = readFile('./tex/uno.tex');
  requireCaption(lines);
};

main();

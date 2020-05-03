import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { requireLabel, requireLabelsList } from '@/rules/requireLabel';
import { report, reportOutput } from '@/report';

const switcher = (ast: any) => {
  ast.forEach((node: any) => {
    switch (node.kind) {
      case 'parbreak': {
        break;
      }
      case 'env': {
        if (requireCaptionsList.includes(node.name)) {
          if (requireCaption(node.content)) {
            report(`${node.name}にキャプションがありません`, 'error', node);
          }
        }
        if (requireLabelsList.includes(node.name)) {
          if (requireLabel(node.content)) {
            report(`${node.name}にラベルがありません`, 'error', node);
          }
        }
      }
    }
  });
};

const main = () => {
  const texString = readFile('./tex/uno.tex');
  const ast = TexToAst(texString);
  const documentAst = getDocument(ast);
  writeAstToJson('outDir/out.json', ast);
  writeAstToJson('outDir/document.json', documentAst);
  switcher(documentAst.content);
  reportOutput();
};

main();

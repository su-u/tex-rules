import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { report, reportOutput } from '@/./report';

const switcher = (ast: any) => {
  ast.forEach((node: any) => {
    switch (node.kind) {
      case 'parbreak': {
        break;
      }
      case 'env': {
        if (requireCaptionsList.includes(node.name)) {
          const hasCaption = requireCaption(node.content);
          if (!hasCaption) {
            const location = node.location;
            report(
              `${node.name}にキャプションがありません`,
              'error',
              node.name,
              location.start.line,
              location.start.column,
            );
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

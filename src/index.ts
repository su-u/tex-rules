import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';

type reportType = {
  errorText: string;
  nodeName: string;
  line: number;
  column: number;
};

const reportList: reportType[] = [];

const report = (
  errorText: string,
  nodeName: string,
  line: number,
  column: number,
) => {
  reportList.push({ errorText, nodeName, line, column });
};

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
              'キャプションがありません',
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
  reportList.forEach(report => {
    // eslint-disable-next-line no-console
    console.log(report);
  });
};

main();

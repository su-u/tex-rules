import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { report, reportKey, reportOutput } from '@/report';
import { interpreter } from '@/interpreter';

export type contextType = {
  labelRef: LabelRefClass;
  report: (errorText: string, reportType: reportKey, node: any) => void;
};

const main = () => {
  const texString = readFile('./tex/sample.tex');
  const ast = TexToAst(texString);
  const documentAst = getDocument(ast);
  writeAstToJson('outDir/out.json', ast);
  writeAstToJson('outDir/document.json', documentAst);

  const context: contextType = {
    labelRef: new LabelRefClass(),
    report: report,
  };

  documentAst.content.forEach((node: any) => interpreter(context, node));

  context.labelRef.labelAggregate(report);
  reportOutput();
};

main();

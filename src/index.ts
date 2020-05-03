import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { ReportClass, reportKey } from '@/report';
import { interpreter } from '@/interpreter';

export type contextType = {
  labelRef: LabelRefClass;
  report: (errorText: string, reportType: reportKey, node: any) => void;
};

const main = () => {
  const mainPath = process.argv[2] ?? '';
  const texString = readFile(mainPath);
  const ast = TexToAst(texString);
  const documentAst = getDocument(ast);
  // writeAstToJson('outDir/out.json', ast);
  // writeAstToJson('outDir/document.json', documentAst);

  const report = new ReportClass();

  const context: contextType = {
    labelRef: new LabelRefClass(),
    report: report.report,
  };

  interpreter(context, documentAst.content);

  context.labelRef.labelAggregate(report.report);
  report.reportOutput();
};

main();

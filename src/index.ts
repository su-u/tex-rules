import { readFile } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { ReportClass, reportKey } from '@/report';
import { interpreter } from '@/interpreter';
import { texArgv } from '@/argv';

export type contextType = {
  labelRef: LabelRefClass;
  report: (errorText: string, reportType: reportKey, node: any) => void;
};

const main = () => {
  const argValue = texArgv();
  const texString = readFile(argValue.tex);
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

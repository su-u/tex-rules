import glob from 'glob';
import { readFile } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { ReportClass, reportKey } from '@/report';
import { interpreter } from '@/interpreter';
import { execArgv } from '@/argv';

export type contextType = {
  labelRef: LabelRefClass;
  report: (errorText: string, reportType: reportKey, node: any) => void;
};

const main = () => {
  const args = execArgv();

  glob(args.tex, {}, (er, files: string[]) => {
    if (er) {
      console.error('ファイル読み込みでエラーが発生しました。');
      console.error(er);
      process.exit(1);
    }
    files.forEach(file => {
      const texString = readFile(file);
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
      report.reportOutput(file);
    });
  });
};

main();

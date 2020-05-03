import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { report, reportOutput } from '@/report';
import { interpreter } from '@/interpreter';

const main = () => {
  const texString = readFile('./tex/sample.tex');
  const ast = TexToAst(texString);
  const documentAst = getDocument(ast);
  writeAstToJson('outDir/out.json', ast);
  writeAstToJson('outDir/document.json', documentAst);

  const context = {
    labelRef: new LabelRefClass(),
  };

  documentAst.content.forEach((node: any) =>
    interpreter(context, node, report),
  );

  context.labelRef.labelAggregate(report);
  reportOutput();
};

main();

import { readFile, writeAstToJson } from '@/util/file';
import { TexToAst, getDocument } from '@/util/tex';
import { requireCaption, requireCaptionsList } from '@/rules/requireCaption';
import { requireLabel, requireLabelsList } from '@/rules/requireLabel';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { report, reportOutput } from '@/report';

const labelRef = new LabelRefClass();

const interpreter = (node: any) => {
  switch (node.kind) {
    case 'parbreak': {
      break;
    }
    case 'env': {
      if (requireCaptionsList.includes(node.name)) {
        if (!requireCaption(node.content)) {
          report(`${node.name}にキャプションがありません`, 'error', node);
        }
      }
      if (requireLabelsList.includes(node.name)) {
        if (!requireLabel(node.content)) {
          report(`${node.name}にラベルがありません`, 'error', node);
        }
      }
      break;
    }
    case 'command': {
      if (node.name === 'label') labelRef.addLabel(node);
      if (node.name === 'ref') labelRef.addRef(node);
      break;
    }
  }
};

const main = () => {
  const texString = readFile('./tex/sample.tex');
  const ast = TexToAst(texString);
  const documentAst = getDocument(ast);
  writeAstToJson('outDir/out.json', ast);
  writeAstToJson('outDir/document.json', documentAst);

  documentAst.content.forEach((node: any) => interpreter(node));

  labelRef.labelAggregate(report);
  labelRef.labelsList.forEach(y => {
    console.debug(y);
  });
  labelRef.refsList.forEach(y => {
    console.debug(y);
  });
  reportOutput();
};

main();

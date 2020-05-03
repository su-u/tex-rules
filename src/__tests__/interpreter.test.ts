import { interpreter } from '@/interpreter';
import { contextType } from '@/index';
import { reportKey } from '../report';
import { LabelRefClass } from '@/rules/requireLabelRef';
import { texToDocumentAst } from '@/util/test';

const texTest = (filePath: string, count: number): void => {
  const ast = texToDocumentAst(filePath);
  let reportCount = 0;

  const report = (
    // @ts-ignore
    errorText: string,
    // @ts-ignore
    reportType: reportKey,
    // @ts-ignore
    node: any,
  ): void => {
    reportCount++;
  };

  const context: contextType = {
    labelRef: new LabelRefClass(),
    report: report,
  };
  interpreter(context, ast.content);

  expect(reportCount).toBe(count);
};

describe('interpreter', (): void => {
  test('ラベル参照無し', (): void => {
    texTest('./src/__tests__/tex/interpreter_case_1.tex', 1);
  });
  test('エラーなし', (): void => {
    texTest('./src/__tests__/tex/interpreter_case_2.tex', 0);
  });
  test('図のキャプションなし', (): void => {
    texTest('./src/__tests__/tex/interpreter_case_3.tex', 1);
  });
  test('図のキャプション、ラベルなし', (): void => {
    texTest('./src/__tests__/tex/interpreter_case_4.tex', 2);
  });
  test('ラベル参照なし、tabref', (): void => {
    texTest('./src/__tests__/tex/interpreter_case_5.tex', 2);
  });
});

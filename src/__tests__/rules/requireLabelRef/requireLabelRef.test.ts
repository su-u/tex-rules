import { LabelRefClass } from '@/rules/requireLabelRef';
import { texToDocumentAst } from '@/util/test';

describe('LabelRefClass', (): void => {
  test('すべてのラベルは参照されている', (): void => {
    const ast = texToDocumentAst(
      './src/__tests__/rules/requireLabelRef/tex/label_refed.tex',
    );
    const labelRef = new LabelRefClass();

    ast.content.forEach((node: any) => {
      if (node.kind) {
        if (node.name === 'label') labelRef.addLabel(node);
        if (node.name === 'ref') labelRef.addRef(node);
      }
    });

    expect(labelRef.labelsList.length).toBe(1);
    expect(labelRef.refsList.length).toBe(2);
  });

  test('参照されていないラベルが存在している', (): void => {
    const ast = texToDocumentAst(
      './src/__tests__/rules/requireLabelRef/tex/label_not_refed.tex',
    );
    const labelRef = new LabelRefClass();

    ast.content.forEach((node: any) => {
      if (node.kind) {
        if (node.name === 'label') labelRef.addLabel(node);
        if (node.name === 'ref') labelRef.addRef(node);
      }
    });

    expect(labelRef.labelsList.length).toBe(2);
    expect(labelRef.labelsList[1].count).toBe(0);
    expect(labelRef.labelsList[1].labelName).toBe('ゲーム');
    expect(labelRef.refsList.length).toBe(2);
  });
});
